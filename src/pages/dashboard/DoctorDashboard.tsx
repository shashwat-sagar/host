import {
    FiArrowUp,
    FiArrowDown,
    FiUsers,
    FiActivity,
    FiCalendar,
    FiVideo,
    FiMessageSquare,
    FiBell,
    FiMoreVertical,
    FiClock
} from 'react-icons/fi';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useThemeStore } from '../../store/useThemeStore';
import { themeChartColors } from '../../theme/themeConfig';

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
            <span className="text-white/60 text-xs ml-2 font-medium">vs last week</span>
        </div>
    </div>
);

const DoctorDashboard = () => {
    const { colorPreset } = useThemeStore();
    const chartColors = themeChartColors[colorPreset];

    const barChartOptions: Highcharts.Options = {
        chart: { type: 'column', height: 300, backgroundColor: 'transparent', style: { fontFamily: 'Poppins, sans-serif' } },
        title: { text: undefined },
        xAxis: {
            categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            lineColor: 'transparent',
            gridLineColor: 'transparent',
            labels: { style: { color: '#94a3b8', fontWeight: '500' } }
        },
        yAxis: {
            title: { text: undefined },
            gridLineColor: '#f1f5f9',
            labels: { style: { color: '#94a3b8' } }
        },
        legend: { enabled: false },
        tooltip: {
            backgroundColor: '#ffffff',
            borderColor: '#f1f5f9',
            borderRadius: 16,
            shadow: true,
            style: { color: '#1e293b', fontSize: '13px' }
        },
        series: [{
            name: 'Revenue',
            type: 'column',
            data: [45, 38, 18, 42, 35, 48, 65],
            color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: chartColors?.revenue?.stops || [[0, '#3b82f6'], [1, '#60a5fa']]
            } as any,
            borderRadius: 6
        }]
    };

    return (
        <div className="min-h-full pb-8">
            {/* Header section matching Dashboard.tsx */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Doctor Dashboard</h1>
                <p className="text-slate-400 text-sm">Welcome back, Dr. Alex! Here's your practice overview for today.</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Patients"
                    value="978"
                    change="15%"
                    isPositive={true}
                    icon={<FiUsers className="text-xl" />}
                    bgGradient="bg-gradient-to-br from-indigo-500 to-purple-600"
                    iconBg="bg-white/20"
                    shadowColor="shadow-indigo-200"
                />
                <StatCard
                    title="Patients Today"
                    value="80"
                    change="15%"
                    isPositive={true}
                    icon={<FiActivity className="text-xl" />}
                    bgGradient="bg-gradient-to-br from-cyan-400 to-blue-600"
                    iconBg="bg-white/20"
                    shadowColor="shadow-blue-200"
                />
                <StatCard
                    title="Appointments Today"
                    value="50"
                    change="20%"
                    isPositive={true}
                    icon={<FiCalendar className="text-xl" />}
                    bgGradient="bg-gradient-to-br from-emerald-400 to-teal-600"
                    iconBg="bg-white/20"
                    shadowColor="shadow-teal-200"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Revenue/Weekly Overview Chart */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Weekly Overview</h3>
                                <p className="text-slate-400 text-xs font-medium">Revenue vs Appointments</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">Revenue</span>
                                <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-lg text-xs font-bold">Appointments</span>
                            </div>
                        </div>
                        <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
                    </div>
                </div>

                {/* Notifications mimicking pie chart container */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Notifications</h3>
                            <button className="text-indigo-600 text-xs font-semibold hover:text-indigo-700 underline underline-offset-4">View All</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: 'Booking Confirmed', msg: 'Patient John Doe on 21 Mar', time: 'Just Now', color: 'bg-blue-100 text-blue-600' },
                                { title: 'New Review', msg: 'You received a 5-star rating', time: '1 hr ago', color: 'bg-indigo-100 text-indigo-600' },
                                { title: 'Appt Reminder', msg: 'Meeting with Sarah at 2:00 PM', time: '2 hrs ago', color: 'bg-orange-100 text-orange-600' },
                            ].map((note, i) => (
                                <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                    <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${note.color}`}>
                                        <FiBell />
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm font-bold text-slate-700 truncate">{note.title}</p>
                                            <span className="text-[10px] text-slate-400 font-medium">{note.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 truncate mt-0.5">{note.msg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Appointment Table matching Dashboard's table style */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Upcoming Appointments</h3>
                            <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient</th>
                                        <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date & Time</th>
                                        <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { id: '#Apt01', name: 'Adrian Marshall', date: 'Mar 21, 10:45 AM', type: 'General', avatar: 'https://xsgames.co/randomusers/avatar.php?g=male&key=1' },
                                        { id: '#Apt02', name: 'Kelly Stevens', date: 'Mar 21, 11:30 AM', type: 'Follow-up', avatar: 'https://xsgames.co/randomusers/avatar.php?g=female&key=2' },
                                        { id: '#Apt03', name: 'Samuel Anderson', date: 'Mar 21, 01:15 PM', type: 'Consultation', avatar: 'https://xsgames.co/randomusers/avatar.php?g=male&key=3' },
                                        { id: '#Apt04', name: 'Catherine Griffin', date: 'Mar 22, 09:00 AM', type: 'Urgent', avatar: 'https://xsgames.co/randomusers/avatar.php?g=female&key=4' },
                                    ].map((apt, i) => (
                                        <tr key={i} className="border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors">
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={apt.avatar} className="w-10 h-10 rounded-xl" alt="" />
                                                    <div>
                                                        <p className="font-bold text-slate-700">{apt.name}</p>
                                                        <p className="text-[10px] text-indigo-500 font-bold">{apt.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-slate-500 font-medium">
                                                <div className="flex flex-col">
                                                    <span>{apt.date}</span>
                                                    <span className="text-[10px] uppercase font-bold text-slate-400">{apt.type}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex justify-center gap-2">
                                                    <button className="p-2 rounded-xl bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors">
                                                        <FiVideo />
                                                    </button>
                                                    <button className="p-2 rounded-xl bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-colors">
                                                        <FiMessageSquare />
                                                    </button>
                                                    <button className="p-2 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">
                                                        <FiMoreVertical />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Recent Patients / Upcoming Highlight */}
                <div className="space-y-6">
                    {/* Featured Upcoming Card */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-700 p-6 rounded-3xl shadow-lg border border-white/10 relative overflow-hidden group">
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                        <p className="text-white/60 text-xs font-bold mb-4">NEXT APPOINTMENT</p>
                        <div className="flex items-center gap-4 mb-6">
                            <img src="https://xsgames.co/randomusers/avatar.php?g=male&key=1" className="w-14 h-14 rounded-2xl border-2 border-white/20" alt="" />
                            <div>
                                <h4 className="text-white font-bold text-lg leading-tight">Adrian Marshall</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <FiClock className="text-white/60 text-xs" />
                                    <span className="text-white/80 text-xs font-bold">10:45 AM</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-white/10 hover:bg-white/20 text-white rounded-xl py-2.5 text-xs font-bold transition-all backdrop-blur-md">Reschedule</button>
                            <button className="bg-white text-indigo-600 hover:bg-slate-50 rounded-xl py-2.5 text-xs font-bold transition-all shadow-lg">Start Call</button>
                        </div>
                    </div>

                    {/* Clinics Card */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Clinics</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Sofi's Clinic", time: 'Tue, Wed 07-09 PM', fee: '$900', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/clinic/clinic-01.jpg' },
                                { name: "Family Dentistry", time: 'Sat, Tue 07-09 PM', fee: '$600', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/clinic/clinic-02.jpg' },
                            ].map((clinic, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 group">
                                    <img src={clinic.img} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-slate-700 text-sm truncate">{clinic.name}</p>
                                            <span className="text-indigo-500 font-bold text-[10px]">{clinic.fee}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5 mt-1">
                                            <FiClock className="text-slate-400 text-[10px]" />
                                            <p className="text-[10px] text-slate-400 font-medium truncate">{clinic.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
