import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'nav.home', href: '#hero' },
  { id: 'details', label: 'nav.details', href: '#details' },
  { id: 'rsvp', label: 'nav.rsvp', href: '#rsvp' },
];

export default function FloatingNav() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false); // Hidden initially

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling down a bit
      setIsVisible(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center" style={{ position: 'fixed', top: '2rem', left: 0, right: 0, zIndex: 50 }}>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-auto"
      >
          <div className="bg-warm-50/90 backdrop-blur-lg border border-warm-200 rounded-full shadow-xl px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 mx-2" style={{ backgroundColor: 'rgba(250, 247, 243, 0.95)' }}>
        <div className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.href)}
              className={`relative px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                activeSection === item.id
                    ? 'text-white bg-gradient-to-r from-warm-300 to-warm-400 shadow-lg shadow-warm-200'
                    : 'text-warm-500 hover:text-warm-400 hover:bg-warm-100/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                  <span className="hidden sm:inline">{t(item.label)}</span>
                  <span className="sm:hidden text-xs">
                    {item.id === 'hero' ? t('nav.home.mobile') :
                     item.id === 'details' ? t('nav.details.mobile') :
                     t('nav.rsvp.mobile')}
                  </span>
            </motion.button>
          ))}
        </div>
      </div>
      </motion.nav>
    </div>
  );
}
