import { motion } from 'framer-motion';

import { useAppState } from '@/state';

/**
 * Props for the Item component.
 */
export type ItemProps = {
  item: AppChecklistItem;
  path: string;
};

/**
 * Item component.
 */
export function Item(props: ItemProps) {
  const { item, path } = props;

  const checkItem = useAppState((state) => state.checkItem);

  const { checked, description, link, icon, title, id } = item;

  return (
    <motion.li
      className="item"
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
    >
      <input id={id} type="checkbox" checked={checked} onChange={() => checkItem(path)} />
      <span className="checkbox-icon" />

      <div className="text">
        <a href={link} target="_blank" rel="noreferrer">
          {icon && <img src={icon.src} {...(icon.alt && { alt: icon.alt })} />}
          <h4>{title}</h4>
        </a>

        <label htmlFor={id}>{description}</label>
      </div>
    </motion.li>
  );
}
