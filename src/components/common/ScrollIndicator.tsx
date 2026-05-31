import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScrollEvent = () => {
      // Hide the indicator if we've scrolled down more than a bit
      if (window.scrollY > 10) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  const handleScroll = () => {
    const nextSection = document.getElementById('experience');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-50 hover:-translate-y-1 transition-transform duration-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 0.8 } }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
          onClick={handleScroll}
          aria-label="Scroll down to Experience section"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/60 group-hover:text-primary transition-colors duration-300">
            Scroll Down
          </span>
          <div className="w-[26px] h-[42px] rounded-full border-2 border-muted-foreground/30 group-hover:border-primary/50 flex justify-center p-1.5 transition-colors duration-300">
            <motion.div
              className="w-1 h-2 bg-muted-foreground/60 group-hover:bg-primary rounded-full"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
