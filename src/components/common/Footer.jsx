'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-8">CHIKHAOUI</h3>
          
          <nav className="flex justify-center space-x-8 mb-8">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#work" className="text-white/80 hover:text-white transition-colors">
              Work
            </Link>
            <Link href="#services" className="text-white/80 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="#about" className="text-white/80 hover:text-white transition-colors">
              About Me
            </Link>
          </nav>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-white">
            © 2025 CHIKHAOUI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;