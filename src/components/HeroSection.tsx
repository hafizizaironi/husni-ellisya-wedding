import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CalendarPlus, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your wedding date here
  const weddingDate = new Date('2025-11-09T11:00:00'); // November 9th, 2025

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);


  return (
        <section
          id="hero"
          className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-warm-50 to-warm-100"
        >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/assets/pdflower11batch5-ning-08f.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply'
        }}></div>
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #DCC5B2 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #D9A299 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Centered Content - Full Height */}
      <div className="absolute inset-0 flex flex-col justify-between z-10" style={{ paddingTop: '8vh', paddingBottom: '6rem' }}>
        <div className="text-center px-4 sm:px-6 lg:px-8 flex-shrink-0">
          {/* Bismillah - Islamic Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            className="mb-6"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl text-gray-700 leading-tight"
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </motion.h2>
          </motion.div>

          {/* Names - Main Focus */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.25, ease: "easeOut" }}
            className="mb-6"
          >
                <h1 className="font-script text-7xl sm:text-9xl lg:text-10xl xl:text-11xl text-gray-800 mb-6 leading-tight">
                  Husni & Ellisya
                </h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.0, delay: 2.1, ease: "easeOut" }}
                  className="w-32 h-px bg-gradient-to-r from-transparent via-warm-300 to-transparent mx-auto"
            />
          </motion.div>

          {/* Wedding Date - Elegant subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.75, ease: "easeOut" }}
            className="mb-4"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span className="text-lg font-medium">{t('hero.date')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-medium text-center">{t('hero.venue')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Countdown & CTA */}
        <div className="text-center px-4 sm:px-6 lg:px-8 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.25, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
              {[
                { label: t('hero.countdown.days'), value: timeLeft.days },
                { label: t('hero.countdown.hours'), value: timeLeft.hours },
                { label: t('hero.countdown.minutes'), value: timeLeft.minutes },
                { label: t('hero.countdown.seconds'), value: timeLeft.seconds },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.5 + index * 0.1, ease: "easeOut" }}
                  className="text-center"
                >
                      <div className="bg-warm-50/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-warm-200/50">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.1, ease: "easeOut" }}
            className="space-y-4"
          >
            <button
              onClick={() => {
                const rsvpSection = document.getElementById('rsvp');
                if (rsvpSection) {
                  const offsetTop = rsvpSection.offsetTop - 80;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                  });
                }
              }}
                  className="bg-gradient-to-r from-warm-300 to-warm-400 text-white px-10 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-warm-400 hover:to-warm-500 block mx-auto"
                >
                  {t('hero.rsvp_now')}
                </button>

            {/* Calendar Reminder Buttons */}
            <div className="flex flex-row gap-2 justify-center items-center mt-4">
              <motion.a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Husni%20%26%20Ellisya%27s%20Wedding&dates=20251109T040000Z/20251109T090000Z&details=Join%20us%20for%20Husni%20%26%20Ellisya%27s%20wedding%20celebration%20at%20Dar%20Al%20Fatiah%20Homestay&location=Dar%20Al%20Fatiah%20Homestay%2C%20Golf%20Resort%2C%2012a%2C%20Jalan%20Ros%2C%20Bandar%20Bukit%20Beruntung%2C%2048300%20Rawang%2C%20Selangor"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-4 py-2 bg-white text-warm-400 border border-warm-200 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:bg-warm-50 hover:border-warm-300 shadow-md hover:shadow-lg"
              >
                <CalendarPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{t('hero.add_google_calendar')}</span>
                <span className="sm:hidden">{t('hero.google_calendar')}</span>
              </motion.a>
              
              <motion.button
                onClick={() => {
                  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Wedding//EN
BEGIN:VEVENT
UID:husni-ellisya-wedding@wedding.com
DTSTAMP:20241001T000000Z
DTSTART:20251109T040000Z
DTEND:20251109T090000Z
SUMMARY:Husni & Ellisya's Wedding
DESCRIPTION:Join us for Husni & Ellisya's wedding celebration at Dar Al Fatiah Homestay
LOCATION:Dar Al Fatiah Homestay, Golf Resort, 12a, Jalan Ros, Bandar Bukit Beruntung, 48300 Rawang, Selangor
END:VEVENT
END:VCALENDAR`;
                  
                  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'husni-ellisya-wedding.ics';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-warm-200 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:bg-warm-50 hover:border-warm-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{t('hero.add_iphone_calendar')}</span>
                <span className="sm:hidden">{t('hero.iphone_calendar')}</span>
              </motion.button>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center mt-2">
              {t('hero.save_date')}
            </p>
          </motion.div>
          </div>
        </div>
      </div>


      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-warm-200 rounded-full opacity-60 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute top-1/3 right-1/4 w-6 h-6 bg-warm-300 rounded-full opacity-40 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/3 left-1/6 w-3 h-3 bg-warm-200 rounded-full opacity-50 hidden lg:block"
      />
    </section>
  );
}
