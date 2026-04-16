import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  // Close drawer when route changes
  useEffect(() => {
    setDrawerOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ]

  const isActive = (path: string) =>
    location.pathname === path ? 'text-brand-600' : 'hover:text-brand-600'

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex flex-col items-center">
            <img src="/logo_white_bg-removebg-preview.png" alt="AccuMark Logo" className="w-[120px]" />
            <p className="text-[9px] uppercase tracking-[0.1em] font-bold text-slate-500 mt-1 text-center">
              From statement calculation to sales conversion
            </p>
          </Link>
          
          <nav className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className={`transition-colors ${isActive(link.to)}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Link 
              to="/contact"
              className={`hidden md:inline-block bg-brand-900 text-white font-medium py-2 px-6 rounded-full hover:bg-brand-700 transition-all shadow-md hover:shadow-lg ${
                location.pathname === '/contact' ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'
              }`}
            >
              Get Started
            </Link>
            

            <button 
              id="menuBtn" 
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition" 
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="block w-6 h-0.5 bg-slate-700 transition-all duration-300"></span>
              <span className="block w-6 h-0.5 bg-slate-700 transition-all duration-300"></span>
              <span className="block w-6 h-0.5 bg-slate-700 transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        id="drawerOverlay" 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'hidden opacity-0'}`}
        onClick={() => setDrawerOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div 
        id="mobileDrawer" 
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <img src="/logo_white_bg-removebg-preview.png" alt="AccuMark Logo" className="w-[100px]" />
          <button 
            id="closeBtn" 
            className="p-2 rounded-lg hover:bg-slate-100 transition" 
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-6 py-8 gap-2 text-slate-700 font-semibold text-base flex-1">
          {navLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              className="px-4 py-3 rounded-xl hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 pb-8">
          <Link 
            to="/contact" 
            className="block text-center bg-brand-900 text-white font-semibold py-3 px-6 rounded-full hover:bg-brand-700 transition-all shadow-md"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  )
}
