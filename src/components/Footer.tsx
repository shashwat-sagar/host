import React from 'react'
import { LuFacebook, LuHeart, LuInstagram, LuMail, LuMapPin, LuPhone, LuTwitter } from 'react-icons/lu'

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-white">
                        <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                            <LuHeart size={20} fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold">MediCare+</span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                        Leading the way in medical excellence with advanced technology and compassionate care.
                    </p>
                    <div className="flex gap-4">
                        <SocialIcon icon={<LuFacebook />} />
                        <SocialIcon icon={<LuInstagram />} />
                        <SocialIcon icon={<LuTwitter />} />
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-sky-400">About Hospital</a></li>
                        <li><a href="#" className="hover:text-sky-400">Our Specialities</a></li>
                        <li><a href="#" className="hover:text-sky-400">Medical Services</a></li>
                        <li><a href="#" className="hover:text-sky-400">Patient Portal</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Support</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-sky-400">Emergency Help</a></li>
                        <li><a href="#" className="hover:text-sky-400">Insurance Info</a></li>
                        <li><a href="#" className="hover:text-sky-400">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-sky-400">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-white font-bold mb-6">Contact Us</h4>
                    <div className="flex items-start gap-3 text-sm">
                        <LuMapPin className="text-sky-500 mt-1" />
                        <p>Ring Road, Raipur, CG, IN 492001</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <LuMail className="text-sky-500" />
                        <p>contact@medicareplus.com</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm bg-slate-800 p-3 rounded-xl border border-slate-700">
                        <LuPhone className="text-red-400" />
                        <p className="font-bold">+91 98765 43210</p>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                © 2026 MediCare+ Hospital Group. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer

function SocialIcon({ icon }: any) {
    return (
        <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-sky-500 hover:text-white transition cursor-pointer">
            {icon}
        </div>
    );
}