import { useState } from 'react';

import { useAppState } from '@/state';

import { useActiveChecklist } from './active-checklist-state';

/**
 * Reset button component
 *
 * Resets all the items of the current checklist.
 */
export function ResetButton() {
  const [loading, setLoading] = useState(false);

  const resetChecklist = useAppState((state) => state.resetChecklist);
  const checklist = useActiveChecklist();

  return (
    <>
      <button
        className="reset-button"
        onClick={() => {
          if (!confirm('Are you sure you want to reset the checklist?')) {
            return;
          }

          setLoading(true);
          resetChecklist(checklist.id).finally(() => setLoading(false));
        }}
      >
        {loading ? 'Resetting...' : 'Reset'}
      </button>
      {loading && <div className="reset-button-overlay" />}
    </>
  );
}
