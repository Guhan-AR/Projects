import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { ShoppingCart, Trash2, ArrowRight, CreditCard, ShieldCheck, RefreshCw, Star, Info, Minus, Plus } from 'lucide-react';
import { format, addDays } from 'date-fns';

const placeholderEmojis = ['👟', '⌚', '🎧', '📸', '💻'];
const placeholderVariants = [
    ['Midnight Navy', 'Size: UK 9'],
    ['46mm', 'Natural Titanium', 'GPS + Cellular'],
    ['Midnight Black'],
    ['Mirrorless', '50mm Lens'],
    ['16GB RAM', '512GB SSD']
];

const Cart = () => {
    const { token } = useAuthStore();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [notification, setNotification] = useState({ text: '', show: false, isError: false });

    useEffect(() => {
        fetchCart();
    }, [token]);

    const showNotif = (text, isError = false) => {
        setNotification({ text, show: true, isError });
        setTimeout(() => setNotification(n => ({ ...n, show: false })), 2800);
    };

    const fetchCart = async () => {
        try {
            const res = await axios.get('/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(res.data);
        } catch (err) {
            console.error(err);
            showNotif('Failed to load cart', true);
        } finally {
            setLoading(false);
        }
    };

    const changeQty = async (id, currentQty, delta) => {
        const newQty = Math.max(1, currentQty + delta);
        if (newQty === currentQty) return; // Can't go below 1

        try {
            // Find the product_id for this cart_item_id to use our existing POST upsert endpoint
            const item = cartItems.find(i => i.cart_item_id === id);
            if (!item) return;

            // We need to send an absolute update or delete/re-add.
            // Easiest is to send the delta if our backend POST increments, but our backend currently does `quantity = quantity + ?`
            // Wait, our backend POST accepts `quantity` and DOES `quantity = quantity + quantity`.
            await axios.post('/cart', { product_id: item.id, quantity: delta }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCartItems(cartItems.map(i => i.cart_item_id === id ? { ...i, quantity: newQty } : i));
            showNotif('Quantity updated');
        } catch (err) {
            console.error(err);
            showNotif('Failed to update quantity', true);
        }
    };

    const handleRemove = async (id) => {
        try {
            await axios.delete(`/cart/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(cartItems.filter(i => i.cart_item_id !== id));
            showNotif('Item removed from cart');
        } catch (err) {
            console.error(err);
            showNotif('Failed to remove item', true);
        }
    };

    const handleApplyPromo = () => {
        const code = promoCode.trim().toUpperCase();
        if (code === 'SAVE20') {
            const sub = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            setPromoDiscount(sub * 0.20);
            showNotif('Promo code SAVE20 applied!');
        } else if (code) {
            setPromoDiscount(0);
            showNotif('Invalid promo code', true);
        }
    };

    const handleCheckout = async () => {
        showNotif('Redirecting to secure checkout...');
        setTimeout(async () => {
            try {
                await axios.delete('/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                showNotif('Order successful! Thank you.');
                fetchCart();
            } catch (err) {
                showNotif('Checkout failed', true);
            }
        }, 1500);
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const subAfterPromo = subtotal - promoDiscount;
    const tax = subAfterPromo * 0.08;
    const total = subAfterPromo + tax;
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const freeShippingThreshold = 500;
    const progressPercent = Math.min(100, (subAfterPromo / freeShippingThreshold) * 100);
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subAfterPromo);

    if (loading) return (
        <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9a96e]"></div></div>
    );

    return (
        <>
            <div className={`fixed top-20 right-6 z-[999] bg-[#1a1a26] border border-[#rgba(255,255,255,0.12)] border-l-4 ${notification.isError ? 'border-l-[#f87171]' : 'border-l-[#4ade80]'} rounded-xl p-4 flex items-center gap-3 text-sm text-[#f0ede8] shadow-2xl transition-transform duration-300 ${notification.show ? 'translate-x-0' : 'translate-x-[120%]'}`}>
                <span>{notification.isError ? '✗' : '✓'}</span>
                <span>{notification.text}</span>
            </div>

            <div className="max-w-6xl mx-auto font-['DM_Sans',sans-serif]">

                {/* Progress Bar & Shipping Banner */}
                <div className="bg-[#12121a] border-b border-[rgba(255,255,255,0.07)] py-4 flex items-center justify-center -mx-4 sm:-mx-6 lg:-mx-8 px-4 mb-6 sticky top-16 z-40">
                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
                        <div className="flex items-center gap-2 text-[#4ade80]"><div className="w-6 h-6 rounded-full bg-[rgba(74,222,128,0.15)] border border-[rgba(74,222,128,0.3)] flex items-center justify-center">✓</div> Browse</div>
                        <div className="w-12 h-px bg-[rgba(74,222,128,0.4)]"></div>
                        <div className="flex items-center gap-2 text-[#c9a96e]"><div className="w-6 h-6 rounded-full bg-[#c9a96e] text-black flex items-center justify-center">2</div> Cart</div>
                        <div className="w-12 h-px bg-[rgba(255,255,255,0.12)] hidden sm:block"></div>
                        <div className="hidden sm:flex items-center gap-2 text-[#6a6464]"><div className="w-6 h-6 rounded-full bg-[#1a1a26] border border-[rgba(255,255,255,0.07)] flex items-center justify-center">3</div> Checkout</div>
                    </div>
                </div>

                {remainingForFreeShipping === 0 && (
                    <div className="bg-gradient-to-r from-[rgba(74,222,128,0.08)] to-[rgba(74,222,128,0.04)] border-b border-[rgba(74,222,128,0.12)] py-2.5 flex items-center justify-center gap-2 text-[13px] text-[#4ade80] mb-8 -mx-4 sm:-mx-6 lg:-mx-8">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                        Free express shipping on orders over ${freeShippingThreshold} — You qualify! 🎉
                    </div>
                )}

                {/* Page Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-[#f0ede8] tracking-[-0.5px]">Shopping Cart</h1>
                        <p className="text-[#6a6464] text-sm mt-2">{itemCount} items · Estimated delivery by <strong className="text-[#9a9494]">{format(addDays(new Date(), 3), 'MMM d, yyyy')}</strong></p>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 lg:items-start pb-20">

                    <div className="lg:col-span-8 flex flex-col gap-5">
                        {cartItems.length === 0 ? (
                            <div className="bg-[#12121a] border border-[rgba(255,255,255,0.07)] rounded-2xl p-12 text-center text-[#9a9494]">
                                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p className="font-['Playfair_Display',serif] text-2xl text-[#f0ede8] mb-2">Your cart is empty</p>
                                <p className="mb-6">Discover our latest collections and find something you love.</p>
                                <a href="/" className="inline-block bg-[#c9a96e] text-black font-bold text-sm px-6 py-3 rounded-xl uppercase tracking-wider hover:bg-[#e8c98a] transition-colors">Continue Shopping</a>
                            </div>
                        ) : (
                            cartItems.map((item, idx) => {
                                const variants = placeholderVariants[item.id % placeholderVariants.length];
                                const emoji = placeholderEmojis[item.id % placeholderEmojis.length];
                                const originalPrice = (item.price * 1.2).toFixed(2); // Mock original price 20% higher
                                const itemTotal = (item.price * item.quantity).toFixed(2);

                                return (
                                    <div key={item.cart_item_id} className="bg-[#12121a] border border-[rgba(255,255,255,0.07)] rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all animate-[fadeIn_0.4s_ease_both]" style={{ animationDelay: `${idx * 0.08}s` }}>
                                        <div className="w-[88px] h-[88px] rounded-xl bg-[#1a1a26] border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-3xl opacity-80 shrink-0">
                                            {emoji}
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="text-[10px] font-bold tracking-[2px] uppercase text-[#c9a96e] mb-1">{item.seller_name}</div>
                                                <h3 className="font-['Playfair_Display',serif] text-xl font-semibold text-[#f0ede8] leading-tight mb-2 pr-4">{item.name}</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {variants.map((v, i) => (
                                                        <span key={i} className="flex items-center gap-1 bg-[#1a1a26] border border-[rgba(255,255,255,0.07)] rounded-md px-2.5 py-1 text-[11px] font-medium text-[#9a9494]">{v}</span>
                                                    ))}
                                                </div>
                                                <div className={`mt-3 flex items-center gap-1.5 text-[11px] font-medium ${item.id % 3 === 0 ? 'text-[#fb923c]' : 'text-[#4ade80]'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${item.id % 3 === 0 ? 'bg-[#fb923c] shadow-[0_0_6px_#fb923c]' : 'bg-[#4ade80] shadow-[0_0_6px_#4ade80]'}`}></span>
                                                    {item.id % 3 === 0 ? `Only ${item.id} left in stock` : 'In Stock'}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[rgba(255,255,255,0.04)]">
                                                <div className="flex items-center bg-[#1a1a26] border border-[rgba(255,255,255,0.12)] rounded-lg overflow-hidden shrink-0">
                                                    <button onClick={(e) => { e.preventDefault(); changeQty(item.cart_item_id, item.quantity, -1); }} className="w-8 h-8 flex items-center justify-center text-[#9a9494] hover:bg-[rgba(255,255,255,0.07)] hover:text-[#f0ede8] transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                                                    <div className="w-9 text-center text-sm font-semibold text-[#f0ede8] border-x border-[rgba(255,255,255,0.07)] leading-8">{item.quantity}</div>
                                                    <button onClick={(e) => { e.preventDefault(); changeQty(item.cart_item_id, item.quantity, 1); }} className="w-8 h-8 flex items-center justify-center text-[#9a9494] hover:bg-[rgba(255,255,255,0.07)] hover:text-[#f0ede8] transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                                                </div>
                                                <button className="flex items-center gap-1.5 text-xs text-[#6a6464] hover:text-[#9a9494] hover:bg-[#1a1a26] px-2 py-1 rounded-md transition-all font-medium" onClick={() => showNotif('Saved for later ♡')}>
                                                    Save
                                                </button>
                                                <button className="flex items-center gap-1.5 text-xs text-[#6a6464] hover:text-[#f87171] hover:bg-[#1a1a26] px-2 py-1 rounded-md transition-all font-medium" onClick={() => handleRemove(item.cart_item_id)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1.5 sm:min-w-[120px] pt-2 sm:pt-0">
                                            <div className="text-[13px] text-[#6a6464] line-through">${(originalPrice * item.quantity).toFixed(2)}</div>
                                            <div className="font-['Playfair_Display',serif] text-[22px] font-semibold text-[#f0ede8]">${itemTotal}</div>
                                            <span className="text-[11px] font-bold text-[#4ade80] bg-[rgba(74,222,128,0.08)] border border-[rgba(74,222,128,0.15)] rounded-md px-2 py-0.5 mt-1">Save ${(item.quantity * (originalPrice - item.price)).toFixed(2)}</span>
                                            <div className="flex items-center gap-1 text-[11px] text-[#6a6464] mt-3 bg-[#1a1a26] px-2 py-1 rounded-full border border-[rgba(255,255,255,0.05)]">
                                                Arrives {format(addDays(new Date(), 3), 'MMM d')}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}

                        {cartItems.length > 0 && (
                            <div className="bg-[#12121a] border border-[rgba(255,255,255,0.07)] rounded-2xl p-5 md:p-6 mt-2">
                                <div className="text-[13px] font-semibold text-[#f0ede8] mb-3 flex items-center gap-2">Promo Code / Gift Card</div>
                                <div className="flex gap-3">
                                    <div className="flex-1 flex items-center gap-2.5 bg-[#1a1a26] border border-[rgba(255,255,255,0.12)] rounded-xl px-4 focus-within:border-[#c9a96e] transition-colors">
                                        <input type="text" placeholder="Enter code (try SAVE20)" value={promoCode} onChange={e => setPromoCode(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleApplyPromo()} className="w-full bg-transparent border-none outline-none text-sm text-[#f0ede8] py-3 placeholder:text-[#6a6464] tracking-wide" />
                                    </div>
                                    <button onClick={handleApplyPromo} className="bg-[#c9a96e] hover:bg-[#e8c98a] text-black font-bold text-[13px] tracking-[1px] uppercase px-6 rounded-xl transition-all">Apply</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column Order Summary */}
                    {cartItems.length > 0 && (
                        <div className="lg:col-span-4 mt-8 lg:mt-0 sticky top-[100px] animate-[fadeIn_0.5s_0.1s_both]">
                            <div className="bg-[#12121a] border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden">
                                <div className="p-5 md:p-6 border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between">
                                    <span className="font-['Playfair_Display',serif] text-lg font-semibold text-[#f0ede8]">Order Summary</span>
                                    <span className="text-xs text-[#6a6464] bg-[#1a1a26] border border-[rgba(255,255,255,0.07)] rounded-full px-2.5 py-0.5">{itemCount} Items</span>
                                </div>

                                <div className="p-5 md:p-6 flex flex-col gap-4">
                                    {/* Shipping Progress */}
                                    <div className="bg-[#1a1a26] border border-[rgba(255,255,255,0.07)] rounded-xl p-4 mb-2">
                                        <div className="flex justify-between text-xs mb-2">
                                            <span className="text-[#9a9494]">Free Shipping Progress</span>
                                            <span className="text-[#4ade80] font-semibold">${subAfterPromo.toFixed(0)} / ${freeShippingThreshold}</span>
                                        </div>
                                        <div className="h-1 bg-[rgba(255,255,255,0.07)] rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-[#4ade80] to-[#22d3ee] transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }}></div>
                                        </div>
                                        {remainingForFreeShipping > 0 ? (
                                            <div className="text-[11px] text-[#6a6464] mt-2">Add <span className="text-[#f0ede8] font-semibold">${remainingForFreeShipping.toFixed(2)}</span> more to qualify!</div>
                                        ) : (
                                            <div className="text-[11px] text-[#6a6464] mt-2">🎉 You qualify for <span className="text-[#4ade80] font-semibold">FREE Express Shipping!</span></div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#9a9494]">Subtotal</span>
                                        <span className="font-medium text-[#f0ede8]">${subtotal.toFixed(2)}</span>
                                    </div>

                                    {promoDiscount > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-[#4ade80] flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Discount Applied</span>
                                            <span className="font-medium text-[#4ade80]">- ${promoDiscount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#9a9494]">Shipping</span>
                                        <span className="font-medium text-[#4ade80]">{remainingForFreeShipping === 0 ? 'FREE' : '$19.00'}</span>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#9a9494]">Estimated Tax (8%)</span>
                                        <span className="font-medium text-[#f0ede8]">${tax.toFixed(2)}</span>
                                    </div>

                                    <div className="h-px bg-[rgba(255,255,255,0.07)] my-1"></div>

                                    <div className="flex justify-between items-baseline mt-1">
                                        <span className="font-['Playfair_Display',serif] text-lg font-semibold text-[#f0ede8]">Total</span>
                                        <span className="font-['Playfair_Display',serif] text-[28px] font-bold text-[#c9a96e]">${(total + (remainingForFreeShipping === 0 ? 0 : 19)).toFixed(2)}</span>
                                    </div>

                                    <button onClick={handleCheckout} className="w-full mt-2 bg-gradient-to-br from-[#c9a96e] to-[#8b6914] text-black font-bold text-[15px] uppercase tracking-[1px] py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,169,110,0.3)] group">
                                        Secure Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    <div className="text-center mt-2">
                                        <div className="text-[10px] uppercase tracking-[1px] text-[#6a6464] mb-3">Accepted Payment Methods</div>
                                        <div className="flex items-center justify-center gap-2 flex-wrap text-[#6a6464] text-[10px] font-bold">
                                            <span className="px-2 py-1 bg-[#1a1a26] border border-[rgba(255,255,255,0.07)] rounded">VISA</span>
                                            <span className="px-2 py-1 bg-[#1a1a26] border border-[rgba(255,255,255,0.07)] rounded">MC</span>
                                            <span className="px-2 py-1 bg-[#1a1a26] border border-[rgba(255,255,255,0.07)] rounded">AMEX</span>
                                            <span className="px-2 py-1 bg-[#1a1a26] border border-[rgba(255,255,255,0.07)] rounded">PAYPAL</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mt-2 pt-5 border-t border-[rgba(255,255,255,0.07)]">
                                        <div className="flex items-center gap-2 bg-[#1a1a26] p-2.5 rounded-lg border border-[rgba(255,255,255,0.04)]">
                                            <ShieldCheck className="w-4 h-4 text-[#9a9494] shrink-0" />
                                            <div className="text-[10px] leading-tight text-[#6a6464]"><strong className="text-[#f0ede8] block text-[11px]">Secure</strong>256-bit encrypt</div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#1a1a26] p-2.5 rounded-lg border border-[rgba(255,255,255,0.04)]">
                                            <RefreshCw className="w-4 h-4 text-[#9a9494] shrink-0" />
                                            <div className="text-[10px] leading-tight text-[#6a6464]"><strong className="text-[#f0ede8] block text-[11px]">Returns</strong>30-day policy</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
