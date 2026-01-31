import React from 'react';
import { FiTrendingUp, FiUsers, FiBox, FiActivity, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatCard = ({ title, value, change, isPositive, icon, bgGradient, iconBg, shadowColor }: any) => (
    <div className={`p-6 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${bgGradient} ${shadowColor}`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-white tracking-wide">{value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-2xl ${iconBg} backdrop-blur-sm flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform border border-white/20`}>
                {icon}
            </div>
        </div>
        <div className="mt-4 flex items-center">
            <span className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-md`}>
                {isPositive ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
                {change}
            </span>
            <span className="text-white/60 text-xs ml-2 font-medium">vs last month</span>
        </div>
    </div>
);

const DashboardStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Total Revenue"
                value="$54,230"
                change="12%"
                isPositive={true}
                icon={<FiTrendingUp className="text-xl" />}
                bgGradient="bg-gradient-to-br from-violet-500 to-fuchsia-600"
                iconBg="bg-white/20"
                shadowColor="shadow-fuchsia-200"
            />
            <StatCard
                title="Active Users"
                value="2,453"
                change="5.4%"
                isPositive={true}
                icon={<FiUsers className="text-xl" />}
                bgGradient="bg-gradient-to-br from-cyan-400 to-blue-600"
                iconBg="bg-white/20"
                shadowColor="shadow-blue-200"
            />
            <StatCard
                title="New Projects"
                value="45"
                change="3.2%"
                isPositive={false}
                icon={<FiBox className="text-xl" />}
                bgGradient="bg-gradient-to-br from-amber-400 to-orange-600"
                iconBg="bg-white/20"
                shadowColor="shadow-orange-200"
            />
            <StatCard
                title="Bounce Rate"
                value="24.5%"
                change="2.1%"
                isPositive={true}
                icon={<FiActivity className="text-xl" />}
                bgGradient="bg-gradient-to-br from-emerald-400 to-teal-600"
                iconBg="bg-white/20"
                shadowColor="shadow-teal-200"
            />
        </div>
    );
};

export default DashboardStats;
