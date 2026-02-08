import HeroSection from './HeroSection';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  LuStethoscope, LuHeart, LuBrain, LuActivity,
  LuShield, LuArrowRight, LuMapPin, LuDollarSign, LuStar,
  LuChevronDown, LuPlay, LuUsers, LuPhone, LuMail,
  LuFacebook, LuInstagram, LuTwitter, LuLinkedin,
  LuApple, LuPlay as LuPlayStore,
  LuChevronRight
} from 'react-icons/lu';

const specialties = [
  { name: 'Cardiology', icon: <LuHeart />, color: 'bg-blue-100 text-blue-600' },
  { name: 'Neurology', icon: <LuBrain />, color: 'bg-purple-100 text-purple-600' },
  { name: 'Urology', icon: <LuActivity />, color: 'bg-indigo-100 text-indigo-600' },
  { name: 'Orthopedic', icon: <LuStethoscope />, color: 'bg-blue-100 text-blue-600' },
  { name: 'Dentist', icon: <LuShield />, color: 'bg-teal-100 text-teal-600' },
  { name: 'Ophthalmology', icon: <LuShield />, color: 'bg-orange-100 text-orange-600' },
];

const careSupports = [
  { title: 'Checkup Family', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/service/service-01.jpg' },
  { title: 'Orthopedic Family', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/service/service-02.jpg' },
  { title: 'Neurological Family', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/service/service-03.jpg' },
  { title: 'Ophthalmology Family', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/service/service-04.jpg' },
  { title: 'Dental Family', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/service/service-05.jpg' },
  { title: 'Urology Family', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/service/service-06.jpg' },
];

const doctors = [
  { name: 'Dr. Ruby Angel', spec: 'Cardiology', loc: 'Florida, USA', price: '300-1000', rating: '4.5', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-01.jpg' },
  { name: 'Dr. Darren Elder', spec: 'Neurology', loc: 'Newyork, USA', price: '50-300', rating: '4.0', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-02.jpg' },
  { name: 'Dr. Deborah Angel', spec: 'Cardiology', loc: 'Georgia, USA', price: '100-400', rating: '4.5', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-03.jpg' },
  { name: 'Dr. Sofia Brient', spec: 'Urology', loc: 'Louisiana, USA', price: '150-250', rating: '4.5', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-04.jpg' },
];

const reasons = [
  { title: 'Patient Care', desc: 'Focus on your health and well-being with personalized care plans.', icon: <LuHeart className="text-red-500" /> },
  { title: 'Professional', desc: 'Expert medical professionals with years of experience in their fields.', icon: <LuStethoscope className="text-blue-500" /> },
  { title: 'Excellent Results', desc: 'Proven track record of successful treatments and happy patients.', icon: <LuStar className="text-yellow-500" /> },
];

const testimonials = [
  { name: 'Ruby Angel', body: 'Best doctor I have ever seen. Highly recommended for any cardiology issues.', rating: 5, img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient1.jpg' },
  { name: 'Darren Elder', body: 'Excellent service and very professional staff. The treatment was very effective.', rating: 4, img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient2.jpg' },
  { name: 'Deborah Angel', body: 'The doctors are very caring and the facilities are top-notch. Very happy with the care.', rating: 5, img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/patients/patient3.jpg' },
];

const stats = [
  { label: 'Happy Patients', value: '5L+', icon: <LuUsers /> },
  { label: 'Appointments', value: '1L+', icon: <LuActivity /> },
  { label: 'Expert Doctors', value: '1K+', icon: <LuStethoscope /> },
  { label: 'Surgery Rooms', value: '1L+', icon: <LuActivity /> },
  { label: 'Hospital Rooms', value: '3L+', icon: <LuActivity /> },
];

const faqs = [
  { q: 'How do I book an appointment?', a: 'You can book an appointment easily through our website by selecting your preferred doctor and time slot. Or call us directly at our 24/7 hotline.' },
  { q: 'Is there any health insurance program?', a: 'Yes, we partner with most major insurance providers. Please check our insurance page or contact our billing department for more details.' },
  { q: 'Can I consult with a doctor online?', a: 'Absolutely! We offer virtual consultations through our secure telemedicine platform for many non-emergency medical needs.' },
  { q: 'What should I bring to my first visit?', a: 'Please bring your photo ID, insurance card, and any relevant medical history or previous test results to your first appointment.' },
];

const articles = [
  { title: 'Understanding Your Heart: A Guide to Cardiovascular Health', date: '12 Jan 2026', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/blog/blog-01.jpg', author: 'Dr. Ruby Angel' },
  { title: 'The Importance of Regular Dental Checkups for All Ages', date: '15 Jan 2026', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/blog/blog-02.jpg', author: 'Dr. Darren Elder' },
];

const AccordionItem = ({ q, a, isOpen, onClick }: any) => (
  <div className="border-b border-slate-100 last:border-0">
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group"
    >
      <span className={`text-[15px] font-bold transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-800'}`}>{q}</span>
      <LuChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-sm text-slate-500 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const HomeDemo = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-white overflow-hidden font-['Inter',sans-serif]">
      <HeroSection />

      {/* Categories / Specialties */}
      <section className="relative z-20 -mt-12 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {specialties.map((spec, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-100 border border-slate-50 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className={`w-16 h-16 ${spec.color} rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                {spec.icon}
              </div>
              <span className="text-slate-800 font-bold text-xs uppercase tracking-wider">{spec.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Care & Support */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">Our Features</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
            Highlighting the <span className="text-blue-600">Care & Support</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 sm:px-12 md:px-0">
          {careSupports.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="relative group overflow-hidden rounded-[2rem] shadow-lg shadow-slate-100"
            >
              <img src={item.img} alt={item.title} className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/10 to-transparent flex flex-col justify-end p-6">
                <span className="text-white font-bold text-xs group-hover:text-blue-300 transition-colors uppercase tracking-wide leading-tight">{item.title}</span>
                <div className="mt-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <LuArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlighted Doctors */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">Our Doctors</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
              Our <span className="text-blue-600">Highlighted</span> Doctor
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doc, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col group"
              >
                <div className="relative overflow-hidden">
                  <img src={doc.img} alt={doc.name} className="w-full aspect-square object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">New</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-2">
                    <LuStar size={12} className="text-yellow-400 fill-current" />
                    <span className="text-xs font-bold text-slate-700">{doc.rating}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{doc.name}</h3>
                  <p className="text-blue-500 text-xs font-bold mb-4">{doc.spec}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-slate-400">
                      <LuMapPin size={14} className="text-slate-300" />
                      <span className="text-xs font-medium">{doc.loc}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <LuDollarSign size={14} className="text-slate-300" />
                      <span className="text-xs font-bold text-slate-900">${doc.price}</span>
                    </div>
                  </div>

                  <button className="mt-auto w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200">
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons to Choose */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">Why Choose Us</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
            Compelling <span className="text-blue-600">Reasons</span> to Choose
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-100 border border-slate-50 text-center flex flex-col items-center group"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-inner text-blue-600">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{reason.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission / About Section */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-01.jpg" alt="feature" className="rounded-3xl shadow-2xl" />
              <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-02.jpg" alt="feature" className="rounded-3xl shadow-2xl" />
            </div>
            <div className="space-y-4">
              <div className="bg-blue-600 w-full aspect-square rounded-3xl flex items-center justify-center text-white relative overflow-hidden group cursor-pointer">
                <LuPlay size={48} className="z-10 group-hover:scale-125 transition-transform" />
                <div className="absolute inset-0 bg-white/20 blur-2xl animate-pulse" />
              </div>
              <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/features/feature-03.jpg" alt="feature" className="rounded-3xl shadow-2xl" />
            </div>
          </div>
          <div className="text-white space-y-8">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-blue-400 text-xs font-bold uppercase tracking-wider">Our Mission</span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              We are committed to understanding your <span className="text-blue-500">unique needs and delivering care.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-lg">
              At Doccure, we believe that healthcare is a journey of partnership and trust. Our team is dedicated to providing personalized medical solutions tailored to your individual needs.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LuShield size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Our Vision</h4>
                  <p className="text-xs text-slate-500">To be the global leader in patient-centric healthcare innovation.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LuActivity size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Our Mission</h4>
                  <p className="text-xs text-slate-500">To transform lives through accessible, high-quality medical expertise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-6 bg-slate-50/30">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
            15k Users <span className="text-blue-600">Trust Doccure</span> Worldwide
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-50 relative"
            >
              <div className="flex items-center gap-1 mb-6">
                {Array(5).fill(0).map((_, i) => (
                  <LuStar key={i} size={14} className={i < t.rating ? "text-yellow-400 fill-current" : "text-slate-200"} />
                ))}
              </div>
              <p className="text-slate-600 text-[15px] italic leading-relaxed mb-8">"{t.body}"</p>
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white shadow-lg" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm tracking-tight">{t.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">Verified Patient</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-5 gap-8 bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-100 border border-slate-50">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center group cursor-default">
              <div className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{s.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">FAQ</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
            Your Questions are <span className="text-blue-600">Answered</span>
          </h2>
        </div>

        <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              q={faq.q}
              a={faq.a}
              isOpen={openFaq === idx}
              onClick={() => setOpenFaq(isOpen => isOpen === idx ? -1 : idx)}
            />
          ))}
        </div>
      </section>

      {/* App Download */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[4rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="text-white space-y-8 flex-1 z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Download the Doccure App today!
            </h2>
            <p className="text-blue-100/80 leading-relaxed max-w-lg">
              Get medical consultations, book appointments, and manage your health records all in one place. Available on all major platforms.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl flex items-center gap-3 font-bold hover:bg-blue-50 transition-colors shadow-xl">
                <LuPlayStore size={24} fill="currentColor" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Get it on</p>
                  <p className="text-lg leading-none">Google Play</p>
                </div>
              </button>
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-bold hover:bg-slate-800 transition-colors shadow-xl border border-white/10">
                <LuApple size={24} fill="currentColor" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Download on</p>
                  <p className="text-lg leading-none">App Store</p>
                </div>
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center z-10">
            <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/mobileapp.png" alt="app" className="w-full max-w-md drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">Our Blog</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
            Stay Updated With Our <span className="text-blue-600">Latest Articles</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((art, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-slate-100 border border-slate-50 grid md:grid-cols-2 group"
            >
              <div className="overflow-hidden">
                <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-10 flex flex-col">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">{art.date}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex-1 group-hover:text-blue-600 transition-colors">{art.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">By {art.author}</span>
                  <button className="w-10 h-10 bg-slate-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                    <LuChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl hover:bg-blue-600 transition-all">
            View All Articles
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto bg-blue-500 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <h3 className="text-2xl font-extrabold">Working for Your Better Health.</h3>
          <div className="flex flex-wrap gap-8 text-sm font-bold opacity-80">
            <a href="#" className="hover:text-blue-200 transition-colors">Speciality Doctors</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Online Consultations</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="pt-24 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 border-b border-slate-100 pb-20">
          <div className="space-y-8">
            <img src="https://doccure.dreamstechnologies.com/html/template/assets/img/logo.png" alt="logo" className="h-10" />
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted partner in healthcare. Providing top-tier medical services with advanced technology and compassionate care.
            </p>
            <div className="flex gap-4">
              {[LuFacebook, LuInstagram, LuTwitter, LuLinkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              {['About Us', 'Our Doctors', 'Service Locations', 'Contact Us'].map(item => (
                <li key={item}><a href="#" className="hover:text-blue-600 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 uppercase text-xs tracking-widest">Services</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              {['Cardiology', 'Neurolody', 'Urology', 'Orthopedics'].map(item => (
                <li key={item}><a href="#" className="hover:text-blue-600 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 uppercase text-xs tracking-widest">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-6">Stay updated with our latest medical tips and news.</p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 flex pl-10 pr-4 outline-none! focus:border-blue-200 transition-colors font-medium text-sm"
              />
              <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <button className="mt-4 w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2026 Doccure. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Use</a>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default HomeDemo;
