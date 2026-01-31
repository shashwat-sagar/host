import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from 'antd';
import {
    FiHome,
    FiUser,
    FiSettings,
    FiActivity,
    FiGrid,
    FiMenu,
    FiX,
    FiLock,
    FiBell,
    FiUserPlus
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const { Sider } = Layout;

interface MainSidebarProps {
    mobile?: boolean;
    open?: boolean;
    onClose?: () => void;
}

const MainSidebar = ({ mobile, open, onClose }: MainSidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuClick = ({ key }: { key: string }) => {
        const pathMap: Record<string, string> = {
            '1': '/',
            '2': '/projects',
            '3': '/activity',
            '4': '/team',
            '5-1': '/settings/general',
            '5-2': '/settings/security',
            '5-3': '/settings/notifications',
            '6': '/patient/register',
        };
        const path = pathMap[key];
        if (path) {
            navigate(path);
            if (mobile && onClose) {
                onClose();
            }
        }
    };

    const items = [
        { key: '1', icon: <FiHome />, label: 'Dashboard' },
        { key: '2', icon: <FiGrid />, label: 'Projects' },
        { key: '3', icon: <FiActivity />, label: 'Activity' },
        { key: '4', icon: <FiUser />, label: 'Team', path: "/team" },
        { key: '6', icon: <FiUserPlus />, label: 'Register Patient', path: "/patient/register" },
        {
            key: '5', icon: <FiSettings />, label: 'Settings', children: [
                { key: '5-1', label: 'General', icon: <FiSettings /> },
                { key: '5-2', label: 'Security', icon: <FiLock /> },
                { key: '5-3', label: 'Notifications', icon: <FiBell /> },
            ]
        },
    ];

    const SidebarContent = (
        <>
            {/* Logo / Brand Area */}
            <div className={`h-24 flex items-center ${collapsed && !mobile ? 'justify-center' : 'px-8'} transition-all duration-300`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 shrink-0">
                    <span className="font-bold text-lg">P</span>
                </div>
                {(!collapsed || mobile) && (
                    <div
                        className="ml-3 flex flex-col"
                    >
                        <span className="text-slate-800 font-bold text-xl tracking-tight">Portal Title</span>
                        <span className="text-slate-400 text-xs font-medium">Subtitle</span>
                    </div>
                )}
            </div>

            {/* Toggle Button (Desktop Only) */}
            {!mobile && (
                <div className="absolute -right-3 top-24 z-50">
                    <Button
                        type="text"
                        shape="circle"
                        icon={collapsed ? <FiMenu /> : <FiX />}
                        onClick={() => setCollapsed(!collapsed)}
                        className="!bg-white !text-slate-600 !border !border-slate-100 !shadow-md hover:!text-indigo-600 !w-8 !h-8 !flex !items-center !justify-center transition-all"
                    />
                </div>
            )}

            {/* Menu */}
            <Menu
                mode="inline"
                selectedKeys={[
                    location.pathname === '/' ? '1'
                        : location.pathname.includes('patient') ? '6'
                            : location.pathname.includes('team') ? '4'
                                : location.pathname.includes('projects') ? '2'
                                    : location.pathname.includes('activity') ? '3'
                                        : location.pathname.includes('settings') ? '5-1'
                                            : '1'
                ]}
                className="!bg-transparent !border-none px-3 mt-2"
                items={items.map(item => ({
                    ...item,
                    className: "!my-1 tracking-wide !rounded-xl text-slate-500 !font-medium hover:!text-indigo-600 hover:!bg-indigo-50 !transition-all !duration-200"
                }))}
                onClick={handleMenuClick}
            />

            {/* User Profile Summary at bottom */}
            <div className={`absolute bottom-8 left-0 w-full px-4 ${collapsed && !mobile ? 'flex justify-center' : ''}`}>
                <div className={`flex items-center p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-100 ${collapsed && !mobile ? 'justify-center w-12 h-12 p-0' : 'gap-3'}`}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white shrink-0 shadow-sm">
                        <FiUser />
                    </div>
                    {(!collapsed || mobile) && (
                        <div className="overflow-hidden">
                            <p className="text-slate-800 text-sm font-semibold truncate">Test User</p>
                            <p className="text-slate-400 text-xs truncate">Administrator</p>
                        </div>
                    )}
                </div>
            </div>

            {/* CSS Override for selected menu item to use gradient */}
            <style>{`
            .ant-menu-item{
                color: #656565ff !important;
            }
                .ant-menu-item-selected {
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
                    color: white !important;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                }
                .ant-menu-item-selected:hover {
                    color: white !important;
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
                }
            `}</style>
        </>
    );

    if (mobile) {
        return (
            <Drawer
                placement="left"
                onClose={onClose}
                open={open}
                width={280}
                styles={{ body: { padding: 0 } }}
                className="!bg-white"
                closeIcon={null}
            >
                <div className="h-full relative bg-white">
                    {/* Close button for mobile drawer */}
                    <div className="absolute top-4 right-4 z-50">
                        <Button
                            type="text"
                            icon={<FiX className="text-lg" />}
                            onClick={onClose}
                            className="!text-slate-500"
                        />
                    </div>
                    {SidebarContent}
                </div>
            </Drawer>
        );
    }

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={260}
            className=" !bg-white !m-4 !rounded-3xl !shadow-lg !border-none hidden md:block"
            style={{
                height: 'calc(100vh - 32px)',
                position: 'relative'
            }}
        >
            {SidebarContent}
        </Sider>
    );
};

export default MainSidebar;
