import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, MessageCircle, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllRSVPs } from '../lib/rsvpService';

// Message interface for display
interface MessageDisplay {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar: string;
}

// Helper function to format timestamp
const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

// Helper function to get avatar from name
const getAvatar = (name: string): string => {
  return name.charAt(0).toUpperCase();
};

export default function MessagesSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [messages, setMessages] = useState<MessageDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch messages from Firebase
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const rsvps = await getAllRSVPs();
        
        // Filter RSVPs that have messages and convert to MessageDisplay format
        const messagesWithContent = rsvps
          .filter(rsvp => rsvp.message && rsvp.message.trim().length > 0)
          .map(rsvp => ({
            id: rsvp.id,
            name: rsvp.name,
            message: rsvp.message!,
            timestamp: formatTimestamp(rsvp.timestamp.toDate()),
            avatar: getAvatar(rsvp.name)
          }))
          .sort((a, b) => b.timestamp.localeCompare(a.timestamp)); // Sort by most recent
        
        setMessages(messagesWithContent);
        setError(null);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <section
      id="messages"
      ref={ref}
      className="py-20 lg:py-32 bg-gradient-to-br from-warm-50 to-warm-100 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-br from-warm-200 to-warm-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-br from-warm-100 to-warm-200 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-warm-100 to-warm-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
              <div className="flex justify-center items-center space-x-3 mb-6">
                <Heart className="w-8 h-8 text-warm-400" />
                <MessageCircle className="w-10 h-10 text-warm-500" />
                <Heart className="w-8 h-8 text-warm-400" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-serif font-bold text-gray-800 mb-6">
            {t('messages.title')}
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm-300 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('messages.subtitle')}
          </p>
        </motion.div>

            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg border border-warm-200">
                  <svg className="animate-spin h-5 w-5 text-warm-400 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-gray-700 font-medium">{t('messages.loading')}</span>
                </div>
              </motion.div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                  <MessageCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-red-800 mb-2">{t('messages.error')}</h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </motion.div>
            )}

            {/* No Messages State */}
            {!loading && !error && messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="bg-warm-50 border border-warm-200 rounded-2xl p-8 max-w-md mx-auto">
                  <Heart className="w-12 h-12 text-warm-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('messages.no_messages.title')}</h3>
                  <p className="text-gray-600">{t('messages.no_messages.description')}</p>
                </div>
              </motion.div>
            )}

            {/* Desktop Grid View */}
            {!loading && !error && messages.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    variants={cardVariants}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className={`relative ${
                      index % 3 === 0 ? 'lg:mt-0' : 
                      index % 3 === 1 ? 'lg:mt-8' : 'lg:mt-4'
                    }`}
                  >
                    <MessageCard message={message} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Mobile Swipeable Carousel */}
            {!loading && !error && messages.length > 0 && (
              <div className="md:hidden relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative overflow-hidden"
                >
                  {/* Cards Container */}
                  <div className="relative h-80 mx-4">
                    {messages.map((message, index) => {
                      const isActive = index === currentIndex;
                      const isPrev = index === (currentIndex - 1 + messages.length) % messages.length;
                      const isNext = index === (currentIndex + 1) % messages.length;
                
                let translateX = '100%';
                let scale = 0.8;
                let zIndex = 1;
                let opacity = 0;

                if (isActive) {
                  translateX = '0%';
                  scale = 1;
                  zIndex = 3;
                  opacity = 1;
                } else if (isPrev) {
                  translateX = '-20%';
                  scale = 0.9;
                  zIndex = 2;
                  opacity = 0.7;
                } else if (isNext) {
                  translateX = '20%';
                  scale = 0.9;
                  zIndex = 2;
                  opacity = 0.7;
                }

                return (
                  <motion.div
                    key={message.id}
                    className="absolute inset-0"
                    animate={{
                      x: translateX,
                      scale: scale,
                      zIndex: zIndex,
                      opacity: opacity
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 100) {
                        prevCard();
                      } else if (info.offset.x < -100) {
                        nextCard();
                      }
                    }}
                  >
                    <MessageCard message={message} />
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={prevCard}
                className="w-12 h-12 bg-white rounded-full shadow-lg border border-warm-200 flex items-center justify-center text-warm-400 hover:bg-warm-50 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
                  {/* Dots Indicator */}
                  <div className="flex space-x-2">
                    {messages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex 
                        ? 'bg-warm-400 w-6' 
                        : 'bg-warm-200 hover:bg-warm-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextCard}
                className="w-12 h-12 bg-white rounded-full shadow-lg border border-warm-200 flex items-center justify-center text-warm-400 hover:bg-warm-50 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Swipe Hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="text-center text-sm text-gray-500 mt-4"
            >
              {t('messages.swipe_hint')}
            </motion.p>
          </motion.div>
        </div>
            )}

            {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-sky-200/50 max-w-2xl mx-auto">
            <User className="w-12 h-12 text-sky-500 mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">
              {t('messages.cta.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('messages.cta.description')}
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Reusable Message Card Component
function MessageCard({ message }: { message: MessageDisplay }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-warm-200/50 hover:shadow-2xl transition-all duration-300 h-full">
      {/* Message Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-warm-300 to-warm-400 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
          {message.avatar}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-lg">
            {message.name}
          </h4>
          <p className="text-sm text-gray-500">
            {message.timestamp}
          </p>
        </div>
      </div>

      {/* Message Content */}
      <div className="relative">
        <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
          "{message.message}"
        </p>
        
        {/* Decorative Quote Mark */}
        <div className="absolute -top-2 -left-2 text-warm-200 text-4xl font-serif leading-none">
          "
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex justify-end">
        <Heart className="w-5 h-5 text-warm-400 opacity-60" />
      </div>

      {/* Card Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-warm-300 via-warm-400 to-warm-300 rounded-b-2xl"></div>
    </div>
  );
}
