import { motion } from 'framer-motion';
import { type ComponentPropsWithoutRef } from 'react';

import { useDrawerState } from './state';

/**
 * Drawer toggle component.
 */
export function DrawerToggle() {
  const toggle = useDrawerState((state) => state.toggle);

  return (
    <button className="toggle" title="hamburger menu to open drawer" onClick={() => toggle()}>
      <svg width="20" height="20" viewBox="0 0 20 20">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  );
}

/**
 * Helper path component.
 */
function Path(props: ComponentPropsWithoutRef<typeof motion.path>) {
  return <motion.path fill="transparent" strokeWidth="3" strokeLinecap="round" {...props} />;
}
