const Footer = () => {
  return (
    <footer className="bg-blue-900 text-blue-100 py-10 mt-0 relative z-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="text-2xl font-bold text-white tracking-tight">Gulita</span>
          <span className="ml-2 text-sm text-blue-300">Diabetes Check</span>
          <p className="mt-2 text-blue-200 text-sm">Empowering you to take control of your health.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a href="#about" className="hover:text-white transition-colors duration-200">
            About
          </a>
          <a href="#features" className="hover:text-white transition-colors duration-200">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors duration-200">
            How It Works
          </a>
          <a href="/test" className="hover:text-white transition-colors duration-200">
            Try Test
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-blue-300 text-xs">
        &copy; {new Date().getFullYear()} Gulita. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
