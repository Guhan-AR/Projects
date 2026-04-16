import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { ShoppingCart, Tag, Plus, Star, Sparkles, Check } from 'lucide-react';

const PublicStore = () => {
    const { user, token } = useAuthStore();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCartId, setAddingToCartId] = useState(null);
    const [addedItemIds, setAddedItemIds] = useState(new Set());

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId) => {
        if (!user || user.role !== 'User') {
            alert('Please log in as a User to add items to your cart.');
            return;
        }

        setAddingToCartId(productId);
        try {
            await axios.post('/cart', { product_id: productId, quantity: 1 }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAddedItemIds(prev => new Set([...prev, productId]));
            setTimeout(() => {
                setAddedItemIds(prev => {
                    const newSet = new Set([...prev]);
                    newSet.delete(productId);
                    return newSet;
                });
            }, 2000);
        } catch (err) {
            console.error(err);
            alert('Failed to add to cart.');
        } finally {
            setAddingToCartId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 animate-slide-up">

            {products.length === 0 ? (
                <div className="text-center py-20 glass-panel rounded-2xl">
                    <ShoppingCart className="mx-auto h-16 w-16 text-slate-600 mb-4" />
                    <h3 className="text-lg font-medium text-slate-200">No products available</h3>
                    <p className="mt-2 text-slate-400">Our sellers are currently restocking. Check back later!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-full aspect-w-1 aspect-h-1 bg-gradient-to-br from-slate-800 to-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center p-8 mb-5 border border-slate-700/30 group-hover:border-indigo-500/30 transition-all duration-500 relative shadow-inner">
                                <div className="absolute top-3 left-3 bg-slate-800/80 backdrop-blur text-indigo-400 text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-indigo-500/20 font-semibold">In Stock</div>
                                <ShoppingCart className="h-16 w-16 text-slate-600 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-500 drop-shadow-lg" />
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-base font-semibold text-white truncate pr-4 group-hover:text-indigo-300 transition-colors">
                                        {product.name}
                                    </h3>
                                </div>

                                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed flex-grow">{product.description}</p>

                                <div className="mt-6 pt-5 flex items-center justify-between border-t border-slate-800/80">
                                    <div>
                                        <p className="text-2xl font-bold text-white tracking-tight">${product.price.toFixed(2)}</p>
                                        <div className="mt-1 flex items-center text-xs text-slate-500">
                                            <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500 opacity-80" /> 4.8 (124 reviews)
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product.id)}
                                        disabled={addingToCartId === product.id}
                                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white ${addedItemIds.has(product.id) ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-indigo-600 hover:bg-indigo-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all active:scale-90 shadow-lg ${addingToCartId === product.id ? 'opacity-70 cursor-wait' : 'hover:-translate-y-0.5'}`}
                                        title="Add to Cart"
                                    >
                                        {addingToCartId === product.id ? (
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : addedItemIds.has(product.id) ? (
                                            <Check className="h-5 w-5" />
                                        ) : (
                                            <Plus className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PublicStore;
