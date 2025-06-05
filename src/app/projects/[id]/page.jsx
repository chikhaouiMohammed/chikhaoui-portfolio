// src/app/projects/[id]/page.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import { PROJECTS } from '../../../data/projects'; // adjust path if needed

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ProjectDetailPage() {
  // 1) Read “lang” from URL query (e.g. /projects/2?lang=ar). Fallback to 'en'.
  const searchParams = useSearchParams();
  const initialLang = searchParams.get('lang') || 'en';
  const [lang, setLang] = useState(initialLang);

  // 2) The Next.js router, used to replace query whenever lang changes.
  const router = useRouter();

  // 3) Centralized translations (same keys as in HomePage):
  const translations = {
    en: {
      header: {
        contactButton: 'Contact Me',
        languageDropdownAlt: 'Language dropdown',
      },
      nav: {
        home: 'home',
        work: 'work',
        services: 'services',
        about: 'about me',
      },
      filters: {
        webDesign: 'Web Design',
        webDev: 'Web Development',
        wordpress: 'Wordpress',
        webflow: 'Webflow',
        ecommerce: 'E-commerce',
      },
      sections: {
        projectOverview: 'Project Overview',
        keyFeatures: 'Key Features',
        categoryLabel: 'Category',
        technologiesLabel: 'Technologies',
        timelineLabel: 'Timeline',
        clientLabel: 'Client',
        projectGalleryTitle: 'Project Gallery',
        projectGallerySubtitle:
          'Explore the design and functionality through these detailed screenshots',
        contactTitle: 'Contact Me',
      },
      buttons: {
        backToProjects: 'Back to Projects',
        visitLiveSite: 'Visit Live Site',
        liveSiteUnavailable: 'Live Site Unavailable',
      },
      noProjects: 'No projects found',
      trySelectCategory: 'Try selecting a different category',
    },
    fr: {
      header: {
        contactButton: 'Contactez-moi',
        languageDropdownAlt: 'Sélection de langue',
      },
      nav: {
        home: 'accueil',
        work: 'travaux',
        services: 'services',
        about: 'à propos',
      },
      filters: {
        webDesign: 'Web Design',
        webDev: 'Développement Web',
        wordpress: 'Wordpress',
        webflow: 'Webflow',
        ecommerce: 'E-commerce',
      },
      sections: {
        projectOverview: 'Aperçu du Projet',
        keyFeatures: 'Principales Fonctionnalités',
        categoryLabel: 'Catégorie',
        technologiesLabel: 'Technologies',
        timelineLabel: 'Durée',
        clientLabel: 'Client',
        projectGalleryTitle: 'Galerie du Projet',
        projectGallerySubtitle:
          'Explorez la conception et la fonctionnalité à travers ces captures d’écran détaillées',
        contactTitle: 'Contactez-moi',
      },
      buttons: {
        backToProjects: 'Retour aux Projets',
        visitLiveSite: 'Visiter le Site',
        liveSiteUnavailable: 'Site Indisponible',
      },
      noProjects: 'Aucun projet trouvé',
      trySelectCategory: 'Essayez de sélectionner une autre catégorie',
    },
    ar: {
      header: {
        contactButton: 'اتصل بي',
        languageDropdownAlt: 'قائِمة اللغات',
      },
      nav: {
        home: 'الرئيسية',
        work: 'أعمال',
        services: 'الخدمات',
        about: 'حولّي',
      },
      filters: {
        webDesign: 'تصميم ويب',
        webDev: 'تطوير ويب',
        wordpress: 'ووردبريس',
        webflow: 'ويب فلو',
        ecommerce: 'تجارة إلكترونية',
      },
      sections: {
        projectOverview: 'نظرة عامة على المشروع',
        keyFeatures: 'المميزات الرئيسية',
        categoryLabel: 'الفئة',
        technologiesLabel: 'التقنيات',
        timelineLabel: 'المدة',
        clientLabel: 'العميل',
        projectGalleryTitle: 'معرض المشروع',
        projectGallerySubtitle:
          'استكشف التصميم والوظائف من خلال لقطات الشاشة التفصيلية هذه',
        contactTitle: 'اتصل بي',
      },
      buttons: {
        backToProjects: 'العودة إلى المشاريع',
        visitLiveSite: 'زيارة الموقع',
        liveSiteUnavailable: 'الموقع غير متوفر',
      },
      noProjects: 'لا توجد مشاريع',
      trySelectCategory: 'جرب اختيار فئة أخرى',
    },
  };

  // 4) Short alias for the current translation set
  const t = translations[lang];

  // Whenever lang changes, rewrite the URL query so that ?lang= remains in address bar.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('lang', lang);
    const newUrl = window.location.pathname + '?' + params.toString();
    router.replace(newUrl, { scroll: false });
  }, [lang, router]);

  // 5) Determine which “id” is being requested in the URL using useParams:
  const params = useParams();
  const id = params.id;

  // 6) Find the matching project entry
  const project = PROJECTS.find((p) => p.id === id);

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isZoomed, setIsZoomed] = useState(false);
  const galleryRef = useRef(null);

  // Prevent body scrolling when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setIsZoomed(false);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [lightboxIndex]);

  if (!project) {
    // Project not found
    return (
      <div className="min-h-screen bg-[#FFFFF0] flex flex-col">
        <Header lang={lang} setLang={setLang} t={t} />
        <main className="flex-1 flex items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.noProjects}
          </h2>
          <Link href={`/?lang=${lang}`} className="text-gray-700 hover:text-gray-900">
            ← {t.nav.home}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // 7) Build contactInfo array from project.contact
  const contactInfo = [
    {
      icon: '/images/img_open_mail_24_outline.svg',
      title: 'Email',
      primary: project.contact.email,
    },
    {
      icon: '/images/img_call_24_outline.svg',
      title: 'Phone',
      primary: project.contact.phone,
    },
    {
      icon: '/images/img_location_pin_24_outline.svg',
      title: 'Address',
      primary: project.contact.address,
    },
  ];

  // 8) Filtered images logic (unchanged)
  const filteredImages =
    filter === 'all'
      ? project.images
      : project.images.slice(0, filter === 'mobile' ? 4 : 6);

  return (
    <div className="min-h-screen bg-[#FFFFF0] flex flex-col">
      {/* Pass lang / setLang / t into Header */}
      <Header lang={lang} setLang={setLang} t={t} />

      {/* Hero / Intro Section */}
      <motion.section
        className="py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <Link
            href={`/?lang=${lang}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            {t.buttons.backToProjects}
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-4">
            {project.title}
          </h1>
          <p className="text-lg text-gray-700 mt-6 max-w-3xl mx-auto">
            {project.intro}
          </p>
        </div>
      </motion.section>

      {/* Project Overview Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t.sections.projectOverview}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t.sections.keyFeatures}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl h-fit">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {t.sections.projectOverview}
              </h3>

              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                    {t.sections.categoryLabel}
                  </h4>
                  <p className="text-gray-900">Web Application</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                    {t.sections.timelineLabel}
                  </h4>
                  <p className="text-gray-900">1 Week</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                    {t.sections.clientLabel}
                  </h4>
                  <p className="text-gray-900">
                    {project.id === '1'
                      ? 'Luxury Hotels Group'
                      : project.id === '4'
                      ? 'akchrdz.com'
                      : 'Internal / Confidential'}
                  </p>
                </div>
              </div>

              {/* Live Site Button – only enabled if `liveUrl` exists */}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full bg-[#131112] text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  {t.buttons.visitLiveSite}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              ) : (
                <button
                  className="mt-8 w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
                  disabled
                >
                  {t.buttons.liveSiteUnavailable}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.sections.projectGalleryTitle}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.sections.projectGallerySubtitle}
            </p>
          </div>

          {/* Gallery Grid */}
          <div
            ref={galleryRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="aspect-w-16 aspect-h-10 bg-gray-200 rounded-xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-medium text-lg">Screen {index + 1}</h3>
                    <p className="text-sm opacity-80 mt-1">Click to enlarge</p>
                  </div>

                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-900"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <button
              className="absolute top-6 right-6 z-50 text-white hover:text-gray-300 transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </button>

            <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col">
              <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <Image
                    src={project.images[lightboxIndex]}
                    alt={`Lightbox view ${lightboxIndex + 1}`}
                    fill
                    className={`object-contain transition-transform duration-300 ${
                      isZoomed ? 'scale-150' : ''
                    }`}
                  />
                </div>
              </div>

              <div className="text-white mt-4 text-center">
                <p className="text-lg">
                  Image {lightboxIndex + 1} of {project.images.length}
                </p>
              </div>

              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(false);
                    setLightboxIndex((prev) =>
                      prev > 0 ? prev - 1 : project.images.length - 1
                    );
                  }}
                  className="ml-4 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(false);
                    setLightboxIndex((prev) =>
                      prev < project.images.length - 1 ? prev + 1 : 0
                    );
                  }}
                  className="mr-4 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center mt-6 overflow-x-auto py-2">
                <div className="flex space-x-3">
                  {project.images.map((src, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsZoomed(false);
                        setLightboxIndex(index);
                      }}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        index === lightboxIndex
                          ? 'border-white scale-110'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Contact Section (id="contact") --- */}
      <motion.section
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        id="contact"
      >
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.sections.contactTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((contact, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="text-center"
              >
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src={contact.icon}
                    alt={contact.title}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {contact.title}
                </h3>
                <p className="text-xl text-gray-900 mb-2">
                  {contact.primary}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
