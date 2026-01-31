import React from "react";
import { useThemeStore } from "../../store/useThemeStore";
import { ColorPreset, presetDisplayConfig } from "../themeConfig";
import { IoCheckmark } from "react-icons/io5";

/**
 * ThemePresetTiles - Glassmorphic grid of color preset selection tiles
 */
export const ThemePresetTiles: React.FC = () => {
  const { colorPreset, setColorPreset, themeMode } = useThemeStore();
  const presets = Object.keys(presetDisplayConfig) as ColorPreset[];

  return (
    <div className="grid grid-cols-2 gap-3">
      {presets.map((preset) => {
        const { accent, label } = presetDisplayConfig[preset];
        const isSelected = colorPreset === preset;

        return (
          <button
            key={preset}
            onClick={() => setColorPreset(preset)}
            className={`
              group relative flex items-center gap-3 p-3 rounded-xl
              transition-all duration-300 ease-out border
              ${
                isSelected
                  ? "bg-white/80 dark:bg-gray-800/80 border-primary-500 shadow-lg shadow-primary-500/10"
                  : themeMode === 'dark'
                  ? "bg-gray-900/50 border-gray-600 hover:border-primary-500 hover:bg-gray-800/70"
                  : "bg-white/50 border-gray-200 hover:border-primary-500 hover:bg-white/70"
              }
            `}
          >
            {/* Color Circle */}
            <div
              className="w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: accent }}
            >
              {isSelected && <IoCheckmark className="text-white text-lg" />}
            </div>

            <span
              className={`font-medium text-sm ${isSelected ? "text-primary-700 dark:text-primary-300" : themeMode === 'dark' ? "text-white" : "text-gray-700"}`}
            >
              {label}
            </span>

            {/* Selection Glow */}
            {isSelected && (
              <div className="absolute inset-0 rounded-xl bg-primary-500/5 -z-10" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ThemePresetTiles;
