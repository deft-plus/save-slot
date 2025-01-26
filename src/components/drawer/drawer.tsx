import { motion } from 'framer-motion';

import { useAppState } from '@/state';

import { DrawerBackdrop } from './backdrop';
import { DrawerContent } from './content';
import { HomeLink } from './home-link';
import { DrawerNavigation } from './navigation';
import { DrawerNewChecklist } from './new-checklist';
import { useDrawerState } from './state';
import { DrawerToggle } from './toggle';

/**
 * Drawer menu component.
 */
export function Drawer() {
  const open = useDrawerState((state) => state.open);
  const checklists = useAppState((state) => state.checklists);

  const availableChecklists = checklists.filter((checklist) => !checklist.isPreset);
  const presetChecklists = checklists.filter((checklist) => checklist.isPreset);

  return (
    <motion.nav className="drawer" initial={false} animate={open ? 'open' : 'closed'}>
      <DrawerToggle />

      <DrawerContent>
        <HomeLink />

        <DrawerNavigation
          title="Checklists"
          className="available"
          checklists={availableChecklists}
        />
        <DrawerNavigation title="Presets" className="presets" checklists={presetChecklists} />
        <DrawerNewChecklist />
      </DrawerContent>

      <DrawerBackdrop />
    </motion.nav>
  );
}
