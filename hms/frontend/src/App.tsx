import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, HeartPulse, PackagePlus, Settings, Bell } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<any>(null);
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    // Fetch dashboard stats
    axios.get(`${API_URL}/stats`).then(res => setStats(res.data)).catch(console.error);
    // Fetch inventory if on stock tab or overview
    axios.get(`${API_URL}/inventory`).then(res => setInventory(res.data)).catch(console.error);
  }, []);

  const renderStatsGrid = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="stats-grid"
    >
      <div className="stat-card glass-panel">
        <HeartPulse size={24} color="var(--accent-cyan)" />
        <div>
           <div className="stat-value">{stats?.activeER || '--'}</div>
           <div className="stat-label">Active ER Cases</div>
        </div>
      </div>
      <div className="stat-card glass-panel">
        <Users size={24} color="var(--accent-blue)" />
        <div>
           <div className="stat-value">{stats?.doctorsOnDuty || '--'}</div>
           <div className="stat-label">Doctors on Duty</div>
        </div>
      </div>
      <div className="stat-card glass-panel">
        <LayoutDashboard size={24} color="var(--success)" />
        <div>
           <div className="stat-value">{stats?.bedOccupancy || '--'}%</div>
           <div className="stat-label">Bed Occupancy</div>
        </div>
      </div>
      <div className="stat-card glass-panel">
        <PackagePlus size={24} color="var(--warning)" />
        <div>
           <div className="stat-value">${stats?.revenueToday?.toLocaleString() || '--'}</div>
           <div className="stat-label">Revenue Today</div>
        </div>
      </div>
    </motion.div>
  );

  const renderStockStatus = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel" 
        style={{ padding: '24px' }}
      >
        <h2 style={{ marginBottom: '16px' }}>Medical Stock Status</h2>
        <table className="table-container">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => {
              const safeStock = item.quantity > item.threshold * 2;
              const critical = item.quantity <= item.threshold;
              return (
                <motion.tr key={item.id} whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span className={`badge ${critical ? 'danger' : (safeStock ? 'safe' : 'warning')}`}>
                      {critical ? 'CRITICAL' : (safeStock ? 'OPTIMAL' : 'LOW')}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    );
  };

  return (
    <div className="dashboard-layout bg-gradient">
      {/* Sidebar Navigation */}
      <nav className="sidebar glass-panel" style={{ borderTop: 'none', borderBottom: 'none', borderLeft: 'none', borderRadius: 0 }}>
        <div className="logo">
          <HeartPulse color="var(--accent-cyan)" />
          <span>HMS Premium</span>
        </div>
        <ul className="nav-links">
          <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={20} /> Overview
          </li>
          <li className={activeTab === 'patients' ? 'active' : ''} onClick={() => setActiveTab('patients')}>
            <Users size={20} /> Patient Flow
          </li>
          <li className={activeTab === 'stock' ? 'active' : ''} onClick={() => setActiveTab('stock')}>
            <PackagePlus size={20} /> Stock & Pharmacy
          </li>
          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Settings
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard</h1>
          <div className="user-profile">
            <Bell size={24} color="var(--text-secondary)" cursor="pointer" />
            <div className="avatar"></div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Dr. Admin</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Chief of Staff</div>
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <>
            {renderStatsGrid()}
            {renderStockStatus()}
          </>
        )}
        {activeTab === 'stock' && renderStockStatus()}
        {activeTab === 'patients' && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
             <h2>Patient Flow (Kanban View)</h2>
             <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Coming soon in Phase 3 of the implementation plan.</p>
           </motion.div>
        )}
      </main>
    </div>
  );
}
