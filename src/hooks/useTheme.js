import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing theme (light/dark mode)
 * @returns {[string, Function]} - [theme, setTheme]
 */
export function useTheme() {
    const [theme, setTheme] = useLocalStorage('admin-dashboard-theme', 'light');

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return [theme, setTheme, toggleTheme];
}
