import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, CloseIcon } from './Icons';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 ${scrolled ? 'bg-navy-900 shadow-2xl' : 'bg-navy-900/95'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo1.png" alt="Debt Service" className="h-10 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === l.to
                    ? 'bg-crimson-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >{l.label}</Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/contact" className="btn-primary text-sm py-2 px-5 rounded-lg">
              Free Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-navy-800 border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === l.to ? 'bg-crimson-600 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >{l.label}</Link>
            ))}
            <div className="pt-3 border-t border-white/10">
              <Link to="/contact" className="block btn-primary text-center text-sm py-3">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
