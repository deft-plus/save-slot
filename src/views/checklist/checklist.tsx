import { useParams } from 'react-router';

export function ChecklistView() {
  const { checklistId } = useParams();

  return <div>Checklist works: {checklistId}</div>;
}
