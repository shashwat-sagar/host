import React, { useState } from 'react';
import { Layout } from 'antd';
import MainSidebar from './MainSidebar';
import MainHeader from './MainHeader';
import { ThemeDrawer, ThemeSettingsButton } from '../theme';
import { useThemeStore } from '../store/useThemeStore';
import { themeGradients } from '../theme/themeConfig';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export default function AppLayout() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { colorPreset } = useThemeStore();
    const gradient = themeGradients[colorPreset];

    return (
        <Layout className={`!h-screen !overflow-hidden relative !bg-linear-to-br ${gradient.from} ${gradient.via} ${gradient.to}`}>

            {/* Desktop Sidebar - Fixed Height handled by h-screen */}
            <MainSidebar />

            {/* Mobile Sidebar (Drawer) */}
            <MainSidebar
                mobile
                open={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
            />

            {/* Right Side - Scrollable */}
            <Layout className="!bg-transparent transition-all duration-300 w-full min-h-screen !overflow-y-auto">
                <MainHeader onMenuClick={() => setMobileSidebarOpen(true)} />

                <Content className="m-4! md:m-6! !mt-6! bg-white! dark:bg-gray-800/50 rounded-3xl shadow-lg min-h-fit! overflow-hidden">
                    <Outlet /><ThemeSettingsButton onClick={() => setDrawerOpen(true)} />
                </Content>

            </Layout>

            <ThemeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </Layout>
    );
}
