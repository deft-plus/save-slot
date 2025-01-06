import { BrowserRouter, Route, Routes } from 'react-router';

import { AboutView } from '@/views/about';
import { ChecklistView } from '@/views/checklist';
import { HomeView } from '@/views/home';
import { NotFoundView } from '@/views/not-found';

export function App() {
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
