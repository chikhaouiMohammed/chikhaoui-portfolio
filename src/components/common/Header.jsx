// components/common/Header.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const Header = ({ lang, setLang, t }) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleContactClick = () => {
    // Scroll to #contact on the same page, preserving lang:
    document
      .querySelector(`#contact`)
      ?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Build navItems using translated labels, but hrefs must include `?lang=${lang}`.
  const navItems = [
    { label: t.nav.home, href: `/?lang=${lang}` },
    { label: t.nav.work, href: `/?lang=${lang}#work` },
    { label: t.nav.services, href: `/?lang=${lang}#services` },
    { label: t.nav.about, href: `/?lang=${lang}#about` },
  ];

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  return (
    <header className="bg-[#FFFFF0] sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Clickable Logo */}
        <Link href={`/?lang=${lang}`} className=' cursor-pointer'>
          <div className="text-xl font-bold text-gray-900 cursor-pointer">
            CHIKHAOUI
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="
                relative
                text-sm font-medium capitalize text-gray-900
                before:absolute before:-bottom-1 before:left-0
                before:h-[2px] before:w-0 before:bg-gray-900
                hover:before:w-full before:transition-all
                transition-colors
              "
            >
              {label}
            </Link>
          ))}

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center space-x-1 text-sm font-medium capitalize text-gray-900 hover:text-gray-600 transition-colors"
            >
              <span>{lang}</span>
              <Image
                src="/images/img_down_arrow_24_outline.svg"
                alt={t.header.languageDropdownAlt}
                width={16}
                height={16}
              />
            </button>
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[100px]">
                <button
                  onClick={() => {
                    setLang('en');
                    setIsLanguageOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm capitalize text-gray-900 hover:bg-gray-100"
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLang('fr');
                    setIsLanguageOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm capitalize text-gray-900 hover:bg-gray-100"
                >
                  Français
                </button>
                <button
                  onClick={() => {
                    setLang('ar');
                    setIsLanguageOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm capitalize text-gray-900 hover:bg-gray-100"
                >
                  العربية
                </button>
              </div>
            )}
          </div>

          {/* Contact Me Button (scroll within same page) */}
          <Button
            onClick={handleContactClick}
            className="
              w-36
              h-10
              inline-flex
              justify-center
              items-center
              text-xs
              font-semibold
              bg-[#131112]
              hover:bg-[#1a1819]
              text-white
              rounded-full
              shadow-md
              transform
              transition
              duration-300
              ease-out
            "
          >
            {t.header.contactButton}
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            key="mobileMenu"
            className="md:hidden bg-[#FFFFF0] shadow-md overflow-hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center py-4 space-y-4">
              {navItems.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium capitalize text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {label}
                </Link>
              ))}

              {/* Mobile Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-1 text-base font-medium capitalize text-gray-900 hover:text-gray-600 transition-colors"
                >
                  <span>{lang}</span>
                  <Image
                    src="/images/img_down_arrow_24_outline.svg"
                    alt={t.header.languageDropdownAlt}
                    width={16}
                    height={16}
                  />
                </button>

                {isLanguageOpen && (
                  <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    <button
                      onClick={() => {
                        setLang('en');
                        setIsLanguageOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm capitalize text-gray-900 hover:bg-gray-100"
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLang('fr');
                        setIsLanguageOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm capitalize text-gray-900 hover:bg-gray-100"
                    >
                      Français
                    </button>
                    <button
                      onClick={() => {
                        setLang('ar');
                        setIsLanguageOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm capitalize text-gray-900 hover:bg-gray-100"
                    >
                      العربية
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Contact Button */}
              <Button
                onClick={() => {
                  handleContactClick();
                  setIsMobileMenuOpen(false);
                }}
                className="
                  w-5/6
                  px-6 py-3
                  text-base
                  font-semibold
                  bg-[#131112]
                  hover:bg-[#1a1819]
                  text-white
                  rounded-full
                  shadow-md
                  transition
                  duration-300
                  ease-out
                "
              >
                {t.header.contactButton}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
