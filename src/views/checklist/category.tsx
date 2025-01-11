import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { useAppState } from '@/state';

import { useActiveChecklist } from './active-checklist-state';
import { Item } from './item';

/**
 * Props for the Category component.
 */
export type CategoryProps = {
  category: AppChecklistCategory;
};

/**
 * Category component.
 */
export function Category(props: CategoryProps) {
  const { category } = props;

  const checklist = useActiveChecklist();
  const toggleCategory = useAppState((state) => state.collapseCategory);

  const { id, items, collapsed, description, image, title } = category;

  const percentage = items.length;
  const percentageCompleted = items.reduce((acc, item) => acc + (item.checked ? 1 : 0), 0);
  const isCompleted = percentage === percentageCompleted;
  const path = `${checklist.id}.${id}`;

  return (
    <button
      className={clsx('category', isCompleted && 'is-completed')}
      onClick={() => {
        toggleCategory(path);
      }}
    >
      <div className="header">
        <div className="caption">
          {image && <img src={image.src} {...(image.alt && { alt: image.alt })} />}
          <h3>{title}</h3>
          <p className="percentage">
            {percentageCompleted}/{percentage}
          </p>
        </div>
        <p className="description">{description}</p>
      </div>

      <motion.ul
        className="items"
        initial={{ height: !collapsed ? 'auto' : 0 }}
        animate={{ height: !collapsed ? 'auto' : 0 }}
        exit={{ height: !collapsed ? 'auto' : 0 }}
        transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
      >
        <AnimatePresence initial={false}>
          {!collapsed &&
            items.map((item) => (
              <Item key={item.id} item={item} path={`${path}.${item.id}`}></Item>
            ))}
        </AnimatePresence>
      </motion.ul>
    </button>
  );
}
