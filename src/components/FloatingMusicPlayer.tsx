import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = 0.3;
    audio.loop = true;

    // Add event listeners for audio state changes
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Pause music when page becomes hidden or loses focus (mobile app switching)
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        audio.pause();
      }
    };

    const handlePageHide = () => {
      if (isPlaying) {
        audio.pause();
      }
    };

    const handleBlur = () => {
      if (isPlaying) {
        audio.pause();
      }
    };

    // Add event listeners for page visibility and focus changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('blur', handleBlur);

    // Auto-play after user interaction (modern browsers require user interaction)
    // Only auto-play once and only if user hasn't manually interacted with the music button
    const handleFirstInteraction = (event: Event) => {
      console.log('First interaction detected:', event.type);
      if (!isPlaying && !hasUserInteracted) {
        console.log('Attempting to play music...');
        audio.play().then(() => {
          console.log('Music started successfully');
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Auto-play prevented:', error);
        });
      }
      // Remove the event listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    // Add event listeners for first user interaction (including scroll for first-time auto-play)
    if (!hasUserInteracted) {
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('keydown', handleFirstInteraction);
      document.addEventListener('scroll', handleFirstInteraction, { passive: true });
      document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying, hasUserInteracted]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Mark that user has manually interacted with the music button
    setHasUserInteracted(true);

    if (isPlaying) {
      audio.pause();
      // State will be updated by the 'pause' event listener
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      // State will be updated by the 'play' event listener
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        preload="auto"
        src="/assets/Anugerah Terindah - Andmesh (Saxophone Cover by Dori Wirawan).mp3"
      />

      {/* Floating Music Player */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="fixed bottom-6 right-6 z-40"
      >
        {/* Single Music Toggle Button */}
        <motion.button
          onClick={toggleMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 bg-gradient-to-br from-warm-300 to-warm-400 hover:from-warm-400 hover:to-warm-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group"
          title={isPlaying ? 'Turn off music' : 'Turn on music'}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Volume2 className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div
                key="stopped"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <VolumeX className="w-8 h-8" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Ripple Effect */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.button>

        {/* Song Info Tooltip */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg shadow-xl border border-warm-200/50 whitespace-nowrap"
            >
              <div className="text-sm font-medium">Anugerah Terindah</div>
              <div className="text-xs text-gray-600">Andmesh (Saxophone Cover)</div>
              
              {/* Arrow pointing to button */}
              <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
                <div className="w-0 h-0 border-l-8 border-l-white/95 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
