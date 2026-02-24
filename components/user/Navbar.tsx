'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';
import { Menu, X, ChevronDown } from 'lucide-react';

const pendidikanMenu = [
  { href: '/pendidikan/sd-1', label: 'SD Harapan 1' },
  { href: '/pendidikan/sd-2', label: 'SD Harapan 2' },
  { href: '/pendidikan/sd-3', label: 'SD Harapan 3' },
  { href: '/pendidikan/smp-1', label: 'SMP Harapan 1' },
  { href: '/pendidikan/smp-2', label: 'SMP Harapan 2' },
  { href: '/pendidikan/smp-3', label: 'SMP Harapan 3' },
  { href: '/pendidikan/sma-1', label: 'SMA Harapan' },
  { href: '/pendidikan/sma-3', label: 'SMA Harapan 3' },
  { href: '/pendidikan/unhar', label: 'Universitas Harapan Medan' },
];

const pendaftaranMenu = [
  { href: 'https://psb.harapan.ac.id/', label: 'DIKDASMEN' },
  { href: 'https://pmb.harapan.ac.id/', label: 'PERGURUAN TINGGI / UNIVERSITAS' },
];

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
  { href: '/berita', label: 'Berita' },
  { href: '/galeri', label: 'Galeri' },
];

export default function Navbar() {
  const pathname = usePathname();
  const matches = useMediaQuery('(min-width: 1128px)');
  const [isClient, setIsClient] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [isPendidikanOpen, setIsPendidikanOpen] = useState(false);
  const [isPendaftaranOpen, setIsPendaftaranOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsPendidikanOpen(false);
        setIsPendaftaranOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tutup mobile menu saat route berubah
  useEffect(() => {
    setToggled(false);
  }, [pathname]);

  if (!isClient) return null;

  const isActive = (href: string) => pathname === href;

  const handlePendidikanToggle = () => {
    setIsPendidikanOpen((prev) => !prev);
    setIsPendaftaranOpen(false);
  };

  const handlePendaftaranToggle = () => {
    setIsPendaftaranOpen((prev) => !prev);
    setIsPendidikanOpen(false);
  };

  // Animasi mobile menu
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as any,
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: 'easeIn' as any },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.25, ease: 'easeOut' as any },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: 'easeIn' as any },
    },
  };

  return (
    <nav className="flex justify-between items-center px-4 lg:px-32 py-5 bg-primaryGreen-700 sticky top-0 shadow-sm z-50">
      {/* Logo */}
      <Link href="/" className="flex gap-x-2 items-center">
        <img src="/logo.png" alt="Logo Yaspendhar" className="w-[50px] md:w-[65px]" />
        <h1 className="text-sm md:text-base font-semibold text-white">Yayasan Pendidikan Harapan</h1>
      </Link>

      {/* Desktop Menu */}
      {matches && (
        <div className="flex gap-x-6 items-center text-white">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-primaryYellow-400 ${isActive(link.href) ? 'text-primaryYellow-400 border-b border-primaryYellow-400' : 'text-white'}`}>
              {link.label}
            </Link>
          ))}

          {/* Dropdown Pendidikan */}
          <div className="relative dropdown-container">
            <button onClick={handlePendidikanToggle} className={`flex items-center gap-x-1 text-sm font-medium transition-colors hover:text-primaryYellow-400 ${isPendidikanOpen ? 'text-primaryYellow-400' : 'text-white'}`}>
              Pendidikan
              <motion.span animate={{ rotate: isPendidikanOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} />
              </motion.span>
            </button>
            <AnimatePresence>
              {isPendidikanOpen && (
                <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full mt-2 bg-white text-black rounded-lg shadow-lg w-52 overflow-hidden">
                  {pendidikanMenu.map((item) => (
                    <Link key={item.href} href={item.href} className="block px-4 py-2.5 text-sm hover:bg-primaryGreen-100 hover:text-primaryGreen-800 transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dropdown Pendaftaran */}
          <div className="relative dropdown-container">
            <button onClick={handlePendaftaranToggle} className={`flex items-center gap-x-1 text-sm font-medium transition-colors hover:text-primaryYellow-400 ${isPendaftaranOpen ? 'text-primaryYellow-400' : 'text-white'}`}>
              Pendaftaran
              <motion.span animate={{ rotate: isPendaftaranOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} />
              </motion.span>
            </button>
            <AnimatePresence>
              {isPendaftaranOpen && (
                <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full mt-2 bg-white text-black rounded-lg shadow-lg w-52 overflow-hidden">
                  {pendaftaranMenu.map((item) => (
                    <Link key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm hover:bg-primaryGreen-100 hover:text-primaryGreen-800 transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Mobile Hamburger */}
      {!matches && (
        <button onClick={() => setToggled((prev) => !prev)} className="z-50 text-white focus:outline-none">
          <AnimatePresence mode="wait">
            {toggled ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={28} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={28} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggled && !matches && (
          <motion.div variants={mobileMenuVariants} initial="hidden" animate="visible" exit="exit" className="fixed top-[72px] left-0 w-full bg-primaryGreen-700 flex flex-col px-8 py-8 gap-y-5 shadow-lg z-40">
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link href={link.href} className={`text-base font-medium transition-colors ${isActive(link.href) ? 'text-primaryYellow-400' : 'text-white hover:text-primaryYellow-400'}`}>
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Dropdown Pendidikan */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <button onClick={handlePendidikanToggle} className="flex items-center gap-x-1 text-base font-medium text-white hover:text-primaryYellow-400 text-left">
                Pendidikan
                <motion.span animate={{ rotate: isPendidikanOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} />
                </motion.span>
              </button>
              <AnimatePresence>
                {isPendidikanOpen && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="overflow-hidden pl-4 mt-2 flex flex-col gap-y-2">
                    {pendidikanMenu.map((item) => (
                      <Link key={item.href} href={item.href} className="text-sm text-white/80 hover:text-white transition-colors py-1">
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Mobile Dropdown Pendaftaran */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <button onClick={handlePendaftaranToggle} className="flex items-center gap-x-1 text-base font-medium text-white hover:text-primaryYellow-400 text-left">
                Pendaftaran
                <motion.span animate={{ rotate: isPendaftaranOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} />
                </motion.span>
              </button>
              <AnimatePresence>
                {isPendaftaranOpen && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="overflow-hidden pl-4 mt-2 flex flex-col gap-y-2">
                    {pendaftaranMenu.map((item) => (
                      <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors py-1">
                        {item.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
