import { useLocation, useParams } from 'react-router-dom';
import { useJourney, usePersona } from '../../hooks/useDB';

export function TopBar() {
  const location = useLocation();
  const params = useParams();
  const journey = useJourney(params.id);
  const persona = usePersona(params.id);

  let title = 'Journeys';
  let breadcrumb = '';

  if (location.pathname.startsWith('/journey/') && journey) {
    title = journey.title;
    breadcrumb = 'Journeys';
  } else if (location.pathname === '/personas') {
    title = 'Personas';
  } else if (location.pathname.startsWith('/persona/') && persona) {
    title = persona.title;
    breadcrumb = 'Personas';
  } else if (location.pathname.startsWith('/library/')) {
    const type = params.type ?? 'insights';
    title = type.charAt(0).toUpperCase() + type.slice(1);
    breadcrumb = 'Library';
  }

  return (
    <header className="flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800">
      {breadcrumb && (
        <>
          <span className="text-sm text-gray-400 dark:text-gray-500">{breadcrumb}</span>
          <span className="text-sm text-gray-300 dark:text-gray-600">/</span>
        </>
      )}
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
    </header>
  );
}
