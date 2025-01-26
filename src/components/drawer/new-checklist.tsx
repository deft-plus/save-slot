import { motion } from 'framer-motion';
import { Link as RouterLink, useLocation } from 'react-router';

import { useDrawerState } from './state';

const Link = motion.create(RouterLink);

/**
 * Drawer new checklist component.
 */
export function DrawerNewChecklist() {
  const toggle = useDrawerState((state) => state.toggle);
  let location = useLocation();

  return (
    <div className="new-checklist">
      <Link
        to="/new-checklist"
        onClick={() => {
          // Close only if the route is different.
          if (location.pathname !== '/new-checklist') {
            toggle(false);
          }
        }}
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
        Create a new checklist
      </Link>
    </div>
  );
}
