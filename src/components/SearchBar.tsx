import { Search } from 'lucide-react';

/**
 * @interface SearchBarProps
 * @description Defines the props for the SearchBar component.
 * @property {string} value - The current value of the search input.
 * @property {(value: string) => void} onChange - Callback function to handle changes in the search input.
 * @property {string} [placeholder] - Optional placeholder text for the search input.
 */
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * @component SearchBar
 * @description A reusable search bar component with an icon.
 * @param {SearchBarProps} props - The props for the component.
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search calculators...',
}: SearchBarProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
  );
};

export default SearchBar;