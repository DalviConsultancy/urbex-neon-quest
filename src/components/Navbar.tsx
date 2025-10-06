import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Volume2, VolumeX, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const publicNavLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Rules", path: "/rules" },
    { name: "Join Us", path: "/join" },
  ];

  const memberNavLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Maps", path: "/maps" },
    { name: "Gallery", path: "/gallery" },
    { name: "Feedback", path: "/feedback" },
  ];

  const navLinks = user ? memberNavLinks : publicNavLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary text-glow-red glitch" data-text="URBEX">
              URBEX
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium animated-underline transition-colors ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-foreground hover:text-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMusicPlaying(!isMusicPlaying)}
              className="text-foreground hover:text-secondary"
            >
              {isMusicPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
            {user ? (
              <Button 
                onClick={() => signOut()}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button className="bg-primary hover:bg-primary/80 text-white glow-red">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-foreground hover:text-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                className="text-foreground hover:text-secondary"
              >
                {isMusicPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
              {user ? (
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button className="bg-primary hover:bg-primary/80 text-white glow-red">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
