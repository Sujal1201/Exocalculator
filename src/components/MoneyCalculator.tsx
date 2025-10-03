export default function MoneyCalculator() {
  const openSite = () => {
    // Open notecounter.shop in a new tab safely
    window.open('https://notecounter.shop', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openSite}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') openSite();
      }}
      className="cursor-pointer bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-colors"
      title="Open notecounter.shop"
    >
      <div className="p-3 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
        {/* Inline cash-stack SVG similar to Bootstrap's bi-cash-stack */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="w-6 h-6">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 2h16v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm4 3.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"/>
          <path d="M1 8.5v2A1.5 1.5 0 0 0 2.5 12h11A1.5 1.5 0 0 0 15 10.5v-2H1z" opacity=".2"/>
        </svg>
      </div>
      <div>
        <div className="text-lg font-medium text-gray-800">Money</div>
        <div className="text-sm text-gray-500">Open notecounter.shop</div>
      </div>
    </div>
  );
}
