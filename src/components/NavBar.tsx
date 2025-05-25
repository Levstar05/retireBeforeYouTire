import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiggyBank, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-financial-400 to-financial-600 blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white p-2 rounded-full">
                  <PiggyBank className="h-8 w-8 text-financial-600" />
                </div>
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900">RetireBeforeYouTire</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/calculator" active={isActive('/calculator')}>Calculator</NavLink>
            <NavLink to="/investments" active={isActive('/investments')}>Investments</NavLink>
            <NavLink to="/withdrawal" active={isActive('/withdrawal')}>Withdrawal</NavLink>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col space-y-1 px-4 py-3">
            <MobileNavLink to="/calculator" active={isActive('/calculator')}>Calculator</MobileNavLink>
            <MobileNavLink to="/investments" active={isActive('/investments')}>Investments</MobileNavLink>
            <MobileNavLink to="/withdrawal" active={isActive('/withdrawal')}>Withdrawal</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  active: boolean;
}

function NavLink({ children, to, active }: NavLinkProps) {
  return (
    <Link to={to}>
      <Button 
        variant="ghost" 
        className={`relative px-4 ${active ? 'text-financial-600 font-medium' : 'text-gray-600'}`}
      >
        {children}
        {active && (
          <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-financial-500 rounded-full" />
        )}
      </Button>
    </Link>
  );
}

function MobileNavLink({ children, to, active }: NavLinkProps) {
  return (
    <Link to={to} className="w-full">
      <Button 
        variant="ghost" 
        className={`w-full justify-start ${active ? 'bg-financial-50 text-financial-600 font-medium' : 'text-gray-600'}`}
      >
        {children}
      </Button>
    </Link>
  );
}
