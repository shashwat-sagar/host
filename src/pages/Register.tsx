import Header from '../components/Header';
import { motion } from 'framer-motion';
import { LuUserPlus, LuChevronRight, LuStethoscope } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 min-h-screen font-['Inter',sans-serif]">
            <div className="bg-[#2083FF] pb-24">
                <Header />
                <div className="max-w-7xl mx-auto px-6 py-12 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Join Doccure</h1>
                    <p className="text-blue-100 text-lg opacity-80 max-w-2xl mx-auto">Select your account type to get started with the world's most trusted healthcare platform.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-12 mb-24">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Patient Registration */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -10 }}
                        onClick={() => navigate('/patientregister2')}
                        className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-100 border border-slate-50 text-center flex flex-col items-center group cursor-pointer"
                    >
                        <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-5xl mb-10 group-hover:scale-110 transition-transform shadow-inner">
                            <LuUserPlus />
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Standard Patient</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-10">
                            Manage your appointments, health records, and consult with doctors online.
                        </p>
                        <button className="mt-auto w-full py-5 bg-slate-900 text-white rounded-2xl font-extrabold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-slate-100 flex items-center justify-center gap-2">
                            Register as Patient <LuChevronRight size={18} />
                        </button>
                    </motion.div>

                    {/* Doctor Registration */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -10 }}
                        className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-100 border border-slate-50 text-center flex flex-col items-center group cursor-pointer"
                    >
                        <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center text-5xl mb-10 group-hover:scale-110 transition-transform shadow-inner">
                            <LuStethoscope />
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Medical Expert</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-10">
                            Join our network of elite medical professionals and grow your practice.
                        </p>
                        <button className="mt-auto w-full py-5 bg-slate-900 text-white rounded-2xl font-extrabold text-sm hover:bg-teal-500 transition-colors shadow-lg shadow-slate-100 flex items-center justify-center gap-2">
                            Register as Doctor <LuChevronRight size={18} />
                        </button>
                    </motion.div>
                </div>

                <div className="text-center mt-16">
                    <p className="text-slate-500 font-medium">
                        Already have an account? <a href="/login" className="text-blue-600 font-bold hover:underline">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
