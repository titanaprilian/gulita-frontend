import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

// Define your nav items in an array for easier management
const navItems = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
];

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 text-2xl font-bold text-blue-600 tracking-tight">
            Gulita
            <span className="ml-2 text-sm font-medium text-gray-500 align-top">Diabetes Check</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2 items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {/* For anchor links, a standard <a> tag is fine */}
                    <a href={item.href} className={navigationMenuTriggerStyle() + " text-gray-700 hover:text-blue-600"}>
                      {item.label}
                    </a>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button asChild variant={"primary"} className="hidden md:inline-flex">
              <Link to="/test">Try Diabetes Test</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-4 py-6 px-4">
                  {/* Mobile Logo */}
                  <Link to="/" className="text-xl font-bold text-blue-600">
                    Gulita
                  </Link>
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <a href={item.href} className="text-lg text-gray-700 hover:text-blue-600">
                        {item.label}
                      </a>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button asChild variant={"primary"} className="w-full">
                      <Link to="/test">Try Diabetes Test</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
