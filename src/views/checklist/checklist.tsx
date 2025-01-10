import { useParams } from 'react-router';

import { ActiveChecklistProvider } from './active-checklist-state';
import { Configuration } from './configuration';
import { Header } from './header';
import { Tabs } from './tabs';

/**
 * Checklist view.
 */
export function ChecklistView() {
  const { checklistId, tab } = useParams();

  return (
    <ActiveChecklistProvider value={{ checklistId, tab }}>
      <Tabs />
      <Header />
      Checklist works: {checklistId}
      {tab && ` | ${tab}`}
      <Configuration />
    </ActiveChecklistProvider>
  );
}
