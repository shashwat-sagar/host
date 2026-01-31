import React from "react";
import { useThemeStore } from "../../store/useThemeStore";
import { FontFamily, fontFamilies } from "../themeConfig";

/**
 * FontFamilySelector - Glassmorphic grid of font family options
 */
export const FontFamilySelector: React.FC = () => {
  const { fontFamily, setFontFamily, themeMode } = useThemeStore();
  const fonts = Object.keys(fontFamilies) as FontFamily[];

  return (
    <div className="grid grid-cols-2 gap-3">
      {fonts.map((font) => {
        const isSelected = fontFamily === font;

        return (
          <button
            key={font}
            onClick={() => setFontFamily(font)}
            className={`
              relative flex flex-col items-center justify-center
              py-4 px-2 rounded-2xl border transition-all duration-300
              ${
                isSelected
                  ? "bg-white/90 dark:bg-gray-800/90 border-primary-500 shadow-lg shadow-primary-500/10 scale-[1.02]"
                  : themeMode === 'dark' ? "bg-gray-700/50 border-gray-500 hover:border-primary-500 hover:bg-gray-700/70 hover:shadow-md hover:shadow-primary-500/10"
                  : "shadow-xs bg-white/50 border-gray-200 hover:border-primary-500 hover:bg-white/70 hover:shadow-md hover:shadow-primary-500/10"
              }
            `}
          >
            {/* Font Preview */}
            <span
              className={`text-2xl mb-2 transition-colors ${isSelected ? "text-primary-500" : themeMode === 'dark' ? "text-gray-200" : "text-gray-800"}`}
              style={{ fontFamily: fontFamilies[font] }}
            >
              Aa
            </span>

            {/* Font Name */}
            <span
              className={`text-xs font-medium ${isSelected ? "text-primary-600" : themeMode === 'dark' ? "text-gray-100" : "text-gray-700"}`}
            >
              {font}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FontFamilySelector;
