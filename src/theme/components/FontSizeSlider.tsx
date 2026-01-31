import React from 'react';
import { Slider } from 'antd';
import { useThemeStore } from '../../store/useThemeStore';
import { fontSizeConfig } from '../themeConfig';

/**
 * FontSizeSlider - Glassmorphic slider container
 */
export const FontSizeSlider: React.FC = () => {
    const { fontSize, setFontSize } = useThemeStore();

    return (
        <div className="glass-card p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Size</span>
                <span className="text-sm font-semibold text-primary-500 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-md">
                    {fontSize}px
                </span>
            </div>

            <div className="px-1">
                <Slider
                    min={fontSizeConfig.min}
                    max={fontSizeConfig.max}
                    value={fontSize}
                    onChange={setFontSize}

                    tooltip={{  placement: 'bottom', formatter: (value) => `${value}px` }}
                    styles={{
                        track: {
                            background: 'linear-gradient(to right, var(--theme-primary-300), var(--theme-primary-700))',
                            height: 10,
                            borderRadius: 10,
                        },
                        rail: {
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            height: 10,
                            borderRadius: 10,
                            
                        },
                        handle: {
                            position: 'relative',
                            top: 'auto',
                            borderColor: 'var(--theme-primary-500)',
                            backgroundColor: '#ffffffff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            width: 20,
                            height: 20,
                            borderRadius:8,
                            marginTop: -5,
                            
                        },
                        
                    }}
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-medium px-1 mt-1">
                    <span>A {fontSizeConfig.min}</span>
                    <span>A {fontSizeConfig.max}</span>
                </div>
            </div>
            <style>
                {
                    `
                    .ant-slider-handle::after {
                        top: 50% !important;
                        left: 50% !important;
                        transform: translate(-50%, -50%) !important;
                        background-color: transparent !important;
                        }`
                }
            </style>
        </div>
    );
};

export default FontSizeSlider;
