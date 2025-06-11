import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex-shrink-0 text-2xl font-bold text-blue-600 tracking-tight">
            Gulita
            <span className="ml-2 text-sm font-medium text-gray-500 align-top">Diabetes Check</span>
          </a>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              About
            </a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              How It Works
            </a>
            <Link
              to="/test"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-200"
            >
              Try Diabetes Test
            </Link>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button (optional, not implemented) */}
            <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
