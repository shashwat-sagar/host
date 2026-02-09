// Theme Configuration - Color palettes and settings

export type ColorPreset = 'red' | 'blue' | 'green' | 'yellow' | 'indigo';
export type FontFamily = 'Public Sans' | 'Inter' | 'DM Sans' | 'Nunito Sans' | 'Bitter' | 'Poppins' | 'SN Pro' | 'SUSE Mono' | 'Nunito';
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
    indigo: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
    },
};

// Font family configurations with CSS font-family values
export const fontFamilies: Record<FontFamily, string> = {
    // 'Public Sans': '"Public Sans", sans-serif',
    // 'Inter': '"Inter", sans-serif',
    // 'DM Sans': '"DM Sans", sans-serif',
    // 'Nunito Sans': '"Nunito Sans", sans-serif',
    'Bitter': '"Bitter", serif',
    'Poppins': '"Poppins", sans-serif',
    // 'SN Pro': '"SN Pro", sans-serif', // Not available on Google Fonts
    // 'SN Pro': '"SN Pro", sans-serif', // Fallback to Inter
    'SUSE Mono': '"SUSE", monospace', // "SUSE" is the family name on Google Fonts
    'Nunito': '"Nunito", sans-serif',
};


// Default theme configuration
export const defaultThemeConfig: ThemeConfig = {
    colorPreset: 'blue',
    fontFamily: 'Poppins',
    fontSize: 14,
    themeMode: 'light',
    contrastMode: 'default',
};

// Font size constraints
export const fontSizeConfig = {
    min: 12,
    max: 20,
    default: 14,
};

// Gradient configuration for each theme preset
export const themeGradients: Record<ColorPreset, { from: string; via: string; to: string }> = {
    red: { from: 'from-red-50', via: 'via-orange-50', to: 'to-amber-50' },
    blue: { from: 'from-blue-50', via: 'via-cyan-50', to: 'to-teal-50' },
    green: { from: 'from-green-50', via: 'via-emerald-50', to: 'to-teal-50' },
    yellow: { from: 'from-yellow-50', via: 'via-amber-50', to: 'to-orange-50' },
    indigo: { from: 'from-indigo-50', via: 'via-purple-50', to: 'to-pink-50' },
};

// Accent/Strong gradient configuration for active states (Sidebar items, buttons, etc.)
export const themeAccentGradients: Record<ColorPreset, { from: string; to: string; fromColor: string; toColor: string }> = {
    red: { from: 'from-red-500', to: 'to-orange-600', fromColor: '#ef4444', toColor: '#ea580c' },
    blue: { from: 'from-blue-500', to: 'to-cyan-600', fromColor: '#3b82f6', toColor: '#0891b2' },
    green: { from: 'from-green-500', to: 'to-emerald-600', fromColor: '#22c55e', toColor: '#059669' },
    yellow: { from: 'from-yellow-400', to: 'to-orange-500', fromColor: '#facc15', toColor: '#f97316' },
    indigo: { from: 'from-indigo-500', to: 'to-purple-600', fromColor: '#6366f1', toColor: '#9333ea' },
};

// Chart color configurations
export const themeChartColors: Record<ColorPreset, {
    revenue: { stops: [number, string][]; fillStops: [number, string][] };
    pie: string[];
    activity: string[];
}> = {
    red: {
        revenue: {
            stops: [[0, '#ef4444'], [0.5, '#f97316'], [1, '#fbbf24']], // Red -> Orange -> Amber
            fillStops: [[0, 'rgba(239, 68, 68, 0.4)'], [1, 'rgba(251, 191, 36, 0.0)']]
        },
        pie: ['#ef4444', '#f97316', '#fbbf24', '#fca5a5'],
        activity: ['#fee2e2', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b']
    },
    blue: {
        revenue: {
            stops: [[0, '#3b82f6'], [0.5, '#06b6d4'], [1, '#14b8a6']], // Blue -> Cyan -> Teal
            fillStops: [[0, 'rgba(59, 130, 246, 0.4)'], [1, 'rgba(20, 184, 166, 0.0)']]
        },
        pie: ['#3b82f6', '#06b6d4', '#14b8a6', '#93c5fd'],
        activity: ['#eff6ff', '#bfdbfe', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af']
    },
    green: {
        revenue: {
            stops: [[0, '#22c55e'], [0.5, '#10b981'], [1, '#059669']], // Green -> Emerald -> Dark Green
            fillStops: [[0, 'rgba(34, 197, 94, 0.4)'], [1, 'rgba(5, 150, 105, 0.0)']]
        },
        pie: ['#22c55e', '#10b981', '#34d399', '#86efac'],
        activity: ['#f0fdf4', '#bbf7d0', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#14532d']
    },
    yellow: {
        revenue: {
            stops: [[0, '#eab308'], [0.5, '#f59e0b'], [1, '#ea580c']], // Yellow -> Amber -> Orange
            fillStops: [[0, 'rgba(234, 179, 8, 0.4)'], [1, 'rgba(234, 88, 12, 0.0)']]
        },
        pie: ['#eab308', '#f59e0b', '#f97316', '#fde047'],
        activity: ['#fefce8', '#fef08a', '#facc15', '#eab308', '#ca8a04', '#a16207', '#713f12']
    },
    indigo: {
        revenue: {
            stops: [[0, '#8b5cf6'], [0.5, '#ec4899'], [1, '#f43f5e']], // Violet -> Pink -> Rose
            fillStops: [[0, 'rgba(139, 92, 246, 0.4)'], [1, 'rgba(244, 63, 94, 0.0)']]
        },
        pie: ['#6366f1', '#f43f5e', '#10b981', '#f59e0b'],
        activity: ['#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6']
    }
};

// Preset display configuration (for UI tiles)
export const presetDisplayConfig: Record<ColorPreset, { bg: string; accent: string; label: string }> = {
    red: { bg: '#fee2e2', accent: '#ef4444', label: 'Red' },
    blue: { bg: '#dbeafe', accent: '#3b82f6', label: 'Blue' },
    green: { bg: '#dcfce7', accent: '#22c55e', label: 'Green' },
    yellow: { bg: '#fef9c3', accent: '#eab308', label: 'Yellow' },
    indigo: { bg: '#e0e7ff', accent: '#6366f1', label: 'Indigo' },
};
