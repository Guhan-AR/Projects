import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { Pencil, Trash2, Plus, Store, Tag } from 'lucide-react';

const SellerDashboard = () => {
    const { token } = useAuthStore();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetchMyProducts();
    }, [token]);

    const fetchMyProducts = async () => {
        try {
            const res = await axios.get('/products/my-products', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`/products/${currentProduct.id}`, currentProduct, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('/products', currentProduct, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setIsEditing(false);
            setCurrentProduct({ name: '', description: '', price: '' });
            fetchMyProducts();
        } catch (err) {
            console.error(err);
            alert('Failed to save product');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await axios.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchMyProducts();
        } catch (err) {
            console.error(err);
            alert('Failed to delete product');
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-8 animate-slide-up">
            <div className="glass-panel px-6 py-6 sm:px-8 rounded-2xl flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center tracking-tight">
                        <Store className="mr-3 h-6 w-6 text-indigo-400" /> Seller Dashboard
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">Manage your product listings securely.</p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 shadow-xl sm:rounded-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="px-6 py-8 sm:p-8">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                        {isEditing ? <><Pencil className="w-5 h-5 mr-2 text-indigo-400" /> Edit Product Listing</> : <><Plus className="w-5 h-5 mr-2 text-indigo-400" /> Create New Listing</>}
                    </h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Product Title</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={currentProduct.name}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                        className="bg-slate-950 block w-full sm:text-sm border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-indigo-500 focus:border-indigo-500 border outline-none transition-colors"
                                        placeholder="E.g. Wireless Noise-Cancelling Headphones"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Price (USD)</label>
                                <div className="mt-1 relative rounded-xl shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-slate-500 sm:text-sm font-medium">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={currentProduct.price}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                                        className="bg-slate-950 block w-full pl-8 sm:text-sm border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-indigo-500 focus:border-indigo-500 border outline-none transition-colors"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                                <div className="mt-1">
                                    <textarea
                                        rows={4}
                                        value={currentProduct.description}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                        className="bg-slate-950 block w-full sm:text-sm border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-indigo-500 focus:border-indigo-500 border outline-none transition-colors"
                                        placeholder="Detail the features of your product..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-800">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => { setIsEditing(false); setCurrentProduct({ name: '', description: '', price: '' }); }}
                                    className="mr-4 bg-transparent py-2.5 px-6 border border-slate-700 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-900 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                className="inline-flex justify-center flex-row items-center space-x-2 py-2.5 px-6 border border-transparent shadow-lg text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all active:scale-95"
                            >
                                {isEditing ? <Pencil className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
                                <span>{isEditing ? 'Update Listing' : 'Publish Product'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 shadow-xl overflow-hidden sm:rounded-2xl">
                <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                        <Tag className="w-5 h-5 mr-2 text-slate-400" /> Your Active Inventory
                    </h3>
                    <span className="bg-indigo-500/10 text-indigo-400 py-1 px-3 rounded-full text-xs font-semibold border border-indigo-500/20">{products.length} Items</span>
                </div>
                <ul className="divide-y divide-slate-800/80">
                    {products.length === 0 ? (
                        <li className="px-6 py-12 text-center text-slate-500 flex flex-col items-center">
                            <Tag className="w-12 h-12 text-slate-700 mb-3" />
                            <p>Your inventory is empty. Add a product above to get started.</p>
                        </li>
                    ) : (
                        products.map((product) => (
                            <li key={product.id} className="hover:bg-slate-800/50 transition-colors duration-200">
                                <div className="px-6 py-5 flex items-center sm:px-8">
                                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div className="truncate pr-4">
                                            <div className="flex text-lg">
                                                <p className="font-semibold text-white truncate">{product.name}</p>
                                            </div>
                                            <div className="mt-2 flex">
                                                <div className="flex items-center text-sm text-slate-400">
                                                    <p className="truncate block max-w-xl">{product.description || 'No description provided'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5 flex flex-col items-end">
                                            <p className="font-bold text-white text-xl mb-2">
                                                ${product.price.toFixed(2)}
                                            </p>
                                            <div className="flex items-center space-x-2">
                                                <button onClick={() => handleEdit(product)} className="text-slate-400 hover:text-indigo-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 py-1.5 px-3 rounded-lg transition-all shadow-sm text-sm font-medium flex items-center">
                                                    <Pencil className="h-3.5 w-3.5 mr-1.5" /> Edit
                                                </button>
                                                <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 border border-red-500/20 py-1.5 px-3 rounded-lg transition-all shadow-sm text-sm font-medium flex items-center">
                                                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SellerDashboard;
