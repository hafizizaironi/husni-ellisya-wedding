import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '../contexts/LanguageContext';
import { submitRSVP, type RSVPFormData } from '../lib/rsvpService';
import { 
  Send, 
  Check, 
  Heart, 
  User, 
  Users,
  MessageSquare
} from 'lucide-react';

const rsvpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  attendance: z.enum(['yes', 'no']),
  guests: z.number().min(1).max(5, 'Maximum 5 guests allowed'),
  message: z.string().optional(),
});

// type RSVPFormData = z.infer<typeof rsvpSchema>;

export default function RSVPSection() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guests: 1,
    },
  });

  const watchAttendance = watch('attendance');

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Submit to Firebase Firestore
      const docId = await submitRSVP(data);
      console.log('RSVP submitted successfully with ID:', docId);
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    reset();
  };

  return (
    <section
      id="rsvp"
      ref={ref}
      className="py-20 lg:py-32 bg-gradient-to-br from-warm-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-warm-200 to-warm-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-warm-100 to-warm-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-5xl lg:text-6xl text-gray-800 mb-6">
            {t('rsvp.title')}
          </h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
                className="w-24 h-px bg-gradient-to-r from-transparent via-warm-300 to-transparent mx-auto mb-8"
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('rsvp.subtitle')}
          </p>
        </motion.div>

        {/* RSVP Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-warm-200"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Error Display */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{submitError}</p>
                    </div>
                    <div className="ml-auto pl-3">
                      <button
                        type="button"
                        onClick={() => setSubmitError(null)}
                        className="inline-flex text-red-400 hover:text-red-600"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Personal Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  {t('rsvp.name.label')} *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
                  placeholder={t('rsvp.name.placeholder')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Attendance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  {t('rsvp.attendance.label')} *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                        className={`relative cursor-pointer p-4 border-2 rounded-lg transition-all duration-200 ${
                          watchAttendance === 'yes'
                            ? 'border-warm-400 bg-warm-50'
                            : 'border-gray-300 hover:border-warm-300'
                        }`}
                  >
                    <input
                      {...register('attendance')}
                      type="radio"
                      value="yes"
                      className="sr-only"
                    />
                        <div className="flex items-center justify-center space-x-3">
                          <Heart className="w-6 h-6 text-warm-400" />
                      <span className="font-medium text-gray-800">
                        {t('rsvp.attendance.yes')}
                      </span>
                    </div>
                  </motion.label>

                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer p-4 border-2 rounded-lg transition-all duration-200 ${
                      watchAttendance === 'no'
                        ? 'border-gray-500 bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      {...register('attendance')}
                      type="radio"
                      value="no"
                      className="sr-only"
                    />
                    <div className="flex items-center justify-center space-x-3">
                      <span className="font-medium text-gray-800">
                        {t('rsvp.attendance.no')}
                      </span>
                    </div>
                  </motion.label>
                </div>
                {errors.attendance && (
                  <p className="mt-2 text-sm text-red-600">{errors.attendance.message}</p>
                )}
              </div>

              {/* Conditional fields for attending guests */}
              {watchAttendance === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      {t('rsvp.guests.label')} *
                    </label>
                    <select
                      {...register('guests', { valueAsNumber: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                    {errors.guests && (
                      <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
                    )}
                  </div>

                </motion.div>
              )}

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  {t('rsvp.message.label')}
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder={t('rsvp.message.placeholder')}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-warm-300 to-warm-400 text-white py-4 px-8 rounded-lg font-medium text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('rsvp.submitting')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t('rsvp.submit')}</span>
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            /* Success Message */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">
                {t('rsvp.success.title')}
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('rsvp.success.message')}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                    className="border-2 border-warm-300 text-warm-500 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-warm-50"
              >
                {t('rsvp.success.another')}
              </motion.button>
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
