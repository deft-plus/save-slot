import { AnimatePresence, motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

import { useDrawerState } from './state';

/**
 * Drawer content component.
 */
export function DrawerContent(props: PropsWithChildren) {
  const { children } = props;

  const open = useDrawerState((state) => state.open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="content"
          initial="closed"
          exit="closed"
          animate="open"
          variants={{
            open: () => ({
              clipPath: `circle(${1200 * 2 + 200}px at 40px 40px)`,
              transition: {
                type: 'spring',
                stiffness: 20,
                restDelta: 2,
              },
            }),
            closed: {
              clipPath: 'circle(25px at 45px 45px)',
              transition: {
                delay: 0.1,
                type: 'spring',
                stiffness: 400,
                damping: 40,
              },
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
