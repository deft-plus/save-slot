import { useActiveChecklist } from './active-checklist-state';

/**
 * Tabs component.
 */
export function Tabs() {
  const { tabs, map } = useActiveChecklist();

  const showTabs = !!tabs?.length || !!map;

  return (
    showTabs && (
      <div className="tabs">
        {map && <button className="tab">Map</button>}

        {tabs?.length &&
          tabs.map((tab) => (
            <button key={tab.id} className="tab">
              {tab.title}
            </button>
          ))}
      </div>
    )
  );
}
