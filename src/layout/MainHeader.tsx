import React from 'react';
import { Layout, Badge, Avatar, Button } from 'antd';
import { FiSearch, FiBell, FiMessageSquare, FiMenu } from 'react-icons/fi';

const { Header } = Layout;

interface MainHeaderProps {
    onMenuClick?: () => void;
}

const MainHeader = ({ onMenuClick }: MainHeaderProps) => {
    return (
        <Header
            className=" !flex items-center justify-between !bg-white !m-4 md:!m-6 !mb-0 md:!mb-0 !rounded-3xl !px-4 md:!px-8 !h-20 !shadow-sm transition-all duration-300"
            style={{ width: 'auto' }}
        >
            {/* Left Side: Menu Toggle (Mobile) + Search */}
            <div className=" flex items-center gap-4">
                <Button
                    type="text"
                    icon={<FiMenu className="text-xl" />}
                    className="flex lg:hidden! items-center justify-center p-3 !text-slate-600 hover:!text-indigo-600 hover:!bg-indigo-50 !rounded-lg transition-all"
                    onClick={onMenuClick}
                />

                {/* Search Bar - Responsive */}
                <div className="flex items-center bg-slate-50 px-5 py-3 rounded-full border border-slate-100 w-full max-w-[200px] md:max-w-xs lg:w-96 hover:bg-slate-100 transition-colors focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-200">
                    <FiSearch className="text-slate-400 text-lg mr-3 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none text-slate-700 placeholder-slate-400 focus:outline-none w-full text-sm font-medium"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-6">
                <div className="flex items-center gap-2">
                    <Badge count={5} size="small" offset={[-2, 2]} className="cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm">
                            <FiMessageSquare className="text-lg" />
                        </div>
                    </Badge>
                    <Badge dot size="default" offset={[-4, 4]} className="cursor-pointer animate-pulse hidden sm:block">
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm">
                            <FiBell className="text-lg" />
                        </div>
                    </Badge>
                </div>

                <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>

                <div className="flex items-center gap-3 cursor-pointer group p-1 px-4  rounded-lg hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                    <div className="text-right hidden lg:block">
                        <p className="text-slate-800 text-sm font-bold leading-tight group-hover:text-indigo-600 transition-colors">Test User</p>
                        <p className="text-slate-400 text-xs leading-tight font-medium">Data Entry Operator</p>
                    </div>
                    <div className="p-0.5 h-12 w-12 flex items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 to-purple-500">
                        <Avatar
                            size={40}
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=176&q=80"
                            className="!border-2 !border-white"
                        />
                    </div>
                </div>
            </div>
        </Header>
    );
};

export default MainHeader;
