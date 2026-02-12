import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { SidePanel } from '../panels/SidePanel';
import { useUIStore } from '../../store/uiStore';

export function AppShell() {
  const panelOpen = useUIStore((s) => s.panelOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
      {panelOpen && <SidePanel />}
    </div>
  );
}
