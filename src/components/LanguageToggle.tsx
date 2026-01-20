import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ms' : 'en');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-4 right-4 z-[60] bg-white/95 backdrop-blur-lg border border-warm-200 rounded-full shadow-xl p-3 hover:bg-warm-50 transition-all duration-300 cursor-pointer"
      title={language === 'en' ? 'Switch to Bahasa Melayu' : 'Tukar ke Bahasa Inggeris'}
      style={{ 
        position: 'fixed', 
        top: '1rem', 
        right: '1rem', 
        zIndex: 60,
        pointerEvents: 'auto'
      }}
    >
      <div className="flex items-center space-x-2">
        <Languages className="w-5 h-5 text-warm-400" />
        <span className="text-sm font-medium text-warm-500">
          {language === 'en' ? 'BM' : 'EN'}
        </span>
      </div>
    </motion.button>
  );
}
