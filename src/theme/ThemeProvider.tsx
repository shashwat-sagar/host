import { useEffect, useMemo } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useThemeStore } from '../store/useThemeStore';
import { colorPalettes, fontFamilies } from './themeConfig';

interface ThemeProviderProps {
    children: React.ReactNode;
}

/**
 * ThemeProvider - Syncs Zustand theme state to CSS Custom Properties and Ant Design ConfigProvider
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

    // Ant Design theme configuration
    const antdThemeConfig = useMemo(() => {
        const palette = colorPalettes[colorPreset];

        return {
            algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
            token: {
                colorPrimary: palette['600'], // Main primary color
                colorInfo: palette['500'],
                colorSuccess: '#22c55e',
                colorWarning: '#eab308',
                colorError: '#ef4444',
                borderRadius: 8,
                fontSize: fontSize,
                fontFamily: fontFamilies[fontFamily],
                // Additional token customizations
                colorBgContainer: themeMode === 'dark' ? '#1f2937' : '#ffffff',
                colorBorder: themeMode === 'dark' ? '#374151' : '#e5e7eb',
                colorText: themeMode === 'dark' ? '#f9fafb' : '#111827',
                colorTextSecondary: themeMode === 'dark' ? '#9ca3af' : '#6b7280',
                // Custom token for table header background
                colorPrimaryBg: themeMode === 'dark' ? palette['900'] : palette['50'],
            },
            components: {
                Button: {
                    colorPrimary: palette['600'],
                    algorithm: true,
                },
                Table: {
                    colorBgContainer: themeMode === 'dark' ? '#1f2937' : '#ffffff',
                    colorPrimary: palette['600'],
                    headerBg: palette['50'],
                    headerColor: themeMode === 'dark' ? '#f9fafb' : palette['900'],
                    rowHoverBg: themeMode === 'dark' ? '#374151' : palette['50'],
                },
                Input: {
                    colorPrimary: palette['600'],
                    colorBorder: themeMode === 'dark' ? '#374151' : '#e5e7eb',
                },
                Select: {
                    colorPrimary: palette['600'],
                },
                Card: {
                    colorBgContainer: themeMode === 'dark' ? '#1f2937' : '#ffffff',
                },
            },
        };
    }, [colorPreset, themeMode, fontSize, fontFamily]);

    return (
        <ConfigProvider theme={antdThemeConfig}>
            {children}
        </ConfigProvider>
    );
};

export default ThemeProvider;
