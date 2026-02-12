import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { JourneyList } from './components/journey/JourneyList';
import { JourneyEditor } from './components/journey/JourneyEditor';
import { PersonaList } from './components/persona/PersonaList';
import { PersonaDetail } from './components/persona/PersonaDetail';
import { LibraryView } from './components/library/LibraryView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<JourneyList />} />
          <Route path="/journey/:id" element={<JourneyEditor />} />
          <Route path="/personas" element={<PersonaList />} />
          <Route path="/persona/:id" element={<PersonaDetail />} />
          <Route path="/library/:type" element={<LibraryView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
