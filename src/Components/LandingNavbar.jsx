import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { useTheme } from "./Context/ThemeContext";

const LandingNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
  ];

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (event, href) => {
    event.preventDefault();

    const target = document.querySelector(href);

    if (!target) {
      console.warn(`Section not found: ${href}`);
      return;
    }

    // Close mobile menu first
    const delay = menuOpen ? 250 : 0;
    closeMenu();

    // Scroll after mobile menu closes
    setTimeout(() => {
      const top = target.getBoundingClientRect().top + window.scrollY - 90;

      window.scrollTo({
        top,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }, delay);
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-0 z-50 border-b border-base-300/60 bg-base-100/90 backdrop-blur-2xl"
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-3"
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { rotate: -8, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/15"
            >
              <Code2 size={21} strokeWidth={2.2} />
            </motion.div>

            <div className="flex flex-col leading-none">
              <span className="text-[21px] font-black tracking-[-1.1px] text-base-content">
                Dev<span className="text-primary">Tinder</span>
              </span>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-[2.5px] text-base-content/45">
                Developer Community
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(event) => scrollToSection(event, link.href)}
                initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.15 + index * 0.08,
                }}
                className="group relative py-2 text-[13px] font-semibold tracking-wide text-base-content/65 transition-colors duration-300 hover:text-primary"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Theme Toggle */}
            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } theme`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-200/70 text-base-content transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, rotate: -45, scale: 0.7 }
                  }
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? {}
                      : { opacity: 0, rotate: 45, scale: 0.7 }
                  }
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <Link
              to="/login"
              className="rounded-full px-5 py-2.5 text-[13px] font-bold text-base-content transition-colors duration-300 hover:bg-base-200"
            >
              Login
            </Link>

            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/login"
                className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[13px] font-bold text-primary-content shadow-lg shadow-primary/15 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
              >
                Get Started
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-200/70 text-base-content transition-colors hover:border-primary hover:text-primary"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 text-base-content transition-colors hover:border-primary hover:text-primary"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={
                    shouldReduceMotion ? false : { rotate: -45, opacity: 0 }
                  }
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={shouldReduceMotion ? {} : { rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden border-t border-base-300/70 bg-base-100 md:hidden"
            >
              <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-5 py-5 sm:px-8">
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[2px] text-base-content/40">
                  Navigation
                </p>

                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => scrollToSection(event, link.href)}
                    className="flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-semibold text-base-content/75 transition-colors hover:bg-base-200 hover:text-primary"
                  >
                    {link.name}
                    <ArrowUpRight size={16} className="opacity-50" />
                  </a>
                ))}

                <div className="my-3 h-px bg-base-300/70" />

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-full border border-base-300 py-3.5 text-center text-sm font-bold text-base-content transition-colors hover:border-primary hover:text-primary"
                >
                  Login
                </Link>

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-content shadow-lg shadow-primary/15"
                >
                  Get Started
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default LandingNavbar;
