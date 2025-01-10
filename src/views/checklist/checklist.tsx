import { useParams } from 'react-router';

import { ActiveChecklistProvider } from './active-checklist-state';
import { Configuration } from './configuration';

export function ChecklistView() {
  const { checklistId, tab } = useParams();

  return (
    <ActiveChecklistProvider checklistId={checklistId} tab={tab}>
      Checklist works: {checklistId}
      {tab && ` | ${tab}`}
      <Configuration />
    </ActiveChecklistProvider>
  );
}
