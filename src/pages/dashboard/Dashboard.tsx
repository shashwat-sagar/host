import React from 'react';
import DashboardStats from './components/DashboardStats';
import RevenueChart from './components/RevenueChart';
import UserActivityChart from './components/UserActivityChart';
import TrafficPieChart from './components/TrafficPieChart';

const Dashboard = () => {
    return (
        <div className="min-h-full pb-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                <p className="text-slate-400 text-sm">Welcome back, Alex! Here's what's happening today.</p>
            </div>

            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <div className="lg:col-span-1">
                    <TrafficPieChart />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <UserActivityChart />
                </div>
                <div className="lg:col-span-2">
                    {/* Placeholder for Recent Transactions or Table */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Recent Projects</h3>
                            <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Project Name</th>
                                        <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                                        <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Budget</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { name: 'Redesign Landing Page', status: 'In Progress', date: 'Oct 24, 2025', budget: '$4,500', statusColor: 'bg-blue-100 text-blue-600' },
                                        { name: 'Mobile App Development', status: 'Completed', date: 'Oct 21, 2025', budget: '$12,000', statusColor: 'bg-emerald-100 text-emerald-600' },
                                        { name: 'Dashboard Analytics', status: 'Pending', date: 'Oct 19, 2025', budget: '$3,200', statusColor: 'bg-orange-100 text-orange-600' },
                                        { name: 'Marketing Campaign', status: 'In Progress', date: 'Oct 15, 2025', budget: '$8,000', statusColor: 'bg-blue-100 text-blue-600' },
                                    ].map((project, i) => (
                                        <tr key={i} className="border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors">
                                            <td className="py-4 font-medium text-slate-700">{project.name}</td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${project.statusColor}`}>
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-slate-500">{project.date}</td>
                                            <td className="py-4 text-right font-medium text-slate-700">{project.budget}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
