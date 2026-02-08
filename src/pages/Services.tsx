import Header from '../components/Header';
import { motion } from 'framer-motion';
import {
    LuHeart, LuBrain, LuActivity, LuStethoscope,
    LuShield, LuChevronRight, LuClipboard, LuMicroscope
} from 'react-icons/lu';

const services = [
    { title: 'Cardiology', desc: 'Comprehensive heart care including diagnostics, surgery, and rehabilitation.', icon: <LuHeart />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Neurology', desc: 'Expert treatment for brain and nervous system disorders and injuries.', icon: <LuBrain />, color: 'bg-purple-100 text-purple-600' },
    { title: 'Urology', icon: <LuActivity />, desc: 'Specialized care for urinary tract and male reproductive health.', color: 'bg-indigo-100 text-indigo-600' },
    { title: 'Orthopedic', icon: <LuStethoscope />, desc: 'Treatment for bone, joint, and muscle conditions and injuries.', color: 'bg-blue-100 text-blue-600' },
    { title: 'Dentist', icon: <LuShield />, desc: 'Complete oral health care from preventative to cosmetic dentistry.', color: 'bg-teal-100 text-teal-600' },
    { title: 'Ophthalmology', icon: <LuShield />, desc: 'Specialized eye care and advanced vision correction treatments.', color: 'bg-orange-100 text-orange-600' },
    { title: 'Pathology', icon: <LuMicroscope />, desc: 'Advanced laboratory testing and accurate diagnostic services.', color: 'bg-red-100 text-red-600' },
    { title: 'General Checkup', icon: <LuClipboard />, desc: 'Comprehensive health assessments for preventative wellness.', color: 'bg-emerald-100 text-emerald-600' },
];

const Services = () => {
    return (
        <div className="bg-slate-50 min-h-screen font-['Inter',sans-serif]">
            <div className="bg-slate-900 pb-24">
                <Header theme='dark' />
                <div className="max-w-7xl mx-auto px-6 py-12 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Services</h1>
                    <p className="text-slate-400 text-lg opacity-80 max-w-2xl mx-auto">Providing world-class medical expertise with compassionate care across all specialities.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-12 mb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-50 flex flex-col items-center text-center group"
                        >
                            <div className={`w-20 h-20 ${service.color} rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-inner`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{service.desc}</p>
                            <button className="text-blue-600 font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                Learn More <LuChevronRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
