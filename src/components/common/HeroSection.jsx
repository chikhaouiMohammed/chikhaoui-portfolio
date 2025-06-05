'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      ease: 'easeOut',
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: 'easeOut', duration: 0.6 },
  },
};

const HeroSection = ({ t }) => {
  // Social media data with proper href included
  const socialMedia = [
    { 
      src: '/images/img_icon_ionicons_logos_logofacebook.svg', 
      alt: 'Facebook', 
      href: 'https://www.facebook.com/chikhaoui.mohammed.530030' 
    },
    { 
      src: '/images/img_icon_jamicons_outline_logos_instagram.svg', 
      alt: 'Instagram', 
      href: 'https://www.instagram.com/chm4ms/' 
    },
    { 
      src: '/images/img_icon_custom_xtwitter.svg', 
      alt: 'Twitter', 
      href: 'https://x.com/Chikhaoui_Moh' 
    },
    { 
      src: '/images/img_icon_ionicons_logos_logolinkedin.svg', 
      alt: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/chikhaoui-mohammed-mostafa-790485339/' 
    },
  ];

  const handleViewWork = () => {
    // Changed from '#projects' to '#work'
    document.querySelector('#work')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'  // Ensures proper alignment at top of viewport
    });
  };

  const handleWorkTogether = () => {
    document.querySelector('#contact')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'  // Ensures proper alignment at top of viewport
    });
  };

  return (
    <section className="bg-[#FFFFF0] py-16">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image on top for mobile */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:order-2"
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/images/myPictures/herosection.png"
              alt={t.hero.imageAlt}
              width={397}
              height={601}
              className="rounded-lg shadow-md w-full max-w-[397px]"
            />
          </motion.div>

          {/* Text on left (or below on mobile) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-4"
            >
              {t.hero.heading}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 max-w-lg"
            >
              {t.hero.subtext}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col lg:flex-row gap-4 mb-6 justify-center lg:justify-start w-full max-w-xs sm:max-w-md lg:max-w-none"
            >
              {/* Primary Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full lg:w-auto">
                <Button
                  onClick={handleViewWork}
                  className="
                    h-[47px]
                    px-6
                    text-base
                    font-semibold
                    bg-[#131112]
                    text-white
                    rounded-full
                    shadow-lg
                    transition
                    duration-300
                    ease-out
                    flex
                    items-center
                    justify-center
                    w-full
                    lg:w-auto
                  "
                >
                  {t.hero.viewWorkButton}
                </Button>
              </motion.div>

              {/* Outline Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full lg:w-auto">
                <Button
                  onClick={handleWorkTogether}
                  variant="outline"
                  className="
                    h-[47px]
                    px-6
                    text-base
                    font-semibold
                    border-2 border-[#131112]
                    text-[#131112]
                    rounded-full
                    shadow-lg
                    transition
                    duration-300
                    ease-out
                    hover:bg-[#131112]
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    w-full
                    lg:w-auto
                  "
                >
                  {t.hero.workTogetherButton}
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex space-x-5 justify-center lg:justify-start"
            >
              {socialMedia.map((social) => (
                <motion.a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Image 
                    src={social.src} 
                    alt={social.alt} 
                    width={24} 
                    height={24} 
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;