import React from 'react';
import { Switch } from 'antd';
import { IoMoonOutline, IoSunnyOutline, IoContrastOutline } from 'react-icons/io5';
import { useThemeStore } from '../../store/useThemeStore';

/**
 * ModeToggles - Grid layout for theme and contrast toggles
 * Styled with glassmorphic cards
 */
export const ModeToggles: React.FC = () => {
    const { themeMode, contrastMode, toggleThemeMode, toggleContrastMode } = useThemeStore();

    return (
        <div className="mb-8">
            {/* Grid Layout for Mode Cards */}
            <div className="grid grid-cols-2 gap-4">

                {/* Dark Mode Card */}
                <div className="glass-card p-4 rounded-2xl flex flex-col justify-between h-28 transform transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-xl ${themeMode === 'dark' ? 'bg-primary-500/10 text-primary-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                            {themeMode === 'dark' ? <IoMoonOutline size={20} /> : <IoSunnyOutline size={20} />}
                        </div>
                        <Switch
                            size="small"
                            checked={themeMode === 'dark'}
                            onChange={toggleThemeMode}
                            className="shadow-sm"
                        />
                    </div>
                    <span className="font-medium text-sm text-theme-text mt-2">
                        {themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                </div>

                {/* Contrast Card */}
                <div className="glass-card p-4 rounded-2xl flex flex-col justify-between h-28 transform transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-xl ${contrastMode === 'high' ? 'bg-primary-500/10 text-primary-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                            <IoContrastOutline size={20} />
                        </div>
                        <Switch
                            size="small"
                            checked={contrastMode === 'high'}
                            onChange={toggleContrastMode}
                            className="shadow-sm"
                        />
                    </div>
                    <span className="font-medium text-sm text-theme-text mt-2">
                        Contrast
                    </span>
                </div>

            </div>
        </div>
    );
};

export default ModeToggles;
