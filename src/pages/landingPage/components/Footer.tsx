import { Link } from "react-router-dom";
import { SiGithub, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-white tracking-tight">Gulita</span>
              <span className="ml-2 text-sm text-blue-300">Diabetes Check</span>
            </Link>
            <p className="mt-2 text-slate-400 text-sm">Empowering you to take control of your health.</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <Link to="/test" className="hover:text-white transition-colors">
              Try Test
            </Link>
            <Link to="/login" className="hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/signup" className="hover:text-white transition-colors">
              Register
            </Link>
          </nav>

          {/* Social Links (Optional but Recommended) */}
          <div className="flex items-center gap-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <SiX color="#61DAFB" size={24} />
                <span className="sr-only">X</span>
              </Button>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <SiGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <SiInstagram className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </a>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} Gulita. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
