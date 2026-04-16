import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { Users, Trash2, Shield, User as UserIcon, Store, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
    const { token } = useAuthStore();
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            const [usersRes, productsRes] = await Promise.all([
                axios.get('/auth/users', { headers: { Authorization: `Bearer ${token}` } }),
                axios.get('/products')
            ]);
            setUsers(usersRes.data);
            setProducts(productsRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!confirm('Delete this product as Admin?')) return;
        try {
            await axios.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Failed to delete product');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div></div>
    );

    return (
        <div className="space-y-10 animate-slide-up">
            <div className="glass-panel px-6 py-6 sm:px-8 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center tracking-tight">
                        <Shield className="mr-4 h-8 w-8 text-indigo-400" /> Administrative Dashboard
                    </h2>
                    <p className="mt-2 text-slate-400 max-w-2xl">Global overview of all platform activity, users, and inventory.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-colors relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[40px] group-hover:bg-indigo-500/10 transition-colors pointer-events-none"></div>
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                                <Users className="h-6 w-6 text-indigo-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-slate-400 truncate tracking-wide">Total Users</dt>
                                    <dd className="text-3xl font-bold text-white mt-1">{users.length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl overflow-hidden hover:border-purple-500/30 transition-colors relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] group-hover:bg-purple-500/10 transition-colors pointer-events-none"></div>
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                <Store className="h-6 w-6 text-purple-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-slate-400 truncate tracking-wide">Registered Sellers</dt>
                                    <dd className="text-3xl font-bold text-white mt-1">{users.filter(u => u.role === 'Seller').length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-colors relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <BarChart3 className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-slate-400 truncate tracking-wide">Global Products</dt>
                                    <dd className="text-3xl font-bold text-white mt-1">{products.length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 shadow-xl overflow-hidden sm:rounded-2xl">
                <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                        <Users className="w-5 h-5 mr-3 text-slate-400" /> User Directory
                    </h3>
                </div>
                <ul className="divide-y divide-slate-800/80">
                    {users.map((user) => (
                        <li key={user.id} className="py-4 px-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors duration-200">
                            <div className="flex items-center">
                                <div className="bg-slate-800 rounded-full p-2.5 mr-4 border border-slate-700 shadow-inner">
                                    <UserIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-base font-medium text-white tracking-wide">{user.username}</p>
                                    <p className="text-xs text-slate-500 mt-0.5 font-mono">ID: {user.id}</p>
                                </div>
                            </div>
                            <div>
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border shadow-sm ${user.role === 'Admin' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                        user.role === 'Seller' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                            'bg-slate-800 text-slate-300 border-slate-700'}`}>
                                    {user.role}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 shadow-xl overflow-hidden sm:rounded-2xl mb-8">
                <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                        <Store className="w-5 h-5 mr-3 text-slate-400" /> Global Inventory Override
                    </h3>
                </div>
                <ul className="divide-y divide-slate-800/80">
                    {products.length === 0 ? (
                        <li className="px-6 py-12 text-center text-slate-500">No products across the platform yet.</li>
                    ) : (
                        products.map((product) => (
                            <li key={product.id} className="py-5 px-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors duration-200">
                                <div className="flex-1 min-w-0 pr-4">
                                    <p className="text-base font-semibold text-white truncate flex items-center">
                                        {product.name}
                                        <span className="mx-3 text-slate-600 font-normal">|</span>
                                        <span className="text-emerald-400">${product.price.toFixed(2)}</span>
                                    </p>
                                    <div className="text-sm text-slate-400 mt-1 flex items-center">
                                        Sold by <span className="text-indigo-400 mx-1">{product.seller_name}</span> (ID: {product.seller_id})
                                    </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="flex items-center text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 border border-red-500/20 py-2 px-3.5 rounded-xl transition-all shadow-sm text-sm font-medium"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete Product
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

        </div>
    );
};

export default AdminDashboard;
