import { logo_dark } from '@/assets/logos';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ theme = "light" }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo_dark}
          alt="Doccure"
          className="h-16"
        />
      </Link>

      {/* Navigation */}
      <div className={`hidden ${theme === "dark" ? "lg:text-white" : "lg:text-slate-700"} lg:flex items-center gap-8 text-[15px] font-semibold`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="hover:text-blue-600 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {/* <Link to="/login" className="text-[15px] font-bold text-slate-700 hover:text-blue-600">Login</Link> */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="bg-blue-800 text-white px-8 py-3 rounded-2xl text-[15px] font-bold shadow-lg "
        >
          Login
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/register')}
          className="bg-white text-[#2083FF] px-8 py-3 rounded-2xl text-[15px] font-bold shadow-lg "
        >
          Register
        </motion.button>
      </div>
    </div>
  );
};

export default Header;

