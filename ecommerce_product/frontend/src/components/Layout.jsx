import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { LogOut, LayoutDashboard, Store, Search, Heart, ChevronDown } from 'lucide-react';

const Layout = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isCart = location.pathname === '/cart';

    return (
        <div className="min-h-screen flex flex-col pt-16">
            <nav className="fixed w-full top-0 z-[100] bg-[#0a0a0f]/85 backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.07)] h-16 px-4 md:px-10 flex items-center justify-between transition-all">
                <Link to="/" className="flex items-center gap-2 font-['Playfair_Display',serif] text-[22px] font-bold text-[#c9a96e] tracking-[3px] uppercase">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    LUXE
                </Link>

                {user?.role === 'User' ? (
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="text-[#9a9494] hover:text-[#f0ede8] font-medium text-[13px] tracking-[1px] uppercase transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[1px] after:bg-[#c9a96e] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">New Arrivals</Link>
                            <Link to="/" className={`text-[#9a9494] hover:text-[#f0ede8] font-medium text-[13px] tracking-[1px] uppercase transition-colors relative ${!isCart ? 'text-[#c9a96e] after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'} after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[1px] after:bg-[#c9a96e] after:transition-transform`}>Store</Link>
                            <Link to="/cart" className={`text-[#9a9494] hover:text-[#f0ede8] font-medium text-[13px] tracking-[1px] uppercase transition-colors relative ${isCart ? 'text-[#c9a96e] after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'} after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[1px] after:bg-[#c9a96e] after:transition-transform`}>My Cart</Link>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="text-[#9a9494] hover:text-[#f0ede8] font-medium text-[13px] tracking-[1px] uppercase transition-colors">Store</Link>
                            {user?.role === 'Admin' && (
                                <Link to="/admin/dashboard" className="text-[#9a9494] hover:text-[#f0ede8] font-medium text-[13px] tracking-[1px] uppercase transition-colors inline-flex items-center"><LayoutDashboard className="w-4 h-4 mr-1" /> Admin Dash</Link>
                            )}
                            {user?.role === 'Seller' && (
                                <Link to="/seller/products" className="text-[#9a9494] hover:text-[#f0ede8] font-medium text-[13px] tracking-[1px] uppercase transition-colors inline-flex items-center"><Store className="w-4 h-4 mr-1" /> My Products</Link>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-5">
                    {user ? (
                        <>
                            {user.role === 'User' && (
                                <>
                                    <button className="w-9 h-9 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#12121a] flex items-center justify-center text-[#9a9494] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all relative">
                                        <Search className="w-4 h-4" />
                                    </button>
                                    <button className="w-9 h-9 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#12121a] flex items-center justify-center text-[#9a9494] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all relative">
                                        <Heart className="w-4 h-4" />
                                        <span className="absolute -top-1 -right-1 bg-[#c9a96e] text-[#000] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
                                    </button>
                                </>
                            )}

                            <div className="flex items-center gap-2 bg-[#12121a] border border-[rgba(255,255,255,0.12)] rounded-full py-1.5 pl-2 pr-3.5 hover:border-[#c9a96e] transition-all cursor-pointer group" onClick={handleLogout}>
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b5e2a] flex items-center justify-center text-[11px] font-bold text-[#000]">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-[13px] font-medium text-[#9a9494] group-hover:text-[#f0ede8] transition-colors">{user.username} <span className="text-[10px] hidden sm:inline-block ml-1 opacity-60">({user.role})</span></span>
                                <LogOut className="w-3.5 h-3.5 text-[#6a6464] ml-1 group-hover:text-[#red-400]" />
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="bg-[#c9a96e] hover:bg-[#e8c98a] text-[#000] font-bold text-[13px] px-5 py-2.5 rounded-xl uppercase tracking-[1px] transition-all">Sign In</Link>
                    )}
                </div>
            </nav>

            <main className="flex-1 w-full mx-auto relative z-10 animate-[fadeIn_0.5s_ease-out]">
                <Outlet />
            </main>

            {/* LUXE Footer */}
            <footer className="bg-[#12121a] border-t border-[rgba(255,255,255,0.07)] pt-10 pb-6 mt-auto relative z-10 font-['DM_Sans',sans-serif]">
                <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="font-['Playfair_Display',serif] text-[20px] text-[#c9a96e] tracking-[3px] uppercase mb-3">LUXE</div>
                        <p className="text-[13px] text-[#6a6464] leading-[1.7] max-w-[260px]">Premium products curated for the discerning customer. Authentic, quality-guaranteed, delivered with care since 2018.</p>
                    </div>
                    <div>
                        <div className="text-[11px] font-bold tracking-[2px] uppercase text-[#9a9494] mb-4">Shop</div>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">New Arrivals</a>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">Best Sellers</a>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">Sale</a>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">Collections</a>
                    </div>
                    <div>
                        <div className="text-[11px] font-bold tracking-[2px] uppercase text-[#9a9494] mb-4">Support</div>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">Track Order</a>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">Returns</a>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">FAQ</a>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">Contact</a>
                    </div>
                    <div>
                        <div className="text-[11px] font-bold tracking-[2px] uppercase text-[#9a9494] mb-4">Company</div>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">About</a>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">Careers</a>
                        <a href="#" className="block text-[13px] text-[#6a6464] mb-2.5 hover:text-[#c9a96e] transition-colors">Sustainability</a>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-10 border-t border-[rgba(255,255,255,0.07)] pt-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-[12px] text-[#6a6464]">© 2026 LUXE Commerce. All rights reserved.</span>
                    <div className="flex gap-2">
                        <span className="text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded border border-[rgba(255,255,255,0.12)] text-[#6a6464]">PCI DSS</span>
                        <span className="text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded border border-[rgba(255,255,255,0.12)] text-[#6a6464]">ISO 27001</span>
                        <span className="text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded border border-[rgba(255,255,255,0.12)] text-[#6a6464]">GDPR</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
