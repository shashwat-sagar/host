import { FaStar } from "react-icons/fa";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import { bannerDoc } from "@/assets/logos";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#2083FF]">
      <Header />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-blue-400/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* LEFT CONTENT */}
        <div className="text-white space-y-8 z-10">
          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${30 + i}.jpg`}
                  alt=""
                />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold">5K+ Appointments</span>
              <div className="flex items-center gap-1">
                {Array(5).fill(0).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-[10px]" />
                ))}
                <span className="text-[10px] text-white/80 font-medium ml-1">5.0 Ratings</span>
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15]"
          >
            Discover Health: <br />
            <span className="text-blue-100">Find Your Trusted</span> <br />
            Doctors Today
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-center gap-2 max-w-2xl shadow-2xl"
          >
            <div className="flex-[0.8] w-full px-4 border-b md:border-b-0 md:border-r border-slate-100">
              <select
                title="Select Specialty"
                className="w-full py-3 bg-transparent text-slate-700 outline-none font-semibold text-[14px] appearance-none"
              >
                <option value="">Select Specialty</option>
                <option>Cardiology</option>
                <option>Orthopedics</option>
                <option>Neurology</option>
              </select>
            </div>

            <div className="flex-1 w-full px-4">
              <input
                type="text"
                placeholder="Search for medical procedures, hospitals"
                className="w-full py-3 outline-none text-slate-600 text-[14px]"
              />
            </div>

            <button className="bg-[#2083FF] hover:bg-blue-600 text-white px-10 py-4 rounded-full transition-all font-bold text-[16px] w-full md:w-auto shadow-lg shadow-blue-200">
              Search
            </button>
          </motion.div>
        </div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:relative lg:flex lg:justify-center lg:justify-end"
        >
          <div className="absolute inset-0 bg-linear-to-t from-blue-600/20 to-transparent rounded-full blur-3xl" />
          <img
            // src="https://doccure.dreamstechnologies.com/html/template/assets/img/banner/banner-img.png"
            src={bannerDoc}
            alt="Doctor"
            className="absolute -bottom-80 right-0 z-10 w-full max-w-[400px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

