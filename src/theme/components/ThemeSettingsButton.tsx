import React from 'react';
import { Tooltip } from 'antd';
import { IoSettingsOutline } from 'react-icons/io5';

interface ThemeSettingsButtonProps {
    onClick: () => void;
}

/**
 * ThemeSettingsButton - Floating action button with spinning effect
 */
export const ThemeSettingsButton: React.FC<ThemeSettingsButtonProps> = ({ onClick }) => {
    return (
        <div className="fixed bottom-8 right-8 z-50">
            <Tooltip title="Settings" placement="left">
                <button
                    onClick={onClick}
                    className="
            group relative flex items-center justify-center w-14 h-14
            bg-white/80 dark:bg-gray-800/80 backdrop-blur-md
            rounded-full shadow-2xl border border-white/20
            transition-all duration-300 ease-out
            hover:scale-110 hover:shadow-primary-500/20
            active:scale-95
          "
                >
                    {/* Animated Glow */}
                    <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <IoSettingsOutline
                        className="text-2xl text-gray-700 dark:text-gray-200 group-hover:text-primary-500 transition-colors duration-300 animate-spin-slow"
                        style={{ animationDuration: '4s' }}
                    />
                </button>
            </Tooltip>
        </div>
    );
};

export default ThemeSettingsButton;
