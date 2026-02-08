import React from 'react';
import { Drawer, Button, Tooltip } from 'antd';
import {
  IoRefreshOutline,
  IoExpandOutline,
  IoCloseOutline
} from 'react-icons/io5';
import { ThemePresetTiles } from './ThemePresetTiles';
import { FontFamilySelector } from './FontFamilySelector';
import { FontSizeSlider } from './FontSizeSlider';
import { ModeToggles } from './ModeToggles';
import { themeGradients } from '../themeConfig';
import { useThemeStore } from '../../store/useThemeStore';

interface ThemeDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const ThemeDrawer: React.FC<ThemeDrawerProps> = ({ open, onClose }) => {
  const { resetTheme, colorPreset } = useThemeStore();
  const gradient = themeGradients[colorPreset];

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between w-full ">
          <span className="text-xl font-bold bg-linear-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
            Settings
          </span>
          <div className="flex items-center gap-1">
            <Tooltip title="Fullscreen">
              <Button
                type="text"
                shape="circle"
                icon={<IoExpandOutline className="text-lg" />}
                onClick={handleFullscreen}
                className="text-gray-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20"
              />
            </Tooltip>
            <Tooltip title="Reset">
              <Button
                type="text"
                shape="circle"
                icon={<IoRefreshOutline className="text-lg" />}
                onClick={resetTheme}
                className="text-gray-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20"
              />
            </Tooltip>
            <Button
              type="text"
              shape="circle"
              icon={<IoCloseOutline className="text-xl" />}
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 ml-1"
            />
          </div>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={340}
      closeIcon={null}
      rootClassName="glass-drawer"
      // Remove default masking to handle glass effect via CSS
      styles={{
        header: {
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          padding: '20px 24px',
        },
        // body: {
        //   padding: '24px',
        //   background: 'var(--glass-bg)',
        // },
        mask: {
          backdropFilter: 'blur(4px)',
        }
      }}
      className={`bg-transparent! bg-linear-to-br! ${gradient.from}/90 ${gradient.via}/90 ${gradient.to}/90 backdrop-blur-xl`}
    >
      <div className="space-y-8 pb-8">
        <section>
          <div className="flex items-center mb-4">
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Mode
            </span>
          </div>
          <ModeToggles />
        </section>

        <section>
          <div className="flex items-center mb-4">
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Presets
            </span>
          </div>
          <ThemePresetTiles />
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Typography
            </span>
          </div>
          <FontFamilySelector />
          <div className="mt-6">
            <FontSizeSlider />
          </div>
        </section>
      </div>
    </Drawer>
  );
};

export default ThemeDrawer;
