import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router';

import { useDrawerState } from './state';

const Link = motion.create(RouterLink);

/**
 * Home link component.
 */
export function HomeLink() {
  const toggle = useDrawerState((state) => state.toggle);

  return (
    <motion.div
      className="home"
      variants={{
        open: {
          x: 0,
          opacity: 1,
          transition: {
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
      <Link to="/" onClick={() => toggle()}>
        <img src="/favicon.svg" alt="Save Slot icon" />
      </Link>
    </motion.div>
  );
}
