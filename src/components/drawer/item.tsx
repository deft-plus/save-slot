import { motion } from 'framer-motion';
import { type ComponentProps, type PropsWithChildren, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import { useAppState } from '@/state';

import { useDrawerState } from './state';

/**
 * Drawer menu item props.
 */
export type DrawerItemProps = AppChecklistState & {
  // Empty...
};

/**
 * Drawer menu item component.
 */
export function DrawerItem(props: DrawerItemProps) {
  const { id, isPreset, backgroundImage: image } = props;

  const [loading, setLoading] = useState(false);

  const { checklistId } = useParams();
  const navigate = useNavigate();

  const toggle = useDrawerState((state) => state.toggle);
  const loadPreset = useAppState((state) => state.loadPreset);

  return (
    <motion.li
      className="item"
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ItemLink
        id={id}
        isPreset={isPreset}
        {...(image && {
          style: {
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${image.src})`,
            ...(image.textColor && { color: `var(--${image.textColor})` }),
            ...(image.backgroundColor && { backgroundColor: `var(--${image.backgroundColor})` }),
          },
        })}
        onButtonClick={async () => {
          setLoading(true);
          // Small delay to show loading state.
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await loadPreset(id);
          setLoading(false);
          toggle(false);
          navigate(`/app/${id}`);
        }}
        onLinkClick={() => {
          // Close only if the route is different.
          if (checklistId !== id) {
            toggle(false);
          }
        }}
      >
        <ItemCard {...props} loading={loading} />
      </ItemLink>
    </motion.li>
  );
}

/**
 * Drawer menu item card props.
 */
type ItemCardProps = PropsWithChildren<DrawerItemProps> & {
  loading: boolean;
};

/**
 * Drawer menu item card component.
 */
function ItemCard(props: ItemCardProps) {
  const { loading } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    displayName,
    itemsCompleted,
    itemsCount,
    thumbnailImage: image,
    isPreset,
    isCompleted,
  } = props;

  const completionPercentage = Math.round((itemsCompleted / itemsCount) * 100);

  return (
    <div>
      {image && (
        <img
          style={{
            maxHeight: '3rem',
            ...(image.textColor && { color: `var(--${image.textColor})` }),
            ...(image.backgroundColor && { backgroundColor: `var(--${image.backgroundColor})` }),
          }}
          src={image.src}
          alt={image.alt}
        />
      )}
      <div>
        <h4>{displayName}</h4>
        <div>
          {itemsCompleted}/{itemsCount}
        </div>
        <div>{completionPercentage}/100%</div>
        {isPreset && <div>Load Preset</div>}
        {isCompleted && <div>Completed</div>}
      </div>
    </div>
  );
}

/**
 * Drawer menu item link props.
 */
type ItemLinkProps = PropsWithChildren<{
  id: string;
  isPreset: boolean;
  onButtonClick: () => void;
  onLinkClick: () => void;
}> &
  ComponentProps<'button'> &
  Omit<ComponentProps<typeof Link>, 'to'>;

/**
 * Drawer menu item link component.
 */
function ItemLink(props: ItemLinkProps) {
  const { id, isPreset, onButtonClick, onLinkClick, children, ...otherProps } = props;

  return isPreset ? (
    <button {...otherProps} onClick={onButtonClick}>
      {children}
    </button>
  ) : (
    <Link {...otherProps} to={`/app/${id}`} onClick={onLinkClick}>
      {children}
    </Link>
  );
}
