import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { useAppState } from '@/state/app-state';
import { AboutView } from '@/views/about';
import { ChecklistView } from '@/views/checklist';
import { HomeView } from '@/views/home';
import { NotFoundView } from '@/views/not-found';

export function App() {
  const initializeState = useAppState((s) => s.initialize);

  useEffect(() => {
    initializeState();
    // Rule disabled because we only want to run this effect once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p>App Works!</p>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomeView />} />
          <Route path="about" element={<AboutView />} />
          <Route path="app/:checklistId" element={<ChecklistView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
