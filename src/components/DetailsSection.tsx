import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  Users,
  BookOpen,
  Camera,
  Utensils,
  Heart,
  Sparkles
} from 'lucide-react';

interface EventDetail {
  icon: React.ReactNode;
  title: string;
  description: string;
  time?: string;
  location?: string;
  address?: string;
}



export default function DetailsSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const ceremonyDetails: EventDetail = {
    icon: <Calendar className="w-8 h-8" />,
    title: t('details.ceremony.title'),
    description: t('details.ceremony.description'),
    time: t('details.ceremony.time'),
    location: t('details.ceremony.location'),
    address: t('details.ceremony.address'),
  };

  const receptionDetails: EventDetail = {
    icon: <Users className="w-8 h-8" />,
    title: t('details.reception.title'),
    description: t('details.reception.description'),
    time: t('details.reception.time'),
    location: t('details.reception.location'),
    address: t('details.reception.address'),
  };

  const scheduleItems = [
    { time: '10:30 AM', event: t('details.schedule.10_30'), icon: <Users className="w-5 h-5" />, color: 'from-warm-200 to-warm-300' },
    { time: '11:00 AM', event: t('details.schedule.11_00'), icon: <Heart className="w-5 h-5" />, color: 'from-warm-300 to-warm-400' },
    { time: '12:00 PM', event: t('details.schedule.12_00'), icon: <Sparkles className="w-5 h-5" />, color: 'from-warm-400 to-warm-500', highlight: true },
    { time: '12:30 PM', event: t('details.schedule.12_30'), icon: <Camera className="w-5 h-5" />, color: 'from-warm-200 to-warm-400' },
    { time: '1:00 PM', event: t('details.schedule.13_00'), icon: <Utensils className="w-5 h-5" />, color: 'from-warm-300 to-warm-400' },
    { time: '4:00 PM', event: t('details.schedule.16_00'), icon: <Heart className="w-5 h-5" />, color: 'from-warm-300 to-warm-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="details"
      ref={ref}
      className="py-20 lg:py-32 bg-gradient-to-br from-warm-50 to-warm-100 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-warm-200 to-warm-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-warm-100 to-warm-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-5xl lg:text-6xl text-gray-800 mb-6">
            {t('details.title')}
          </h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mb-8"
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('details.subtitle')}
          </p>
        </motion.div>

        {/* Main Event Details */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20"
        >
          {/* Ceremony */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-warm-200">
              <div className="w-16 h-16 bg-gradient-to-br from-warm-300 to-warm-400 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                {ceremonyDetails.icon}
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">
                {ceremonyDetails.title}
              </h3>
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-warm-400 mr-2" />
                <span className="text-lg font-medium text-gray-700">
                  {ceremonyDetails.time}
                </span>
              </div>
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-warm-400 mr-2" />
                <span className="text-gray-600">{ceremonyDetails.location}</span>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {ceremonyDetails.description}
              </p>
              <p className="text-sm text-gray-500">{ceremonyDetails.address}</p>
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-warm-200">
              <div className="w-16 h-16 bg-gradient-to-br from-warm-300 to-warm-400 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                {receptionDetails.icon}
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">
                {receptionDetails.title}
              </h3>
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-warm-400 mr-2" />
                <span className="text-lg font-medium text-gray-700">
                  {receptionDetails.time}
                </span>
              </div>
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-warm-400 mr-2" />
                <span className="text-gray-600">{receptionDetails.location}</span>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {receptionDetails.description}
              </p>
              <p className="text-sm text-gray-500">{receptionDetails.address}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Creative Schedule Timeline */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
              {t('details.schedule.title')}
            </h3>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-warm-300 to-transparent mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('details.schedule.subtitle')}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Mobile Timeline */}
            <div className="md:hidden space-y-6">
              {scheduleItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl p-6 shadow-xl border-l-4 ${
                    item.highlight ? 'border-warm-300 bg-gradient-to-r from-warm-50 to-white' : 'border-warm-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-bold mb-1 ${item.highlight ? 'text-warm-400' : 'text-warm-400'}`}>
                        {item.time}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 leading-tight">
                        {item.event}
                      </h4>
                    </div>
                  </div>
                  {item.highlight && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-warm-300 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Desktop Creative Layout */}
            <div className="hidden md:block relative">
              {/* Central Timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-warm-200 via-warm-300 to-warm-200 rounded-full"></div>
              
              <div className="space-y-16">
                {scheduleItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={`relative bg-white rounded-2xl p-8 shadow-xl border-2 ${
                          item.highlight 
                            ? 'border-warm-300 bg-gradient-to-br from-warm-50 to-white' 
                            : 'border-warm-200 hover:border-warm-300'
                        } transition-all duration-300`}
                      >
                        {/* Highlight Badge */}
                        {item.highlight && (
                          <div className="absolute -top-3 -right-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-warm-300 to-warm-400 rounded-full flex items-center justify-center shadow-lg">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                        
                        <div className={`flex items-center space-x-4 mb-4 ${index % 2 === 0 ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                            {item.icon}
                          </div>
                          <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                            <div className={`text-lg font-bold mb-1 ${item.highlight ? 'text-warm-400' : 'text-warm-400'}`}>
                              {item.time}
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 leading-tight">
                              {item.event}
                            </h4>
                          </div>
                        </div>
                        
                        {/* Connector Line */}
                        <div className={`absolute top-1/2 transform -translate-y-1/2 w-12 h-px bg-gradient-to-r ${
                          index % 2 === 0 
                            ? 'right-0 translate-x-full from-warm-300 to-transparent' 
                            : 'left-0 -translate-x-full from-transparent to-warm-300'
                        }`}></div>
                      </motion.div>
                    </div>
                    
                    {/* Central Timeline Dot */}
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br ${item.color} rounded-full border-4 border-white shadow-lg z-10`}></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-semibold text-gray-800 mb-4">
              {t('details.location.title')}
            </h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('details.location.subtitle')}
            </p>
          </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-warm-200/50">
            {/* Map Container */}
            <div className="relative h-96 bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.6493083048567!2d101.5506984752651!3d3.4352296513268805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc6f8954ca352f%3A0x23eb9402173d1d5a!2sDar%20Al%20Fatiah%20Homestay!5e0!3m2!1sen!2smy!4v1759304401133!5m2!1sen!2smy"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Location - Dar Al Fatiah Homestay"
                className="w-full h-full"
              ></iframe>
            </div>
            
            {/* Location Details */}
                <div className="p-6 bg-gradient-to-br from-warm-50 to-warm-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    Dar Al Fatiah Homestay
                  </h4>
                  <div className="flex items-start space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-warm-400 mt-0.5 flex-shrink-0" />
                    <span>Golf Resort, 12a, Jalan Ros, Bandar Bukit Beruntung, 48300 Rawang, Selangor</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://www.google.com/maps/search/Dar+Al+Fatiah+Homestay+Golf+Resort+12a+Jalan+Ros+Bandar+Bukit+Beruntung+48300+Rawang+Selangor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-warm-300 to-warm-400 text-white rounded-lg hover:from-warm-400 hover:to-warm-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {t('details.location.google_maps')}
                  </a>
                  <a
                    href="http://maps.apple.com/?q=Dar%20Al%20Fatiah%20Homestay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {t('details.location.apple_maps')}
                  </a>
                  <a
                    href="https://waze.com/ul?q=Dar%20Al%20Fatiah%20Homestay&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-white text-warm-400 border border-warm-200 rounded-lg hover:bg-warm-50 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Car className="w-4 h-4 mr-2" />
                    {t('details.location.waze')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quranic Verse */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 bg-gradient-to-br from-warm-50 to-warm-100 rounded-2xl p-8 lg:p-12 shadow-xl border border-warm-200/50 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-warm-100 rounded-tl-2xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-warm-100 rounded-br-2xl opacity-30"></div>
          
          <div className="flex justify-center mb-6">
            <BookOpen className="w-12 h-12 text-warm-400" />
          </div>
          
          <h3 className="text-2xl lg:text-3xl font-serif font-semibold text-gray-800 mb-6">
            {t('details.quran.title')}
          </h3>
          
          {/* Arabic Text */}
          <div className="mb-8">
            <p className="text-xl lg:text-2xl font-serif text-gray-800 leading-relaxed mb-4" style={{ fontFamily: 'Amiri, serif', direction: 'rtl' }}>
              {t('details.quran.arabic')}
            </p>
            <p className="text-sm text-warm-400 font-medium">
              {t('details.quran.reference')}
            </p>
          </div>
          
          {/* Translation */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed italic">
              "{t('details.quran.translation')}"
            </p>
          </div>
          
          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-warm-300 via-warm-400 to-warm-300 rounded-b-2xl"></div>
        </motion.div>
      </div>
    </section>
  );
}
