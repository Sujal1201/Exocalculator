import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculators } from '../data/calculators';
import SearchBar from '../components/SearchBar';

/**
 * @component HomePage
 * @description The main landing page of the application. It displays a grid of available calculators
 * and includes a search bar to filter them by name.
 * @returns {JSX.Element} The rendered home page.
 */
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * @const {Array<object>} filteredCalculators
   * @description An array of calculators filtered based on the user's search query.
   * The filtering is case-insensitive.
   */
  const filteredCalculators = calculators.filter((calculator) =>
    calculator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Choose a Calculator
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Select from our suite of powerful and easy-to-use calculators.
        </p>
      </div>
      <div className="max-w-md mx-auto mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      {filteredCalculators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCalculators.map((calc) => {
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
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-800">No calculators found</h3>
          <p className="text-gray-600 mt-2">
            Try adjusting your search or browse our full list of calculators.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;