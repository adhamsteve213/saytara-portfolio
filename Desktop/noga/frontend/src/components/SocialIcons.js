import React from 'react';

// Reusable social icons component
// Accepts: links = [ { name: 'Instagram', url: 'https://...' }, ... ]
export default function SocialIcons({ links = [] }) {
  // return a colorful, animated icon button for each known platform
  const renderIcon = (name) => {
    const key = name.toLowerCase();
    if (key.includes('instagram')) {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
            <path d="M7 2C4.238 2 2 4.238 2 7v10c0 2.762 2.238 5 5 5h10c2.762 0 5-2.238 5-5V7c0-2.762-2.238-5-5-5H7zm8.75 3.25a1 1 0 112 0 1 1 0 01-2 0zM12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zM12 9a3 3 0 100 6 3 3 0 000-6z" />
          </svg>
  );
}
    if (key.includes('facebook')) {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
            <path d="M22 12a10 10 0 10-11.5 9.87v-6.99H8.9v-2.88h1.62V9.41c0-1.6.95-2.49 2.41-2.49.7 0 1.43.12 1.43.12v1.57h-.8c-.79 0-1.04.49-1.04.99v1.2h1.77l-.28 2.88h-1.5v6.99A10 10 0 0022 12z" />
          </svg>
        );
    }
    if (key.includes('tiktok')) {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
            <path d="M12 3v10.25A4.75 4.75 0 109.5 18V8h2V3h.5z" />
          </svg>
        );
    }
    
    // default:
    // Generic link icon
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
        <path d="M3.9 12a6.1 6.1 0 016.1-6.1h3v2h-3a4.1 4.1 0 100 8.2h3v2h-3A6.1 6.1 0 013.9 12zM13 6.1h3a6.1 6.1 0 010 12.2h-3v-2h3a4.1 4.1 0 000-8.2h-3v-2z" />
      </svg>
    );
  };

  const classForName = (name) => {
    const key = (name || '').toLowerCase();
    if (key.includes('instagram')) return 'bg-gradient-to-tr from-pink-500 via-yellow-400 to-orange-500';
    if (key.includes('facebook')) return 'bg-gradient-to-tr from-blue-600 to-indigo-700';
    if (key.includes('tiktok')) return 'bg-gradient-to-tr from-fuchsia-600 via-cyan-400 to-black';

    return 'bg-gradient-to-tr from-gray-600 to-gray-700';
  };

return (
    <div className="flex items-center justify-center gap-4">
      {links.map((l, i) => (
        <a
          key={i}
          href={l.url}
          title={l.name}
          aria-label={l.name}
          target="_blank"
          rel="noreferrer noopener"
          className={`inline-flex items-center justify-center p-3 rounded-full shadow-lg transform-gpu transition-all duration-300 ${classForName(l.name)} hover:scale-110 hover:-translate-y-1 hover:rotate-6 hover:shadow-xl hover:animate-pulse active:scale-95`}
        >
          {renderIcon(l.name)}
          <span className="sr-only">{l.name}</span>
        </a>
      ))}
    </div>
  );
}

