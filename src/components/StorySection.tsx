import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Star, Calendar } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2019',
    title: 'First Meeting',
    description: 'We met at a coffee shop on a rainy Tuesday. Who knew that umbrella sharing would lead to love?',
    icon: <Star className="w-6 h-6" />,
  },
  {
    year: '2020',
    title: 'First Date',
    description: 'Our first official date at the local art gallery. We spent hours talking about everything and nothing.',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    year: '2022',
    title: 'Moving In',
    description: 'We decided to take the next step and move in together. Best decision we ever made!',
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    year: '2023',
    title: 'The Proposal',
    description: 'During a sunset hike at our favorite trail, the question was finally popped. She said yes!',
    icon: <Heart className="w-6 h-6" />,
  },
];

export default function StorySection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="story"
      ref={ref}
      className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-sky-100 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-sky-200 to-blue-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-sky-300 rounded-full blur-3xl" />
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
            Our Love Story
          </h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mb-8"
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every love story is beautiful, but ours is our favorite. Here's how two hearts
            found their way to each other and decided to become one.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-sky-200 via-sky-400 to-sky-200 hidden lg:block" />

          <div className="space-y-16 lg:space-y-24">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white to-cream-50 p-8 rounded-2xl shadow-lg border border-cream-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white mr-4">
                        {event.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-sky-600 font-serif">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    className="w-6 h-6 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full border-4 border-white shadow-lg"
                  />
                </div>

                {/* Mobile Timeline Indicator */}
                <div className="lg:hidden absolute left-0 top-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    className="w-4 h-4 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20 lg:mt-32"
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-light text-gray-700 italic mb-6 leading-relaxed">
              "Love is not about how many days, months, or years you have been together. 
              It's about how much you love each other every single day."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <Heart className="w-6 h-6 text-sky-500" />
              <span className="text-lg text-gray-600 font-medium">El & Husni</span>
              <Heart className="w-6 h-6 text-sky-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
