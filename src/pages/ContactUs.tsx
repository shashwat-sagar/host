import React, { useState } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { LuPhone, LuMail, LuMapPin, LuSend } from 'react-icons/lu';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="bg-slate-50 min-h-screen font-['Inter',sans-serif]">
            <div className="bg-slate-900 pb-24">
                <Header />
                <div className="max-w-7xl mx-auto px-6 py-12 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
                    <p className="text-slate-400 text-lg opacity-80 max-w-2xl mx-auto">Have questions? We're here to help. Reach out to us through any of the channels below.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-12 mb-24">
                <div className="grid lg:grid-cols-3 gap-8 mb-24">
                    {/* Contact Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-50 group hover:bg-blue-600 transition-all duration-500"
                        >
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                                <LuPhone />
                            </div>
                            <h4 className="text-slate-900 font-bold mb-2 group-hover:text-white tracking-tight">Call Us</h4>
                            <p className="text-slate-500 text-sm group-hover:text-blue-100">+1 315 369 5943</p>
                            <p className="text-slate-500 text-sm group-hover:text-blue-100">+1 800 254 369</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-50 group hover:bg-teal-500 transition-all duration-500"
                        >
                            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                                <LuMail />
                            </div>
                            <h4 className="text-slate-900 font-bold mb-2 group-hover:text-white tracking-tight">Email Us</h4>
                            <p className="text-slate-500 text-sm group-hover:text-teal-50">doccure@example.com</p>
                            <p className="text-slate-500 text-sm group-hover:text-teal-50">support@doccure.com</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-50 group hover:bg-orange-500 transition-all duration-500"
                        >
                            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                                <LuMapPin />
                            </div>
                            <h4 className="text-slate-900 font-bold mb-2 group-hover:text-white tracking-tight">Location</h4>
                            <p className="text-slate-500 text-sm group-hover:text-orange-50">3556 Beech Street, San Francisco</p>
                            <p className="text-slate-500 text-sm group-hover:text-orange-50">California, CA 94108</p>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-100 border border-slate-50"
                        >
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Jane Doe"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 px-8 outline-none focus:border-blue-200 transition-colors font-medium text-slate-700"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="jane@example.com"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 px-8 outline-none focus:border-blue-200 transition-colors font-medium text-slate-700"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Appointment Inquiry"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 px-8 outline-none focus:border-blue-200 transition-colors font-medium text-slate-700"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 px-8 outline-none focus:border-blue-200 transition-colors font-medium text-slate-700 resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-slate-900 text-white py-5 rounded-3xl font-extrabold text-lg shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                                >
                                    Send Message <LuSend size={20} />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
