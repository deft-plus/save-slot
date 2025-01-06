import clsx from 'clsx';
import { motion } from 'framer-motion';

import { type AppState, useAppState } from '@/state';

import { DrawerItem } from './item';

/**
 * Drawer navigation props.
 */
export type DrawerNavigationProps = {
  className?: string;
  title: string;
  checklists: AppState['checklists'];
};

/**
 * Drawer navigation component.
 */
export function DrawerNavigation(props: DrawerNavigationProps) {
  const { className, title, checklists } = props;

  const rootClasses = clsx('navigation', className);

  if (!checklists.length) {
    return null;
  }

  return (
    <>
      {title && (
        <motion.h3
          className="title"
          initial="closed"
          exit="closed"
          animate="open"
          variants={{
            open: {
              x: 0,
              opacity: 1,
              transition: {
                delay: 0.2,
                x: {
                  stiffness: 1000,
                  velocity: -100,
                },
              },
            },
            closed: {
              x: -50,
              opacity: 0,
              transition: {
                x: {
                  stiffness: 1000,
                },
              },
            },
          }}
        >
          {title}
        </motion.h3>
      )}
      <motion.ul
        className={rootClasses}
        initial="closed"
        exit="closed"
        animate="open"
        variants={{
          open: {
            opacity: 1,
            transition: {
              staggerChildren: 0.07,
              delayChildren: 0.2,
            },
          },
          closed: {
            opacity: 0,
            transition: {
              staggerChildren: 0.05,
              staggerDirection: -1,
            },
          },
        }}
      >
        {checklists.map((checklist) => (
          <DrawerItem key={checklist.id} {...checklist} />
        ))}
      </motion.ul>
    </>
  );
}

/**
 * Drawer navigation component to be used outside of the drawer.
 */
export function StandAloneNavigation() {
  const checklists = useAppState((state) => state.checklists);

  const availableChecklists = checklists.filter((checklist) => !checklist.isPreset);
  const presetChecklists = checklists.filter((checklist) => checklist.isPreset);

  return (
    <div className="standalone-navigation">
      <DrawerNavigation title="Checklists" className="available" checklists={availableChecklists} />
      <DrawerNavigation title="Presets" className="presets" checklists={presetChecklists} />
    </div>
  );
}
