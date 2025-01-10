import { create as createStore } from 'zustand';

import { db } from '@/lib';

import { PRESETS } from './presets';

/**
 * App state to track the different checklists.
 */
export type AppState = {
  /** All of the available game checklists the user has. */
  checklists: AppChecklistState[];
  /** Initializes the app state. */
  initialize: () => Promise<void>;
  /** Loads a checklist checklist. */
  loadChecklist: (checklist: AppChecklist, isPreset?: boolean) => Promise<void>;
  /** Loads a preset checklist. */
  loadPreset: (presetId: string) => Promise<void>;
  /** Toggles a category dropdown. */
  collapseCategory: (path: string) => void;
  /** Toggles a checklist item checkmark. */
  checkItem: (path: string) => void;
  /** Resets the selected checklist (Makes all the items unchecked). */
  resetChecklist: (checklistId: string) => Promise<void>;
  /** Removes a checklist. */
  removeChecklist: (checklistId: string) => Promise<void>;
};

/**
 * Hook to get the state of the app.
 */
export const useAppState = createStore<AppState>((set, get) => ({
  // Initial status.
  checklists: [],
  // Initialization to load the checklists.
  initialize: async () => {
    const checklistIds = await db.keys();

    await Promise.all(
      PRESETS.filter((preset) => !checklistIds.includes(preset.id)).map((preset) =>
        get().loadChecklist(preset, true),
      ),
    );

    set({ checklists: await db.values() });
  },
  // Loads a checklist.
  loadChecklist: async (checklist, isPreset = false) => {
    const itemCount = checklist.categories
      // TODO: Validate if only to show the non-hidden categories or all.
      // .filter((category) => !category.hidden)
      .reduce((acc, category) => acc + category.items.length, 0);

    const newChecklist = {
      ...checklist,
      itemsCompleted: 0,
      itemCount,
      isCompleted: false,
      isPreset,
      completePercentage: 0,
    } satisfies AppChecklistState;

    await db.set(checklist.id, newChecklist);
    set({ checklists: [...get().checklists, newChecklist] });
  },
  // Loads a preset checklist.
  loadPreset: async (presetId) => {
    const keys = await db.keys();

    if (!keys.includes(presetId)) {
      return;
    }

    const modifiedChecklists = get().checklists.map((checklist) => ({
      ...checklist,
      isPreset: checklist.id === presetId ? false : checklist.isPreset,
    }));

    await db.get(presetId).then((cl) => db.set(presetId, { ...cl, isPreset: false }));
    set({ checklists: modifiedChecklists });
  },
  // Collapses a category.
  collapseCategory: (path) => {
    const [checklistId, categoryId] = path.split('.');

    set({
      checklists: get().checklists.map((checklist) => {
        if (checklist.id !== checklistId) {
          return checklist;
        }

        const modifiedCategories = checklist.categories.map((category) =>
          category.id !== categoryId ? category : { ...category, collapsed: !category.collapsed },
        );

        db.get(checklistId).then((cl) =>
          db.set(checklistId, { ...cl, categories: modifiedCategories }),
        );

        return { ...checklist, categories: modifiedCategories };
      }),
    });
  },
  // Checks an item.
  checkItem: (path) => {
    const [checklistId, categoryId, itemId] = path.split('.');

    let itemCheckedCount = 0;

    set({
      checklists: get().checklists.map((checklist) => {
        if (checklist.id !== checklistId) {
          return checklist;
        }

        const itemClicked = checklist.categories
          .find((category) => category.id === categoryId)
          ?.items.find((item) => item.id === itemId);

        const itemsToCheck = itemClicked?.related ?? [];
        const itemStatus = !!itemClicked?.checked; // Use the current status for the related items.

        itemsToCheck.unshift(`${categoryId}.${itemId}`);

        const modifiedCategories = checklist.categories.map((category) => {
          const modifiedItems = category.items.map((item) => {
            const shouldChange = itemsToCheck.includes(`${category.id}.${item.id}`);

            if (!shouldChange) {
              return item;
            }

            const modifiedItem = { ...item, checked: !itemStatus };
            itemCheckedCount += modifiedItem.checked ? 1 : 0;
            return modifiedItem;
          });

          return category.id !== categoryId ? category : { ...category, items: modifiedItems };
        });

        db.get(checklistId).then((cl) =>
          db.set(checklistId, { ...cl, categories: modifiedCategories }),
        );

        return {
          ...checklist,
          itemsCompleted: itemCheckedCount,
          isCompleted: itemCheckedCount === checklist.itemCount,
          completePercentage: Math.round((itemCheckedCount / checklist.itemCount) * 100),
          categories: modifiedCategories,
        };
      }),
    });
  },
  // Resets the checklist.
  resetChecklist: async (checklistId) => {
    set({
      checklists: get().checklists.map((checklist) => {
        if (checklist.id !== checklistId) {
          return checklist;
        }

        const modifiedCategories = checklist.categories.map((category) => ({
          ...category,
          items: category.items.map((item) => ({ ...item, checked: false })),
        }));

        db.get(checklistId).then((cl) =>
          db.set(checklistId, { ...cl, categories: modifiedCategories }),
        );

        return {
          ...checklist,
          itemsCompleted: 0,
          completePercentage: 0,
          isCompleted: false,
          categories: modifiedCategories,
        };
      }),
    });
  },
  // Removes a checklist.
  removeChecklist: async (checklistId) => {
    const isPreset = get().checklists.find((checklist) => checklist.id === checklistId)?.isPreset;

    if (isPreset) {
      return;
    }

    set({
      checklists: get().checklists.filter((checklist) => {
        if (checklist.id === checklistId) {
          db.delete(checklistId);
          return false;
        }

        return true;
      }),
    });
    get().initialize(); // This loads the presets again.
  },
}));
