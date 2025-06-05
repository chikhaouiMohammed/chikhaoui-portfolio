// src/app/page.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/common/HeroSection';
import Card from '../components/ui/Card';
import Image from 'next/image';
import { PROJECTS } from '../data/projects'; // Import actual projects

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function SkillProgress({ name, percentage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start({ width: `${percentage}%`, transition: { duration: 2, ease: 'easeOut' } });
      let start = 0;
      const duration = 2000;
      const stepTime = 50;
      const increment = percentage / (duration / stepTime);
      const counter = setInterval(() => {
        start += increment;
        if (start >= percentage) {
          start = percentage;
          clearInterval(counter);
        }
        setCount(Math.round(start));
      }, stepTime);
      return () => clearInterval(counter);
    }
  }, [inView, percentage, controls]);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-900">{name}</span>
        <span className="font-medium text-gray-900">{count}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
        <motion.div
          className="bg-gray-900 h-full rounded-full"
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  );
}

export default function HomePage() {
  // 1) Language state (en / fr / ar)
  const [lang, setLang] = useState('en');

  // 2) Centralized translation object
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
        myProjectsTitle: 'My Projects',
        myProjectsSubtitle: 'Solving user problems with engaging design.',
        servicesTitle: 'Services',
        servicesSubtitle:
          'End-to-end UI/UX services—from user research to pixel-perfect interfaces—that delight users and drive results.',
        aboutTitle: 'About Me',
        aboutText:
          'I hold a Bachelor’s degree in Computer Science and have strong experience in web design and development. I specialize in creating modern, responsive websites that combine visual appeal with functional performance.',
        contactTitle: 'Contact Me',
      },
      hero: {
        imageAlt: 'Chikhaoui Mohammed Mostafa',
        heading: 'Web Designer & Developer Who Builds for Growth',
        subtext:
          'I am Chikhaoui Mohammed Mostafa. I help businesses grow online by creating modern, high-converting websites that build trust, attract customers, and support long-term success.',
        viewWorkButton: 'View My Work',
        workTogetherButton: "Let's Work Together",
      },
      services: [
        {
          icon: '/images/img_layer1.svg',
          title: 'Website Design',
          description:
            'Crafting attractive, user-friendly websites that clearly showcase your unique brand identity.',
        },
        {
          icon: '/images/img_capa1.svg',
          title: 'Website Development',
          description:
            'Creating responsive, fast websites that work flawlessly on all devices for a smooth experience.',
        },
        {
          icon: '/images/img_frame_black_900_80x80.svg',
          title: 'Website Redesign',
          description:
            'Updating websites with modern design and improved features to showcase your brand and meet today’s standards.',
        },
        {
          icon: '/images/img_frame.svg',
          title: 'UI/UX Design',
          description:
            'Designing intuitive user interfaces that enhance satisfaction and drive engagement.',
        },
        {
          icon: '/images/img_frame_black_900.svg',
          title: 'E-commerce Website',
          description:
            'Offering reliable website maintenance to keep your site secure, updated, performing well, and content fresh.',
        },
        {
          icon: '/images/img_layer1_black_900.svg',
          title: 'Website Management',
          description:
            'Providing reliable website maintenance to keep your site secure, updated, optimized, and content fresh.',
        },
      ],
      skills: [
        { name: 'Web Design', percentage: 92 },
        { name: 'Web Development', percentage: 95 },
        { name: 'Full Stack Development', percentage: 80 },
        { name: 'WordPress', percentage: 90 },
      ],
      contactInfo: [
        {
          icon: '/images/img_open_mail_24_outline.svg',
          title: 'Email',
          primary: 'chikhaouimohammedmostafa@gmail.com',
        },
        {
          icon: '/images/img_call_24_outline.svg',
          title: 'Phone',
          primary: '+213 656035364',
        },
        {
          icon: '/images/img_location_pin_24_outline.svg',
          title: 'Office',
          primary: 'Tlemcen, Algeria',
        },
      ],
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
        myProjectsTitle: 'Mes Projets',
        myProjectsSubtitle:
          'Résoudre les problèmes des utilisateurs avec des designs captivants.',
        servicesTitle: 'Services',
        servicesSubtitle:
          'Services UI/UX complets—from la recherche utilisateur aux interfaces pixel-perfect—qui ravissent les utilisateurs et génèrent des résultats.',
        aboutTitle: 'À Propos de Moi',
        aboutText:
          'Je suis titulaire d’un diplôme en informatique et possède une grande expérience en conception et développement web. Je me spécialise dans la création de sites web modernes et réactifs qui allient attrait visuel et performance fonctionnelle.',
        contactTitle: 'Contactez-moi',
      },
      hero: {
        imageAlt: 'Chikhaoui Mohammed Mostafa',
        heading: 'Designer & Développeur Web Axé sur la Croissance',
        subtext:
          'Je suis Chikhaoui Mohammed Mostafa. J’aide les entreprises à se développer en ligne en créant des sites modernes et convertissants qui inspirent confiance, attirent des clients et soutiennent le succès à long terme.',
        viewWorkButton: 'Voir Mes Réalisations',
        workTogetherButton: 'Travaillons Ensemble',
      },
      services: [
        {
          icon: '/images/img_layer1.svg',
          title: 'Conception de Sites Web',
          description:
            'Créer des sites web attrayants et conviviaux qui mettent clairement en valeur votre identité de marque unique.',
        },
        {
          icon: '/images/img_capa1.svg',
          title: 'Développement de Sites Web',
          description:
            'Créer des sites web réactifs et rapides qui fonctionnent parfaitement sur tous les appareils pour une expérience fluide.',
        },
        {
          icon: '/images/img_frame_black_900_80x80.svg',
          title: 'Refonte de Sites Web',
          description:
            'Mettre à jour les sites web avec un design moderne et des fonctionnalités améliorées pour présenter votre marque et répondre aux normes d’aujourd’hui.',
        },
        {
          icon: '/images/img_frame.svg',
          title: 'Conception UI/UX',
          description:
            'Concevoir des interfaces utilisateur intuitives qui améliorent la satisfaction et stimulent l’engagement.',
        },
        {
          icon: '/images/img_frame_black_900.svg',
          title: 'Site E-commerce',
          description:
            'Offrir une maintenance fiable du site pour le garder sécurisé, à jour, performant et avec un contenu frais.',
        },
        {
          icon: '/images/img_layer1_black_900.svg',
          title: 'Gestion de Site Web',
          description:
            'Fournir une maintenance fiable du site pour le garder sécurisé, à jour, optimisé et avec un contenu frais.',
        },
      ],
      skills: [
        { name: 'Conception Web', percentage: 92 },
        { name: 'Développement Web', percentage: 95 },
        { name: 'Développement Full Stack', percentage: 80 },
        { name: 'WordPress', percentage: 90 },
      ],
      contactInfo: [
        {
          icon: '/images/img_open_mail_24_outline.svg',
          title: 'Email',
          primary: 'chikhaouimohammedmostafa@gmail.com',
        },
        {
          icon: '/images/img_call_24_outline.svg',
          title: 'Téléphone',
          primary: '+213 656035364',
        },
        {
          icon: '/images/img_location_pin_24_outline.svg',
          title: 'Bureau',
          primary: 'Tlemcen, Algérie',
        },
      ],
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
        myProjectsTitle: 'مشاريعي',
        myProjectsSubtitle: 'حل مشكلات المستخدمين بتصاميم جذابة.',
        servicesTitle: 'الخدمات',
        servicesSubtitle:
          'خدمات UI/UX شاملة—from أبحاث المستخدمين إلى واجهات بكسل دقيقة—لإسعاد المستخدمين وتحقيق النتائج.',
        aboutTitle: 'عني',
        aboutText:
          'أنا حاصل على درجة البكالوريوس في علوم الحاسوب ولدي خبرة قوية في تصميم وتطوير الويب. أتخصص في إنشاء مواقع ويب حديثة ومتجاوبة تجمع بين المظهر الجذاب والأداء الوظيفي.',
        contactTitle: 'اتصل بي',
      },
      hero: {
        imageAlt: 'شيخاوي محمد مصطفى',
        heading: 'مصمم & مطور ويب يبني من أجل النمو',
        subtext:
          'أنا خيشاوي محمد مصطفى. أساعد الشركات على النمو عبر الإنترنت من خلال إنشاء مواقع حديثة عالية التحويل تبني الثقة وتجذب العملاء وتدعم النجاح طويل الأمد.',
        viewWorkButton: 'عرض أعمالي',
        workTogetherButton: 'لنعمل معًا',
      },
      services: [
        {
          icon: '/images/img_layer1.svg',
          title: 'تصميم مواقع الويب',
          description:
            'إنشاء مواقع ويب جذابة وسهلة الاستخدام تعرض هويتك التجارية بوضوح.',
        },
        {
          icon: '/images/img_capa1.svg',
          title: 'تطوير مواقع الويب',
          description:
            'إنشاء مواقع ويب سريعة ومتجاوبة تعمل بشكل flawless على جميع الأجهزة لتجربة سلسة.',
        },
        {
          icon: '/images/img_frame_black_900_80x80.svg',
          title: 'إعادة تصميم مواقع الويب',
          description:
            'تحديث مواقع الويب بتصميم حديث ومميزات محسنة لعرض علامتك التجارية وتلبية المعايير الحالية.',
        },
        {
          icon: '/images/img_frame.svg',
          title: 'تصميم UI/UX',
          description:
            'تصميم واجهات مستخدم بديهية تعزز رضا المستخدمين وتزيد من تفاعلهم.',
        },
        {
          icon: '/images/img_frame_black_900.svg',
          title: 'موقع تجارة إلكترونية',
          description:
            'توفير صيانة موثوقة للموقع للحفاظ على أمانه وتحديثه وأدائه والمحتوى.',
        },
        {
          icon: '/images/img_layer1_black_900.svg',
          title: 'إدارة المواقع',
          description:
            'توفير صيانة موثوقة للموقع للحفاظ على أمانه وتحديثه وتحسينه والمحتوى.',
        },
      ],  
      skills: [  
        { name: 'تصميم ويب', percentage: 92 },  
        { name: 'تطوير ويب', percentage: 95 },  
        { name: 'تطوير Full Stack', percentage: 80 },  
        { name: 'ووردبريس', percentage: 90 },  
      ],  
      contactInfo: [  
        {  
          icon: '/images/img_open_mail_24_outline.svg',  
          title: 'بريد إلكتروني',  
          primary: 'chikhaouimohammedmostafa@gmail.com',  
        },  
        {  
          icon: '/images/img_call_24_outline.svg',  
          title: 'هاتف',  
          primary: '+213 656035364',  
        },  
        {  
          icon: '/images/img_location_pin_24_outline.svg',  
          title: 'المكتب',  
          primary: 'تلمسان، الجزائر',  
        },  
      ],  
      noProjects: 'لا توجد مشاريع',  
      trySelectCategory: 'جرب اختيار فئة أخرى',  
    },  
  };  

  // 3) Short alias for current translation set  
  const t = translations[lang];  

  // --- Projects & Filtering Logic ---  
  const [activeFilter, setActiveFilter] = useState(t.filters.webDesign);  
  useEffect(() => {  
    setActiveFilter(t.filters.webDesign);  
  }, [lang]);  

  // 4) Use actual projects from data file with proper mapping
  const projectsForHome = [  
    {  
      id: '1',  
      title: 'Luxury Hotel Booking System',  
      categories: [t.filters.webDesign],  
      image: '/images/hotelWebApp/screenshot1.png',
    },  
    {  
      id: '3',  
      title: 'Corporate Chat Application',  
      categories: [t.filters.webDesign, t.filters.webDev, t.filters.webflow],  
      image: '/images/chatApp/img_rectangle_11.png',  
    },  
    {  
      id: '2',  
      title: 'Team Collaboration Platform',  
      categories: [t.filters.webDesign, t.filters.webDev, t.filters.webflow],  
      image: '/images/teamApp/homepage.png',  
    },  
    {  
      id: '3',  
      title: 'Corporate Chat Application',  
      categories: [t.filters.webDesign, t.filters.webDev, t.filters.webflow],  
      image: '/images/chatApp/img_rectangle_11.png',  
    },  
    {  
      id: '2',  
      title: 'Team Collaboration Platform',  
      categories: [t.filters.webDesign, t.filters.webDev, t.filters.webflow],  
      image: '/images/teamApp/homepage.png',  
    },  
    {  
      id: '3',  
      title: 'Corporate Chat Application',  
      categories: [t.filters.webflow],  
      image: '/images/chatApp/img_rectangle_11.png',  
    },  
    {  
      id: '2',  
      title: 'Team Collaboration Platform',  
      categories: [t.filters.webflow],  
      image: '/images/teamApp/homepage.png',  
    },  
    {  
      id: '4',  
      title: 'akchrdz.com E-commerce Store',  
      categories: [t.filters.ecommerce],  
      image: '/images/akcherWebsite/screencapture-akcherdz-product-category-vetements-2025-06-03-20_47_36.png',  
    },  
    {  
      id: '4',  
      title: 'akchrdz.com E-commerce Store',  
      categories: [t.filters.wordpress],  
      image: '/images/akcherWebsite/screencapture-akcherdz-product-category-vetements-2025-06-03-20_47_36.png',  
    },  
  ];  

  const initiallyFiltered = projectsForHome.filter((project) =>  
    project.categories.includes(activeFilter)  
  );  
  const filteredProjects = initiallyFiltered.filter(  
    (proj, index, self) =>  
      index === self.findIndex((p) => p.title === proj.title)  
  );  

  // 5) Services, Skills, Contact Info arrays come from translations  
  const servicesList = t.services;  
  const skillsList = t.skills;  
  const contactList = t.contactInfo;  

  return (  
    <div className="min-h-screen bg-gray-50">  
      {/* Pass lang / setLang / t down into Header */}  
      <Header lang={lang} setLang={setLang} t={t} />  

      {/* HeroSection – unmodified except for passing t */}  
      <HeroSection t={t} />  

      {/* --- Projects Section --- */}  
      <motion.section  
        id="work"  
        className="py-20 bg-white"  
        initial="hidden"  
        whileInView="visible"  
        viewport={{ once: true }}  
        variants={sectionVariants}  
      >  
        <div className="container mx-auto px-4 max-w-screen-xl">  
          <div className="text-center mb-16">  
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">  
              {t.sections.myProjectsTitle}  
            </h2>  
            <p className="text-base sm:text-lg text-gray-600">  
              {t.sections.myProjectsSubtitle}  
            </p>  
          </div>  

          {/* Filter Tabs */}  
          <div className="mb-12 flex justify-center">  
            <div className="overflow-x-auto md:overflow-visible scrollbar-hide px-4 md:px-0">  
              <div className="inline-flex space-x-3">  
                {[  
                  t.filters.webDesign,  
                  t.filters.webDev,  
                  t.filters.wordpress,  
                  t.filters.webflow,  
                  t.filters.ecommerce,  
                ].map((tab) => (  
                  <button  
                    key={tab}  
                    onClick={() => setActiveFilter(tab)}  
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-colors ${  
                      activeFilter === tab  
                        ? 'bg-gray-900 text-white'  
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'  
                    }`}  
                  >  
                    {tab}  
                  </button>  
                ))}  
              </div>  
            </div>  
          </div>  

          {/* Projects Grid */}  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">  
            {filteredProjects.map((project) => (  
              <Link  
                key={project.id}  
                href={`/projects/${project.id}?lang=${lang}`}  
              >  
                <div className="group relative cursor-pointer overflow-hidden rounded-2xl h-[700px] flex flex-col">  
                  <div className="relative h-[700px] rounded-2xl overflow-hidden">  
                    <Image  
                      src={project.image}  
                      alt={project.title}  
                      fill  
                      style={{  
                        objectFit: 'cover',  
                        objectPosition: 'top',  
                      }}  
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"  
                    />  
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">  
                      <span className="inline-flex items-center text-white text-lg font-semibold">  
                        →{/* arrow icon only */}  
                      </span>  
                    </div>  
                  </div>  
                  <div className="p-4 bg-white flex-1 flex flex-col">  
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">  
                      {project.title}  
                    </h3>  
                    <p className="text-sm sm:text-base text-gray-600 mt-auto">  
                      {activeFilter}  
                    </p>  
                  </div>  
                </div>  
              </Link>  
            ))}  
          </div>  

          {filteredProjects.length === 0 && (  
            <div className="text-center py-12">  
              <h3 className="text-xl font-semibold text-gray-900">  
                {t.noProjects}  
              </h3>  
              <p className="text-gray-600 mt-2">  
                {t.trySelectCategory}  
              </p>  
            </div>  
          )}  
        </div>  
      </motion.section>  

      {/* --- Services Section --- */}  
      <motion.section  
        id="services"  
        className="py-20 bg-gray-50"  
        initial="hidden"  
        whileInView="visible"  
        viewport={{ once: true }}  
        variants={sectionVariants}  
      >  
        <div className="container mx-auto px-4 max-w-screen-xl">  
          <div className="text-center mb-16">  
            <h2 className="text-5xl font-bold text-gray-900 mb-4">  
              {t.sections.servicesTitle}  
            </h2>  
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">  
              {t.sections.servicesSubtitle}  
            </p>  
          </div>  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">  
            {servicesList.map((service, idx) => (  
              <motion.div  
                key={idx}  
                initial="hidden"  
                whileInView="visible"  
                viewport={{ once: true }}  
                variants={sectionVariants}  
              >  
                <Card className="bg-white p-8 rounded-3xl text-center hover:shadow-lg transition-shadow">  
                  <div className="mb-6">  
                    <Image  
                      src={service.icon}  
                      alt={service.title}  
                      width={80}  
                      height={80}  
                      className="mx-auto"  
                    />  
                  </div>  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">  
                    {service.title}  
                  </h3>  
                  <p className="text-gray-600 leading-relaxed">  
                    {service.description}  
                  </p>  
                </Card>  
              </motion.div>  
            ))}  
          </div>  
        </div>  
      </motion.section>  

      {/* --- About Me Section --- */}  
      <motion.section  
        id="about"  
        className="py-20 bg-white"  
        initial="hidden"  
        whileInView="visible"  
        viewport={{ once: true }}  
        variants={sectionVariants}  
      >  
        <div className="container mx-auto px-4 max-w-screen-xl">  
          <div className="text-center mb-16">  
            <h2 className="text-5xl font-bold text-gray-900">  
              {t.sections.aboutTitle}  
            </h2>  
          </div>  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">  
            <motion.div  
              initial="hidden"  
              whileInView="visible"  
              viewport={{ once: true }}  
              variants={sectionVariants}  
              className="flex justify-center items-center"  // Added items-center for vertical centering
            >  
              <Image  
                src="/images/myPictures/img_rectangle_19.png"  
                alt={t.sections.aboutTitle}  
                width={500}  
                height={500}  
                className="rounded-lg object-cover max-w-full h-auto"  // Added max-w-full for responsiveness
              />  
            </motion.div>  
            <motion.div  
              initial="hidden"  
              whileInView="visible"  
              viewport={{ once: true }}  
              variants={sectionVariants}  
              className="flex flex-col justify-center"  // Added flex properties for centering
            >  
              <div className="text-center lg:text-left"> 
                <p className="text-lg text-gray-700 leading-relaxed mb-8">  
                  {t.sections.aboutText}  
                </p>  
                <div className="space-y-6">  
                  {skillsList.map((skill, idx) => (  
                    <SkillProgress  
                      key={idx}  
                      name={skill.name}  
                      percentage={skill.percentage}  
                    />  
                  ))}  
                </div>  
              </div>  
            </motion.div>  
          </div>  
        </div>  
      </motion.section>

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
            {contactList.map((contact, idx) => (  
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