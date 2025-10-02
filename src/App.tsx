import { Routes, Route, Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import { calculators } from './data/calculators';

/**
 * @component App
 * @description The root component of the Calculator Suite application.
 * It sets up the main layout including the header, main content area, and footer.
 * It also defines the application's routing using `react-router-dom`.
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Calculator Suite</h1>
              <p className="text-sm text-gray-600">Professional conversion tools</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator/:id" element={<CalculatorPage />} />
        </Routes>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Professional calculator suite with {calculators.length} specialized tools
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Accurate conversions for currency, measurements, and calculations
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;