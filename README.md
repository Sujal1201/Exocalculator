# Exocalculator - A Professional Calculator Suite

Exocalculator is a versatile, open-source web application that provides a suite of professional and easy-to-use calculators. From financial calculations like EMIs and currency conversions to scientific and mathematical tools like number system converters and unit converters, Exocalculator is designed to be a one-stop solution for a wide range of calculations.

## ✨ Features

- **15+ Calculators:** A comprehensive collection of calculators for various needs.
- **Real-time Currency Conversion:** Fetches the latest exchange rates from an external API.
- **Unit Conversion:** Supports a wide range of units for length, area, volume, weight, temperature, and more.
- **Financial Tools:** Includes EMI and percentage calculators for financial planning.
- **Developer Tools:** A number system converter for binary, decimal, hexadecimal, and octal conversions.
- **Responsive Design:** A clean, modern, and fully responsive UI built with Tailwind CSS.
- **Search Functionality:** Easily find the calculator you need with a quick search.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/exocalculator.git
    cd exocalculator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    The Currency Calculator requires an API key from [ExchangeRate-API](https://www.exchangerate-api.com/).

    - Create a `.env` file in the root of the project.
    - Add your API key to the `.env` file as follows:
      ```
      VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
      ```
    - If you don't have an API key, the currency calculator will use fallback approximate values.

## 📜 Available Scripts

In the project directory, you can run the following commands:

- **`npm run dev`**: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The page will reload when you make changes.

- **`npm run build`**: Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

- **`npm run lint`**: Lints the project files using ESLint to check for code quality and style issues.

- **`npm run typecheck`**: Runs the TypeScript compiler to check for type errors in the codebase.

## 📂 Project Structure

The project follows a standard React application structure:

```
/src
|-- /components     # Reusable UI components (e.g., individual calculators, SearchBar)
|-- /data           # Static data, such as the list of calculators
|-- /pages          # Page components (e.g., HomePage, CalculatorPage)
|-- /types          # TypeScript type definitions and interfaces
|-- /utils          # Utility functions and conversion data
|-- App.tsx         # Root application component with routing
|-- main.tsx        # Main entry point of the application
```

## 🛠️ Technologies Used

- **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A fast build tool and development server for modern web projects.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[React Router](https://reactrouter.com/)**: For declarative routing in the application.
- **[Lucide React](https://lucide.dev/)**: A library of simply beautiful icons.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or want to add a new calculator, please feel free to open an issue or submit a pull request.