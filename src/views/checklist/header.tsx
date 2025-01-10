import { useActiveChecklist } from './active-checklist-state';

/**
 * Header component.
 */
export function Header() {
  const { pageHeader, itemCount, itemsCompleted } = useActiveChecklist();

  return (
    <div className="header">
      <div className="caption">
        <img src={pageHeader.image.src} alt={pageHeader.image.alt} />
        <h3>{pageHeader.title}</h3>
        <p className="percentage">
          {itemsCompleted}/{itemCount}
        </p>
      </div>
      {pageHeader.subtitle && <p className="description">{pageHeader.subtitle}</p>}
    </div>
  );
}
