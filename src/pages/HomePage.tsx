import { Link } from 'react-router-dom';
import { calculators } from '../data/calculators';

export default function HomePage() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link
              key={calc.id}
              to={`/calculator/${calc.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`p-4 rounded-full ${calc.color} mb-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{calc.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{calc.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}