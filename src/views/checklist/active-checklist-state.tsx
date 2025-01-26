import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useAppState } from '@/state';
import { NotFoundView } from '@/views/not-found';

/** Checklist state. */
export type ActiveChecklistState = {
  /** Current active checklist. */
  active: AppChecklistState;
};

/** Active checklist state context. */
const ActiveChecklistStateContext = createContext<ActiveChecklistState | null>(null);

export function ActiveChecklistProvider(
  props: PropsWithChildren<{ value: { checklistId?: string; tab?: string } }>,
) {
  const {
    children,
    value: { checklistId, tab },
  } = props;

  const checklists = useAppState((state) => state.checklists);
  const loadPreset = useAppState((state) => state.loadPreset);

  const checklist = checklists.find((checklist) => checklist.id === checklistId);
  const doesTabExist = !!(tab === undefined || checklist?.tabs?.some((t) => t.id === tab));
  const hasMap = !!checklist?.map;
  const isTabValid = doesTabExist || (tab === 'map' && hasMap);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncActiveChecklist = async () => {
      if (!checklist || !isTabValid) {
        return;
      }

      if (checklist.isPreset) {
        await loadPreset(checklist.id);
      }

      setLoading(false);
    };

    syncActiveChecklist();

    // Rule disabled since we don't want to run this effect on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checklist?.id, isTabValid]);

  if (!checklist || !isTabValid) {
    return <NotFoundView />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ActiveChecklistStateContext.Provider value={{ active: checklist }}>
      {children}
    </ActiveChecklistStateContext.Provider>
  );
}

/** Hook to get the active checklist. */
// Rule disabled to avoid exporting the context.
// eslint-disable-next-line react-refresh/only-export-components
export function useActiveChecklist() {
  const context = useContext(ActiveChecklistStateContext);

  if (!context) {
    throw new Error('useActiveChecklistState must be used within a ActiveChecklistProvider');
  }

  return context.active;
}
