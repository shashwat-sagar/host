import Header from '../components/Header';
import { motion } from 'framer-motion';
import { LuTarget, LuEye, LuHistory, LuShieldCheck, LuAward, LuUsers } from 'react-icons/lu';

const AboutUs = () => {
    return (
        <div className="bg-white min-h-screen font-['Inter',sans-serif]">
            <div className="bg-[#2083FF] pb-24">
                <Header />
                <div className="max-w-7xl mx-auto px-6 py-12 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Doccure</h1>
                    <p className="text-blue-100 text-lg opacity-80 max-w-2xl mx-auto">We are dedicated to providing the best healthcare experience with a patient-centric approach.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-12 mb-24">
                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-blue-100 border border-slate-50 relative overflow-hidden group"
                    >
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                            <LuTarget />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
                        <p className="text-slate-500 leading-relaxed text-lg">
                            To provide accessible, high-quality healthcare services that improve the life of every patient we serve through medical excellence and compassionate care.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-blue-100 border border-slate-50 relative overflow-hidden group"
                    >
                        <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                            <LuEye />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Vision</h2>
                        <p className="text-slate-500 leading-relaxed text-lg">
                            To be the most trusted healthcare partner globally, recognized for innovative medical solutions and patient-centered excellence.
                        </p>
                    </motion.div>
                </div>

                {/* Story Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative">
                        <img
                            src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-01.jpg"
                            alt="Hospital"
                            className="rounded-[3rem] shadow-2xl"
                        />
                        <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50 max-w-[200px]">
                            <div className="text-4xl font-extrabold text-blue-600 mb-2">25+</div>
                            <div className="text-sm font-bold text-slate-900 uppercase tracking-widest leading-tight">Years of Experience</div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="flex items-center gap-2">
                            <LuHistory className="text-blue-600" size={24} />
                            <span className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em]">Our Story</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                            Pioneering Better Healthcare <span className="text-blue-600">Since 2001.</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Founded with a vision to transform healthcare in our community, Doccure started with a small team of dedicated doctors. Today, we stand as a leader in medical innovation, serving thousands of patients every year with state-of-the-art facilities and a compassionate heart.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-4">
                            <div className="flex items-center gap-3">
                                <LuShieldCheck className="text-teal-500" size={24} />
                                <span className="font-bold text-slate-700">ISO Certified</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <LuAward className="text-orange-500" size={24} />
                                <span className="font-bold text-slate-700">Award Winning</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <LuUsers className="text-blue-500" size={24} />
                                <span className="font-bold text-slate-700">1k+ Experts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
