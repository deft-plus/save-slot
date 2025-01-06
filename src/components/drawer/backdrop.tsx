import { AnimatePresence, motion } from 'framer-motion';

import { useDrawerState } from './state';

/**
 * Drawer backdrop component.
 */
export function DrawerBackdrop() {
  const open = useDrawerState((state) => state.open);
  const toggle = useDrawerState((state) => state.toggle);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={() => toggle()}
          className="backdrop"
          initial="closed"
          exit="closed"
          animate="open"
          variants={{
            open: {
              opacity: 1,
              transition: {
                delay: 0.05,
                duration: 0.2,
              },
            },
            closed: {
              opacity: 0,
              transition: {
                delay: 0.05,
                duration: 0.2,
              },
            },
          }}
        />
      )}
    </AnimatePresence>
  );
}
