import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Logo/Names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="w-8 h-8 text-warm-300" />
              <h3 className="font-script text-4xl text-white">{t('footer.couple')}</h3>
              <Heart className="w-8 h-8 text-warm-300" />
            </div>
            <p className="text-gray-300 text-lg">{t('footer.date')}</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center space-x-6 mb-8"
          >
            {[
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Twitter, href: '#', label: 'Twitter' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-amber-500 hover:text-white transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8"
          >
            <a
              href="tel:+60193322258"
              className="flex items-center space-x-2 text-gray-300 hover:text-warm-300 transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>019 3322258</span>
            </a>
            <a
              href="mailto:hafizizaironi@gmail.com"
              className="flex items-center space-x-2 text-gray-300 hover:text-warm-300 transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>hafizizaironi@gmail.com 💻</span>
            </a>
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <p className="text-gray-300 text-lg italic leading-relaxed">
              "{t('footer.tagline')}"
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
          />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-gray-400 text-sm"
          >
            <p>© {currentYear} El & Husni Wedding. Made with love.</p>
          </motion.div>
        </div>
      </div>

      {/* Floating Hearts */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-10 w-4 h-4 text-warm-300 opacity-30 hidden lg:block"
      >
        <Heart className="w-full h-full fill-current" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute top-20 right-20 w-6 h-6 text-warm-300 opacity-20 hidden lg:block"
      >
        <Heart className="w-full h-full fill-current" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        className="absolute bottom-10 left-1/4 w-3 h-3 text-warm-300 opacity-40 hidden lg:block"
      >
        <Heart className="w-full h-full fill-current" />
      </motion.div>
    </footer>
  );
}
