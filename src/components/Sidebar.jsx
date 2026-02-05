import React from 'react';
import { useApp } from '../context/AppContext';
import './Sidebar.css';

const Sidebar = () => {
    const { currentPage, setCurrentPage, sidebarCollapsed, toggleSidebar } = useApp();

    const menuItems = [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'users', icon: '👥', label: 'Users' },
        { id: 'products', icon: '📦', label: 'Products' },
        { id: 'analytics', icon: '📈', label: 'Analytics' },
        { id: 'settings', icon: '⚙️', label: 'Settings' }
    ];

    return (
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <span className="logo-icon">🎯</span>
                    {!sidebarCollapsed && <span className="logo-text">Admin Pro</span>}
                </div>
                <button
                    className="sidebar-toggle"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    {sidebarCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                        onClick={() => setCurrentPage(item.id)}
                        title={item.label}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
                    </button>
                ))}
            </nav>

            {!sidebarCollapsed && (
                <div className="sidebar-footer">
                    <p className="footer-text">Admin Dashboard v1.0</p>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
