import React from 'react';
import { useApp } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';
import './Settings.css';

const Settings = () => {
    const { userRole, setUserRole, resetData, clearAllData, users, products } = useApp();

    const handleResetData = () => {
        if (window.confirm('Are you sure you want to reset all data to default values?')) {
            resetData();
            alert('Data has been reset to default values.');
        }
    };

    const handleClearData = () => {
        if (window.confirm('⚠️ WARNING: This will delete ALL users and products. This action cannot be undone. Are you sure?')) {
            clearAllData();
            alert('All data has been cleared.');
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Settings</h1>
                    <p className="page-description">Manage your dashboard preferences and data</p>
                </div>
            </div>

            <div className="grid grid-2">
                {/* User Role Settings */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">User Role</h3>
                    </div>
                    <div className="card-body">
                        <p className="text-sm text-muted mb-md">
                            Switch between Admin and Viewer roles to test different permission levels.
                        </p>
                        <div className="role-selector">
                            <button
                                className={`role-option ${userRole === 'admin' ? 'active' : ''}`}
                                onClick={() => setUserRole('admin')}
                            >
                                <span className="role-icon">👑</span>
                                <div>
                                    <div className="role-name">Admin</div>
                                    <div className="role-description">Full access to all features</div>
                                </div>
                            </button>
                            <button
                                className={`role-option ${userRole === 'viewer' ? 'active' : ''}`}
                                onClick={() => setUserRole('viewer')}
                            >
                                <span className="role-icon">👁️</span>
                                <div>
                                    <div className="role-name">Viewer</div>
                                    <div className="role-description">Read-only access</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Theme Settings */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Appearance</h3>
                    </div>
                    <div className="card-body">
                        <p className="text-sm text-muted mb-md">
                            Choose your preferred theme. Your selection will be saved automatically.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 'var(--spacing-md)' }}>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                {/* Data Management */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Data Management</h3>
                    </div>
                    <div className="card-body">
                        <div className="data-stats mb-lg">
                            <div className="stat-item">
                                <span className="stat-label">Total Users:</span>
                                <span className="stat-value">{users.length}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Total Products:</span>
                                <span className="stat-value">{products.length}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            <button className="btn btn-secondary" onClick={handleResetData} style={{ width: '100%' }}>
                                🔄 Reset to Default Data
                            </button>
                            <button className="btn btn-danger" onClick={handleClearData} style={{ width: '100%' }}>
                                🗑️ Clear All Data
                            </button>
                        </div>
                    </div>
                </div>

                {/* About */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">About</h3>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            <div>
                                <div className="text-sm text-muted">Version</div>
                                <div style={{ fontWeight: 600 }}>1.0.0</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted">Built with</div>
                                <div style={{ fontWeight: 600 }}>React + Vite</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted">Data Storage</div>
                                <div style={{ fontWeight: 600 }}>Browser LocalStorage</div>
                            </div>
                            <div className="mt-md">
                                <p className="text-sm text-muted" style={{ lineHeight: 1.6 }}>
                                    This is a demo admin dashboard with mock data. All changes are persisted locally in your browser.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
