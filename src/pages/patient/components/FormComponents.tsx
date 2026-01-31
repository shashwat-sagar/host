import React from 'react';
import { motion } from 'framer-motion';
import { Form, Input, Card } from 'antd';
import { FiCheck } from 'react-icons/fi';

// --- Glass Card Component ---
interface GlassCardProps {
    children: React.ReactNode;
    title?: React.ReactNode;
    icon?: React.ReactNode;
    glowColor?: 'indigo' | 'rose' | 'emerald' | 'amber' | 'blue' | 'purple';
    className?: string;
    delay?: number;
}

const glowVariants = {
    indigo: 'from-indigo-500/10 to-purple-500/10 hover:shadow-indigo-500/20',
    rose: 'from-rose-500/10 to-orange-500/10 hover:shadow-rose-500/20',
    emerald: 'from-emerald-500/10 to-teal-500/10 hover:shadow-emerald-500/20',
    amber: 'from-amber-500/10 to-orange-500/10 hover:shadow-amber-500/20',
    blue: 'from-blue-500/10 to-cyan-500/10 hover:shadow-blue-500/20',
    purple: 'from-purple-500/10 to-pink-500/10 hover:shadow-purple-500/20',
};

const iconColors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    rose: 'bg-rose-100 text-rose-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
};

export const GlassCard = ({ children, title, icon, glowColor = 'indigo', className = '', delay = 0 }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            className={`
                relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl 
                transition-all duration-300 group
                ${className}
            `}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${glowVariants[glowColor]} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                {(title || icon) && (
                    <div className="flex items-center gap-3 mb-6">
                        {icon && (
                            <div className={`w-10 h-10 rounded-2xl ${iconColors[glowColor]} flex items-center justify-center shadow-sm`}>
                                {icon}
                            </div>
                        )}
                        {title && <h3 className="text-xl font-bold text-slate-800">{title}</h3>}
                    </div>
                )}
                <div className="flex-grow">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

// --- Glowing Input Component ---
interface GlowingInputProps {
    label?: React.ReactNode;
    name: string;
    rules?: any[];
    placeholder?: string;
    prefix?: React.ReactNode;
    type?: 'text' | 'textarea' | 'date' | 'number';
    rows?: number;
    disabled?: boolean;
    className?: string; // Allow passing className for Form.Item
}

export const GlowingInput = ({ label, name, rules, placeholder, prefix, type = 'text', rows = 3, disabled, className }: GlowingInputProps) => {
    return (
        <Form.Item label={label && <span className="font-semibold text-slate-600 ml-1">{label}</span>} name={name} rules={rules} className={className}>
            {type === 'textarea' ? (
                <Input.TextArea
                    rows={rows}
                    placeholder={placeholder}
                    className="!rounded-xl !bg-white/50 !border-slate-200 focus:!border-indigo-400 focus:!shadow-[0_0_0_4px_rgba(99,102,241,0.1)] !text-base !py-3 resize-none backdrop-blur-sm transition-all"
                />
            ) : type === 'number' ? (
                <Input
                    type="number"
                    prefix={prefix}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="!rounded-xl !bg-white/50 !border-slate-200 focus:!border-indigo-400 focus:!shadow-[0_0_0_4px_rgba(99,102,241,0.1)] !text-base !py-3 backdrop-blur-sm transition-all"
                />
            ) : (
                <Input
                    type={type}
                    prefix={prefix}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="!rounded-xl !bg-white/50 !border-slate-200 focus:!border-indigo-400 focus:!shadow-[0_0_0_4px_rgba(99,102,241,0.1)] !text-base !py-3 backdrop-blur-sm transition-all"
                />
            )}
        </Form.Item>
    );
};

// --- Selection Tile Component (Radio Replacement) ---
interface SelectionTileProps {
    value: string;
    label: string;
    subLabel?: string;
    icon?: React.ReactNode;
    color?: 'indigo' | 'blue' | 'rose' | 'emerald' | 'purple' | 'amber';
}

const tileColors = {
    indigo: 'peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:shadow-indigo-500/20 text-indigo-600',
    blue: 'peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:shadow-blue-500/20 text-blue-600',
    rose: 'peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:shadow-rose-500/20 text-rose-600',
    emerald: 'peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:shadow-emerald-500/20 text-emerald-600',
    purple: 'peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:shadow-purple-500/20 text-purple-600',
    amber: 'peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-amber-500/20 text-amber-600',
};

export const SelectionTile = ({ value, label, subLabel, icon, color = 'indigo' }: SelectionTileProps) => {
    return (
        <label className="cursor-pointer group relative h-full block">
            {/* Use radio input if inside Radio.Group, generic click handler if standalone (handled by parent usually) */}
            {/* Note: This component assumes it's used within Ant Design Radio.Group structure where it wraps the Radio.Button or similar input */}
            {/* For cleaner usage with AntD Radio.Group, we wrap the content inside the Radio.Button */}

            <div className={`
                h-full p-4 rounded-2xl bg-white border-2 border-slate-100 shadow-sm
                transition-all duration-200 ease-out
                hover:border-slate-300 hover:shadow-md
                flex flex-col items-center justify-center text-center gap-3
                group-[.ant-radio-button-wrapper-checked]:border-current
                group-[.ant-radio-button-wrapper-checked]:ring-1
                group-[.ant-radio-button-wrapper-checked]:ring-current
                ${color === 'indigo' ? 'text-indigo-600 group-[.ant-radio-button-wrapper-checked]:bg-indigo-50/50' :
                    color === 'blue' ? 'text-blue-600 group-[.ant-radio-button-wrapper-checked]:bg-blue-50/50' :
                        color === 'rose' ? 'text-rose-600 group-[.ant-radio-button-wrapper-checked]:bg-rose-50/50' :
                            color === 'emerald' ? 'text-emerald-600 group-[.ant-radio-button-wrapper-checked]:bg-emerald-50/50' :
                                color === 'purple' ? 'text-purple-600 group-[.ant-radio-button-wrapper-checked]:bg-purple-50/50' :
                                    'text-amber-600 group-[.ant-radio-button-wrapper-checked]:bg-amber-50/50'}
             `}>
                {icon && <div className="text-2xl mb-1 transform group-hover:scale-110 transition-transform">{icon}</div>}
                <div>
                    <div className="font-bold text-slate-700">{label}</div>
                    {subLabel && <div className="text-xs text-slate-400 font-medium mt-1">{subLabel}</div>}
                </div>

                {/* Checkmark Indicator */}
                <div className={`
                    absolute top-3 right-3 opacity-0 transform scale-50 transition-all
                    group-[.ant-radio-button-wrapper-checked]:opacity-100 group-[.ant-radio-button-wrapper-checked]:scale-100
                `}>
                    <div className="bg-current rounded-full p-0.5 text-white">
                        <FiCheck size={10} />
                    </div>
                </div>
            </div>
        </label>
    );
};
