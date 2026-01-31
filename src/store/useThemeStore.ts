import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    ColorPreset,
    FontFamily,
    ThemeMode,
    ContrastMode,
    ThemeConfig,
    defaultThemeConfig
} from '../theme/themeConfig';

interface ThemeStore extends ThemeConfig {
    // Actions
    setColorPreset: (preset: ColorPreset) => void;
    setFontFamily: (font: FontFamily) => void;
    setFontSize: (size: number) => void;
    setThemeMode: (mode: ThemeMode) => void;
    toggleThemeMode: () => void;
    setContrastMode: (mode: ContrastMode) => void;
    toggleContrastMode: () => void;
    resetTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            // Initial state from defaults
            ...defaultThemeConfig,

            // Actions
            setColorPreset: (preset) => set({ colorPreset: preset }),

            setFontFamily: (font) => set({ fontFamily: font }),

            setFontSize: (size) => set({ fontSize: size }),

            setThemeMode: (mode) => set({ themeMode: mode }),

            toggleThemeMode: () => set({
                themeMode: get().themeMode === 'light' ? 'dark' : 'light'
            }),

            setContrastMode: (mode) => set({ contrastMode: mode }),

            toggleContrastMode: () => set({
                contrastMode: get().contrastMode === 'default' ? 'high' : 'default'
            }),

            resetTheme: () => set(defaultThemeConfig),
        }),
        {
            name: 'theme-storage', // localStorage key
        }
    )
);

export default useThemeStore;
