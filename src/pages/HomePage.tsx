import { Link } from 'react-router-dom';
import { calculators } from '../data/calculators';
import { Calculator } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Calculator Suite</h1>
                <p className="text-sm text-gray-600">Professional conversion tools</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose a Calculator
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select from our suite of powerful and easy-to-use calculators.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.id}
                to={`/calculator/${calc.id}`}
                className="group block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6">
                  <div
                    className={`p-3 inline-block rounded-lg ${calc.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{calc.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{calc.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
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
};

export default HomePage;