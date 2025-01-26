import { useActiveChecklist } from './active-checklist-state';

/**
 * Selected game title.
 */
export function Title() {
  const checklist = useActiveChecklist();

  return (
    <div className="title">
      <img src={checklist.pageHeader.image.src} alt={checklist.pageHeader.image.alt} />
      <h1>{checklist.pageHeader.title}</h1>
      {checklist.pageHeader.subtitle && <p>{checklist.pageHeader.subtitle}</p>}
    </div>
  );
}
