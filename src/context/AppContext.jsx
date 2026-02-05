import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';
import { generateMockUsers, generateMockProducts, calculateKPIs } from '../utils/mockData';

// Create the context
const AppContext = createContext();

// Custom hook to use the AppContext
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

// AppProvider component
export const AppProvider = ({ children }) => {
    // Theme management
    const [theme, setTheme, toggleTheme] = useTheme();

    // User role (admin or viewer)
    const [userRole, setUserRole] = useLocalStorage('admin-dashboard-role', 'admin');

    // Current active page
    const [currentPage, setCurrentPage] = useState('dashboard');

    // Users data
    const [users, setUsers] = useLocalStorage('admin-dashboard-users', generateMockUsers());

    // Products data
    const [products, setProducts] = useLocalStorage('admin-dashboard-products', generateMockProducts());

    // Sidebar collapsed state
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // User CRUD operations
    const addUser = (user) => {
        const newUser = {
            ...user,
            id: Math.max(...users.map(u => u.id), 0) + 1,
            registrationDate: new Date().toISOString().split('T')[0]
        };
        setUsers([...users, newUser]);
    };

    const updateUser = (id, updatedData) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, ...updatedData } : user
        ));
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // Product CRUD operations
    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Math.max(...products.map(p => p.id), 0) + 1
        };
        setProducts([...products, newProduct]);
    };

    const updateProduct = (id, updatedData) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, ...updatedData } : product
        ));
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    // Reset to default data
    const resetData = () => {
        setUsers(generateMockUsers());
        setProducts(generateMockProducts());
    };

    // Clear all data
    const clearAllData = () => {
        setUsers([]);
        setProducts([]);
    };

    // Calculate KPIs
    const kpis = calculateKPIs(users, products);

    const value = {
        // Theme
        theme,
        setTheme,
        toggleTheme,

        // User role
        userRole,
        setUserRole,
        isAdmin: userRole === 'admin',

        // Navigation
        currentPage,
        setCurrentPage,

        // Sidebar
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar: () => setSidebarCollapsed(!sidebarCollapsed),

        // Users
        users,
        addUser,
        updateUser,
        deleteUser,

        // Products
        products,
        addProduct,
        updateProduct,
        deleteProduct,

        // Utilities
        resetData,
        clearAllData,
        kpis
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
