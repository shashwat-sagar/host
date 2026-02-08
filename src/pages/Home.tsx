import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuPhone, LuCalendar, LuUser, LuStethoscope, LuHeart,
  LuMicroscope, LuClock, LuChevronRight, LuFacebook,
  LuInstagram, LuTwitter, LuShieldCheck, LuMapPin, LuMail
} from 'react-icons/lu';
import { FaUserMd, FaHospitalAlt, FaAmbulance, FaMicroscope } from 'react-icons/fa';

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HospitalHomepage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen  font-['Poppins',sans-serif]">

      {/* 1. Header / Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-teal-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
              <LuHeart size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              MediCare+
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            {['Home', 'About Us', 'Our Doctors', 'Departments', 'Services', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-sky-600 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-sky-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-sky-200 hover:bg-sky-700 transition"
          >
            Book Appointment
          </motion.button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full rounded-l-[100px] bg-blue-700!" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center bg-transparent">
          <motion.div
            initial="hidden" animate="visible" variants={fadeIn}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold tracking-wider uppercase">
              Your Health, Our Priority
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1]">
              Compassionate Care. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-500">Advanced Medicine.</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
              Experience world-class healthcare with our team of expert specialists and state-of-the-art medical technology.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-sky-600 text-white rounded-2xl font-bold shadow-lg shadow-sky-100 hover:bg-sky-700 transition flex items-center gap-2">
                Book Appointment <LuCalendar size={18} />
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition flex items-center gap-2">
                Find a Doctor <LuStethoscope size={18} />
              </button>
            </div>
            <div className="flex items-center gap-4 pt-6 text-sm text-slate-500 border-t border-slate-100">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p>Trusted by <span className="font-bold text-slate-900">10k+</span> happy patients</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-sky-400/10 rounded-full blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000"
              alt="Medical Care"
              className="relative z-10 rounded-[2.5rem] shadow-2xl object-cover aspect-[4/3]"
            />
            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                <LuPhone size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">24/7 Emergency</p>
                <p className="text-lg font-bold text-slate-900">+91 98765 43210</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* 3. Key Highlights */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 relative z-30">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard icon={<LuShieldCheck />} value="25+" label="Years Experience" color="sky" />
          <StatCard icon={<FaUserMd />} value="150+" label="Expert Doctors" color="teal" />
          <StatCard icon={<LuClock />} value="24/7" label="Emergency Care" color="rose" />
          <StatCard icon={<LuUser />} value="100k+" label="Happy Patients" color="emerald" />
        </motion.div>
      </section>

      {/* 4. About Hospital */}
      <section id="about-us" className="py-24 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"
              alt="Hospital Facility"
              className="rounded-3xl shadow-lg"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl text-sky-600 cursor-pointer hover:scale-110 transition">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-current border-b-[10px] border-b-transparent ml-1" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Pioneering Better Healthcare Together</h2>
            <p className="text-slate-600 leading-relaxed">
              For over two decades, MediCare+ has been at the forefront of medical innovation. Our mission is to provide advanced healthcare with a human touch, ensuring every patient receives personalized care in a healing environment.
            </p>
            <ul className="space-y-3">
              {['Advanced ICU & Trauma Center', 'Digital Diagnostic Laboratory', 'Specialized Surgical Theatres'].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                  <LuShieldCheck className="text-teal-500" /> {item}
                </li>
              ))}
            </ul>
            <button className="text-sky-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Read More About Us <LuChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Departments */}
      <section id="departments" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Medical Specialties</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Providing specialized care across various departments with modern technology and expert clinicians.</p>
          </div>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <DeptCard icon={<LuHeart />} name="Cardiology" desc="Heart surgery and cardiovascular care for all ages." />
            <DeptCard icon={<FaHospitalAlt />} name="Orthopedics" desc="Joint replacements, trauma, and sports medicine." />
            <DeptCard icon={<LuStethoscope />} name="Neurology" desc="Expert treatment for brain and nervous system disorders." />
            <DeptCard icon={<LuUser />} name="Pediatrics" desc="Specialized healthcare for infants, children, and teens." />
            <DeptCard icon={<LuMicroscope />} name="Pathology" desc="Advanced diagnostic testing and laboratory services." />
            <DeptCard icon={<LuHeart />} name="Gynecology" desc="Comprehensive women's health and maternity services." />
          </motion.div>
        </div>
      </section>

      {/* 6. Our Doctors */}
      <section id="our-doctors" className="py-24 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our World-Class Specialists</h2>
            <p className="text-slate-600 max-w-xl">Meet the experts dedicated to your health and well-being.</p>
          </div>
          <button className="px-6 py-3 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition">
            View All Doctors
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <DoctorCard name="Dr. James Wilson" spec="Cardiologist" img="https://i.pravatar.cc/300?u=1" />
          <DoctorCard name="Dr. Sarah Jenkins" spec="Neurologist" img="https://i.pravatar.cc/300?u=2" />
          <DoctorCard name="Dr. Michael Chen" spec="Orthopedic Surgeon" img="https://i.pravatar.cc/300?u=3" />
          <DoctorCard name="Dr. Emily Blunt" spec="Pediatrician" img="https://i.pravatar.cc/300?u=4" />
        </div>
      </section>

      {/* 9. Appointment CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }}
          className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-sky-600 via-sky-500 to-teal-400 p-12 relative overflow-hidden text-center text-white"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to Take Care of Your Health?</h2>
          <p className="text-sky-50 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Book your appointment online today and get a consultation from our expert medical team.
          </p>
          <button className="px-10 py-5 bg-white text-sky-600 rounded-2xl font-bold text-lg shadow-xl hover:bg-sky-50 transition relative z-10">
            Book Appointment Now
          </button>
        </motion.div>
      </section>

      {/* 10. Footer */}

    </div>
  );
}

// --- Sub-components for Cleanliness ---

function StatCard({ icon, value, label, color }: any) {
  const colors: any = {
    sky: 'bg-sky-50 text-sky-600',
    teal: 'bg-teal-50 text-teal-600',
    rose: 'bg-rose-50 text-rose-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };
  return (
    <motion.div
      variants={fadeIn}
      className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50 text-center"
    >
      <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl ${colors[color]}`}>
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
    </motion.div>
  );
}

function DeptCard({ icon, name, desc }: any) {
  return (
    <motion.div
      variants={fadeIn} whileHover={{ y: -10 }}
      className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:shadow-2xl hover:shadow-sky-100 transition-all group"
    >
      <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{name}</h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-6">{desc}</p>
      <button className="text-sky-600 text-sm font-bold flex items-center gap-1">
        Learn More <LuChevronRight size={16} />
      </button>
    </motion.div>
  );
}

function DoctorCard({ name, spec, img }: any) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
    >
      <img src={img} alt={name} className="w-full aspect-square object-cover rounded-2xl mb-4" />
      <div className="text-center pb-2">
        <h3 className="font-bold text-slate-900">{name}</h3>
        <p className="text-xs text-slate-500 font-medium mb-4">{spec}</p>
        <button className="w-full py-3 bg-slate-50 text-sky-600 rounded-xl font-bold text-sm hover:bg-sky-600 hover:text-white transition-colors">
          View Profile
        </button>
      </div>
    </motion.div>
  );
}


