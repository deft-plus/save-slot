import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useAppState } from '@/state';
import { NotFoundView } from '@/views/not-found';

export function ChecklistView() {
  const { checklistId, tab } = useParams();
  const checklists = useAppState((state) => state.checklists);
  const loadPreset = useAppState((state) => state.loadPreset);

  const checklist = checklists.find((checklist) => checklist.id === checklistId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncActiveChecklist = async () => {
      if (!checklist) {
        return;
      }

      if (checklist.isPreset) {
        await loadPreset(checklist.id);
      }

      setLoading(false);
    };

    syncActiveChecklist();

    // Rule disabled since we don't want to run this effect on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checklists]);

  if (!checklist) {
    return <NotFoundView />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Checklist works: {checklistId} | {tab}
    </div>
  );
}
