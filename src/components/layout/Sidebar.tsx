import { NavLink } from 'react-router-dom';
import { Map, Users, Library, LayoutDashboard } from 'lucide-react';

const navItems = [
  { to: '/', icon: Map, label: 'Journeys' },
  { to: '/personas', icon: Users, label: 'Personas' },
  { to: '/library/insights', icon: Library, label: 'Insights' },
  { to: '/library/opportunities', icon: LayoutDashboard, label: 'Opportunities' },
];

export function Sidebar() {
  return (
    <aside className="flex w-56 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-14 items-center gap-2 border-b border-gray-200 px-4">
        <Map className="h-6 w-6 text-indigo-600" />
        <span className="text-lg font-semibold text-gray-900">JourneyMap</span>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
