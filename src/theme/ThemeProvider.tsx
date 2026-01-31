import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { colorPalettes, fontFamilies } from './themeConfig';

interface ThemeProviderProps {
    children: React.ReactNode;
}

/**
 * ThemeProvider - Syncs Zustand theme state to CSS Custom Properties
 * Handles color presets, dark mode, high contrast, fonts, and sizes
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const { colorPreset, fontFamily, fontSize, themeMode, contrastMode } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;
        const palette = colorPalettes[colorPreset];

        // Update color CSS variables
        Object.entries(palette).forEach(([shade, color]) => {
            root.style.setProperty(`--theme-primary-${shade}`, color);
        });

        // Update font family
        root.style.setProperty('--theme-font-family', fontFamilies[fontFamily]);

        // Update font size
        root.style.setProperty('--theme-font-size', `${fontSize}px`);

        // Apply dark mode
        if (themeMode === 'dark') {
            root.classList.add('dark');
            root.style.setProperty('--theme-bg', '#111827');
            root.style.setProperty('--theme-bg-secondary', '#1f2937');
            root.style.setProperty('--theme-text', '#f9fafb');
            root.style.setProperty('--theme-text-secondary', '#9ca3af');
            root.style.setProperty('--theme-border', '#374151');
        } else {
            root.classList.remove('dark');
            root.style.setProperty('--theme-bg', '#ffffff');
            root.style.setProperty('--theme-bg-secondary', '#f3f4f6');
            root.style.setProperty('--theme-text', '#111827');
            root.style.setProperty('--theme-text-secondary', '#6b7280');
            root.style.setProperty('--theme-border', '#e5e7eb');
        }

        // Apply high contrast mode
        if (contrastMode === 'high') {
            root.classList.add('high-contrast');
            root.style.setProperty('--theme-contrast-multiplier', '1.2');
        } else {
            root.classList.remove('high-contrast');
            root.style.setProperty('--theme-contrast-multiplier', '1');
        }
    }, [colorPreset, fontFamily, fontSize, themeMode, contrastMode]);

    return <>{children}</>;
};

export default ThemeProvider;
