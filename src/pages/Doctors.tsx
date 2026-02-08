import { useState } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { LuSearch, LuMapPin, LuDollarSign, LuStar, LuChevronRight } from 'react-icons/lu';

const doctors = [
    { id: 1, name: 'Dr. Ruby Angel', spec: 'Cardiology', loc: 'Florida, USA', price: '300-1000', rating: '4.5', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-01.jpg' },
    { id: 2, name: 'Dr. Darren Elder', spec: 'Neurology', loc: 'Newyork, USA', price: '50-300', rating: '4.0', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-02.jpg' },
    { id: 3, name: 'Dr. Deborah Angel', spec: 'Cardiology', loc: 'Georgia, USA', price: '100-400', rating: '4.5', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-03.jpg' },
    { id: 4, name: 'Dr. Sofia Brient', spec: 'Urology', loc: 'Louisiana, USA', price: '150-250', rating: '4.5', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-04.jpg' },
    { id: 5, name: 'Dr. Marvin Campbell', spec: 'Ophthalmology', loc: 'Michigan, USA', price: '100-200', rating: '4.0', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-05.jpg' },
    { id: 6, name: 'Dr. Katherine Berthold', spec: 'Orthopedic', loc: 'Texas, USA', price: '200-500', rating: '4.5', img: 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-06.jpg' },
];

const Doctors = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.spec.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-slate-50 min-h-screen font-['Inter',sans-serif]">
            <div className="bg-[#2083FF] pb-24">
                <Header />
                <div className="max-w-7xl mx-auto px-6 py-12 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Doctors</h1>
                    <p className="text-blue-100 text-lg opacity-80">Find and book appointments with our expert medical team.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-12">
                {/* Search Bar */}
                <div className="bg-white rounded-3xl p-4 shadow-2xl shadow-blue-100 flex items-center gap-4 mb-12">
                    <LuSearch className="text-slate-400 ml-4" size={24} />
                    <input
                        type="text"
                        placeholder="Search doctors by name or speciality..."
                        className="flex-1 py-4 text-lg outline-none text-slate-700 font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Doctor Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {filteredDoctors.map((doc, idx) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col group"
                        >
                            <div className="relative overflow-hidden">
                                <img src={doc.img} alt={doc.name} className="w-full aspect-square object-cover" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Available</span>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center gap-1 mb-2">
                                    <LuStar size={14} className="text-yellow-400 fill-current" />
                                    <span className="text-xs font-bold text-slate-700">{doc.rating}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{doc.name}</h3>
                                <p className="text-blue-500 text-sm font-bold mb-6">{doc.spec}</p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <LuMapPin size={18} className="text-slate-300" />
                                        <span className="text-sm font-medium">{doc.loc}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <LuDollarSign size={18} className="text-slate-300" />
                                        <span className="text-sm font-bold text-slate-900">${doc.price}</span>
                                    </div>
                                </div>

                                <button className="mt-auto w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                                    View Profile <LuChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
