import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router';

const Link = motion.create(RouterLink);

/**
 * Home link component.
 */
export function HomeLink() {
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
      <Link to="/">
        <img src="/favicon.svg" alt="Save Slot icon" />
      </Link>
    </motion.div>
  );
}
