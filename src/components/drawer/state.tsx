import { create as createState } from 'zustand';

/**
 * Drawer state.
 */
export type DrawerState = {
  open: boolean;
  toggle: (forcedStatus?: boolean) => void;
};

/**
 * Drawer state.
 */
export const useDrawerState = createState<DrawerState>((set) => ({
  open: false,
  toggle: (forcedStatus) => set((state) => ({ open: forcedStatus ?? !state.open })),
}));
