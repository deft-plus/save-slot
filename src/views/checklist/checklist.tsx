import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useAppState } from '@/state';
import { NotFoundView } from '@/views/not-found';

import { Theme } from './theme';

export function ChecklistView() {
  const { checklistId, tab } = useParams();
  const checklists = useAppState((state) => state.checklists);
  const loadPreset = useAppState((state) => state.loadPreset);

  const checklist = checklists.find((checklist) => checklist.id === checklistId);
  const doesTabExist = !!(tab === undefined || checklist?.tabs?.some((t) => t.id === tab));
  const hasMap = !!checklist?.map;
  const isTabValid = doesTabExist || (tab === 'map' && hasMap);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncActiveChecklist = async () => {
      if (!checklist || !isTabValid) {
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
  }, [checklist?.id, isTabValid]);

  if (!checklist || !isTabValid) {
    return <NotFoundView />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Checklist works: {checklistId}
      {tab && ` | ${tab}`}
      <Theme image={checklist.backgroundImage} fonts={checklist.fonts} theme={checklist.theme} />
    </div>
  );
}
