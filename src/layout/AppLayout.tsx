import React, { useState } from 'react';
import { Layout } from 'antd';
import MainSidebar from './MainSidebar';
import MainHeader from './MainHeader';
import { ThemeDrawer, ThemeSettingsButton } from '../theme';

const { Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
      const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Layout className="!h-screen !overflow-hidden relative !bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">

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

                <Content className="!m-4 md:!m-6 !mt-6 !p-4 md:!p-6 bg-white/50 !rounded-3xl !shadow-sm !min-h-fit"> 
                    {children}<ThemeSettingsButton onClick={() => setDrawerOpen(true)} />
                 </Content>
               
            </Layout>
             
                    <ThemeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </Layout>
    );
}
