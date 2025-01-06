import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Drawer } from '@/components/drawer';
import { useAppState } from '@/state';
import { AboutView } from '@/views/about';
import { ChecklistView } from '@/views/checklist';
import { HomeView } from '@/views/home';
import { NewChecklistView } from '@/views/new-checklist';
import { NotFoundView } from '@/views/not-found';

export function App() {
  const initializeState = useAppState((s) => s.initialize);

  useEffect(() => {
    initializeState();
    // Rule disabled because we only want to run this effect once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Drawer />
      <Routes>
        <Route index element={<HomeView />} />
        <Route path="about" element={<AboutView />} />
        <Route path="new-checklist" element={<NewChecklistView />} />
        <Route path="app/:checklistId" element={<ChecklistView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}
