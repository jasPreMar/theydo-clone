import { NavLink } from 'react-router-dom';
import { Map, Users, Library, LayoutDashboard, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const navItems = [
  { to: '/', icon: Map, label: 'Journeys' },
  { to: '/personas', icon: Users, label: 'Personas' },
  { to: '/library/insights', icon: Library, label: 'Insights' },
  { to: '/library/opportunities', icon: LayoutDashboard, label: 'Opportunities' },
];

export function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <aside
      className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-200 ${
        collapsed ? 'w-14' : 'w-56'
      }`}
    >
      <div className="flex h-14 items-center border-b border-gray-200 px-3">
        {collapsed ? (
          <button
            onClick={toggleSidebar}
            className="mx-auto rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            title="Expand sidebar"
          >
            <PanelLeftOpen className="h-5 w-5" />
          </button>
        ) : (
          <>
            <Map className="h-6 w-6 shrink-0 text-indigo-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">JourneyMap</span>
            <button
              onClick={toggleSidebar}
              className="ml-auto rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center rounded-lg text-sm font-medium transition-colors ${
                collapsed ? 'justify-center px-2 py-2' : 'gap-3 px-3 py-2'
              } ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
