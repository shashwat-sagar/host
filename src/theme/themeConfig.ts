// Theme Configuration - Color palettes and settings

export type ColorPreset = 'red' | 'blue' | 'green' | 'yellow';
export type FontFamily = 'Public Sans' | 'Inter' | 'DM Sans' | 'Nunito Sans';
export type ThemeMode = 'light' | 'dark';
export type ContrastMode = 'default' | 'high';

export interface ThemeConfig {
    colorPreset: ColorPreset;
    fontFamily: FontFamily;
    fontSize: number;
    themeMode: ThemeMode;
    contrastMode: ContrastMode;
}

// Color palettes with all variants (following Tailwind color scale)
export const colorPalettes: Record<ColorPreset, Record<string, string>> = {
    red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
    },
    blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
    },
    green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
    },
    yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
    },
};

// Font family configurations with CSS font-family values
export const fontFamilies: Record<FontFamily, string> = {
    'Public Sans': '"Public Sans", sans-serif',
    'Inter': '"Inter", sans-serif',
    'DM Sans': '"DM Sans", sans-serif',
    'Nunito Sans': '"Nunito Sans", sans-serif',
};

// Google Fonts URL for loading fonts
export const googleFontsUrl =
    'https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&family=Nunito+Sans:wght@400;600;700&display=swap';

// Default theme configuration
export const defaultThemeConfig: ThemeConfig = {
    colorPreset: 'red',
    fontFamily: 'Public Sans',
    fontSize: 16,
    themeMode: 'light',
    contrastMode: 'default',
};

// Font size constraints
export const fontSizeConfig = {
    min: 12,
    max: 20,
    default: 16,
};

// Preset display configuration (for UI tiles)
export const presetDisplayConfig: Record<ColorPreset, { bg: string; accent: string; label: string }> = {
    red: { bg: '#fee2e2', accent: '#ef4444', label: 'Red' },
    blue: { bg: '#dbeafe', accent: '#3b82f6', label: 'Blue' },
    green: { bg: '#dcfce7', accent: '#22c55e', label: 'Green' },
    yellow: { bg: '#fef9c3', accent: '#eab308', label: 'Yellow' },
};
