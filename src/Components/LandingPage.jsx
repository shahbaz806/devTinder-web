import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Users,
  MessageCircle,
  Crown,
  Globe2,
  Heart,
  Sparkles,
  Zap,
  Check,
  Terminal,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import LandingNavbar from "./LandingNavbar";

const developers = [
  {
    name: "Alex Morgan",
    role: "Frontend Developer",
    initials: "AM",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=85",
    skills: ["React", "JavaScript"],
    location: "San Francisco",
    color: "bg-[#E9D5C5]",
  },
  {
    name: "Sophia Williams",
    role: "UI/UX Designer",
    initials: "SW",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=85",
    skills: ["Figma", "Product Design"],
    location: "London",
    color: "bg-[#D9D8C9]",
  },
  {
    name: "Jordan Lee",
    role: "Full Stack Developer",
    initials: "JL",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=85",
    skills: ["Node.js", "MongoDB"],
    location: "Toronto",
    color: "bg-[#D9C9B8]",
  },
];

const features = [
  {
    number: "01",
    icon: Users,
    title: "Discover Developers",
    description:
      "Explore developers who share your interests, skills and passion for building meaningful things.",
    tag: "Find your people",
  },
  {
    number: "02",
    icon: Heart,
    title: "Build Connections",
    description:
      "Connect with like-minded people, exchange ideas and create opportunities together.",
    tag: "Grow together",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Real-time Conversations",
    description:
      "Move beyond introductions. Start conversations and turn interesting connections into collaborations.",
    tag: "Talk & collaborate",
  },
  {
    number: "04",
    icon: Crown,
    title: "Unlock Premium",
    description:
      "Explore premium membership benefits and take your developer networking experience further.",
    tag: "Go further",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your profile",
    description:
      "Show the community who you are, what you build and the technologies you love working with.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Discover your community",
    description:
      "Find developers, designers and creative minds who match your interests and goals.",
    icon: Globe2,
  },
  {
    number: "03",
    title: "Connect and collaborate",
    description:
      "Send connection requests, start conversations and build something meaningful together.",
    icon: MessageCircle,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const SectionLabel = ({ children, number }) => (
  <div className="mb-6 flex items-center gap-3">
    <span className="text-xs font-bold tracking-[0.2em] text-primary">
      {number}
    </span>
    <span className="h-px w-8 bg-primary/50" />
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/50">
      {children}
    </span>
  </div>
);

const LandingPage = () => {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.15 },
        variants: reveal,
      };

  return (
    <div className="min-h-screen overflow-hidden bg-base-100 text-base-content">
      <LandingNavbar />

      {/* ========================= HERO ========================= */}

      <section className="relative px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-12 lg:pb-16 lg:pt-24">
        {/* Background Effects */}
        <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[110px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[110px]" />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-2 lg:gap-12">
          {/* Hero Content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {/* Community Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <Sparkles size={14} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                A community built for developers
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="max-w-2xl text-[clamp(2.9rem,5.4vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.065em] text-base-content">
              Find your people.
              <br />
              <span className="font-serif font-normal italic text-primary">
                Build your network.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-7 text-base-content/65 sm:text-lg sm:leading-8">
              Great things happen when the right minds connect. Discover
              developers, exchange ideas and build meaningful connections beyond
              the code.
            </p>

            {/* CTA Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-content shadow-xl shadow-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/25"
              >
                Find your community
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 rounded-full border border-base-300 px-7 py-4 text-sm font-bold text-base-content transition-all duration-300 hover:border-primary hover:text-primary"
              >
                Explore how it works
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-base-300/70 pt-6 sm:gap-6 sm:pt-7">
              <div className="flex -space-x-3">
                {developers.map((developer) => (
                  <img
                    key={developer.name}
                    src={developer.image}
                    alt={developer.name}
                    className="h-10 w-10 rounded-full border-[3px] border-base-100 object-cover"
                  />
                ))}
              </div>

              <div>
                <p className="text-sm font-bold text-base-content">
                  Made for people who build
                </p>
                <p className="mt-1 text-xs text-base-content/50">
                  Developers. Designers. Creators.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[590px] lg:ml-auto"
          >
            {/* Background Glow */}
            <div className="absolute inset-8 rounded-[40px] bg-primary/10 blur-3xl" />

            {/* Developer Community Card */}
            <div className="relative rounded-[32px] border border-base-300/80 bg-base-200/60 p-4 shadow-2xl shadow-base-content/5 sm:p-7 lg:p-8">
              {/* Card Header */}
              <div className="mb-6 flex items-center justify-between sm:mb-7">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/45">
                    The developer community
                  </p>
                  <h3 className="mt-2 font-serif text-xl italic text-base-content sm:text-2xl">
                    People worth meeting.
                  </h3>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-base-300 bg-base-100">
                  <Users size={18} className="text-primary" />
                </div>
              </div>

              {/* Developer Profiles */}
              <div className="grid gap-3">
                {developers.map((developer, index) => (
                  <motion.div
                    key={developer.name}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.4 + index * 0.15,
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-base-content/5 sm:gap-4 sm:p-4"
                  >
                    {/* Profile Image */}
                    <div className="relative shrink-0">
                      <img
                        src={developer.image}
                        alt={developer.name}
                        className="h-12 w-12 rounded-xl object-cover sm:h-16 sm:w-16"
                        loading="lazy"
                      />
                      <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[3px] border-base-100 bg-success" />
                    </div>

                    {/* Profile Details */}
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-bold text-base-content">
                        {developer.name}
                      </h4>

                      <p className="mt-1 truncate text-xs text-base-content/50">
                        {developer.role}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {developer.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-base-300 text-base-content/50 sm:flex">
                      <ArrowUpRight size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Message */}
              <div className="mt-5 flex items-center justify-between gap-2 rounded-xl border border-primary/15 bg-primary/5 px-3 py-3 sm:px-4">
                <div className="flex min-w-0 items-center gap-2">
                  <Sparkles size={15} className="shrink-0 text-primary" />
                  <span className="text-xs font-semibold text-base-content/75">
                    Your next connection starts here.
                  </span>
                </div>
                <ArrowUpRight size={16} className="shrink-0 text-primary" />
              </div>

              {/* Demo Disclaimer */}
              <p className="mt-3 text-center text-[9px] text-base-content/35">
                Sample developer profiles for demonstration
              </p>
            </div>

            {/* Decorative Code Card */}
            {/* <motion.div
              animate={
                shouldReduceMotion ? {} : { y: [0, -8, 0], rotate: [0, 1, 0] }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-5 top-24 hidden rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl sm:block lg:-left-10"
            >
              {/* <div className="mb-3 flex items-center gap-2">
                <Terminal size={15} className="text-primary" />
                <span className="text-[10px] font-bold text-base-content/70">
                  collaboration.js
                </span>
              </div> */}

              <div className="space-y-1 font-mono text-[10px]">
                <p className="text-base-content/40">
                  <span className="text-primary">const</span> community =
                </p>
                <p className="pl-3 text-base-content">"better together";</p>
              </div>
            {/* </motion.div>  */}

            {/* Decorative Badge */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 9, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-2 flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 px-4 py-3 shadow-xl sm:-right-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Heart size={19} className="text-primary" />
              </div>

              <div>
                <p className="text-xs font-bold text-base-content">
                  Build together
                </p>
                <p className="mt-1 text-[10px] text-base-content/50">
                  Connect with purpose
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="mx-auto mt-16 flex max-w-[1440px] items-center gap-5 sm:mt-20">
          <span className="h-px flex-1 bg-base-300" />
          <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.25em] text-base-content/35">
            Scroll to explore
          </span>
          <span className="h-px flex-1 bg-base-300" />
        </div>
      </section>

      {/* ========================= FEATURES ========================= */}
      <section
        id="features"
        className="scroll-mt-24 border-y border-base-300/60 bg-base-200/45 px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <motion.div {...motionProps} className="max-w-2xl">
            <SectionLabel number="01">What makes us different</SectionLabel>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-base-content sm:text-5xl lg:text-6xl">
              More than a network.
              <br />
              <span className="font-serif font-normal italic text-primary">
                A place to belong.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-base-content/60 sm:text-base">
              Meaningful developer relationships don't happen by accident. We
              make discovering, connecting and collaborating feel natural.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.number}
                  variants={reveal}
                  whileHover={shouldReduceMotion ? {} : { y: -7 }}
                  className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[24px] border border-base-300/80 bg-base-100 p-7 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-base-content/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-primary/70">
                      {feature.number}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-base-300 bg-base-200/70 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-content">
                      <Icon size={20} />
                    </div>
                  </div>

                  <div className="mt-9">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary">
                      {feature.tag}
                    </p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight text-base-content">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-base-content/55">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-auto flex justify-end pt-6">
                    <ArrowUpRight
                      size={18}
                      className="text-base-content/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================= */}
      <section
        id="how-it-works"
        className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <motion.div {...motionProps}>
            <SectionLabel number="02">Simple by design</SectionLabel>

            <h2 className="max-w-xl text-4xl font-semibold leading-[1.12] tracking-[-0.05em] text-base-content sm:text-5xl lg:text-6xl">
              Three steps.
              <br />
              <span className="font-serif font-normal italic text-primary">
                Endless possibilities.
              </span>
            </h2>

            <p className="mt-7 max-w-md text-sm leading-8 text-base-content/60 sm:text-base">
              Getting started shouldn't be complicated. Create your profile,
              meet the right people and let great conversations lead somewhere
              meaningful.
            </p>

            <Link
              to="/login"
              className="group mt-9 inline-flex items-center gap-3 border-b border-primary pb-2 text-sm font-bold text-primary transition-all hover:gap-5"
            >
              Start your journey
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative"
          >
            <div className="absolute bottom-12 left-[27px] top-12 w-px bg-base-300" />

            <div className="space-y-5">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    variants={reveal}
                    className="group relative flex gap-6 rounded-[24px] border border-base-300/70 bg-base-200/40 p-6 transition-all duration-300 hover:border-primary/35 hover:bg-base-200/75 sm:gap-8 sm:p-8"
                  >
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-base-300 bg-base-100 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-content">
                      <Icon size={22} />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-bold tracking-widest text-primary">
                          STEP {step.number}
                        </span>
                      </div>

                      <h3 className="mt-2 text-xl font-bold tracking-tight text-base-content sm:text-2xl">
                        {step.title}
                      </h3>

                      <p className="mt-3 max-w-md text-sm leading-7 text-base-content/55">
                        {step.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={19}
                      className="hidden shrink-0 text-base-content/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary sm:block"
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================= ABOUT ========================= */}
      <section
        id="about"
        className="scroll-mt-24 border-y border-base-300/60 bg-base-200/45 px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Editorial Visual */}
          <motion.div {...motionProps} className="relative">
            <div className="relative overflow-hidden rounded-[32px] border border-base-300 bg-base-100 p-7 shadow-xl shadow-base-content/5 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/45">
                  A shared mindset
                </span>
                <Sparkles size={19} className="text-primary" />
              </div>

              <div className="mt-12">
                <p className="font-serif text-4xl leading-tight tracking-tight text-base-content sm:text-5xl">
                  "Alone we can do so little;
                  <span className="italic text-primary">
                    {" "}
                    together we can do so much."
                  </span>
                </p>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-base-content/45">
                  The spirit of DevTinder
                </p>
              </div>

              <div className="mt-14 grid grid-cols-3 gap-3">
                {[
                  { icon: Code2, label: "Create" },
                  { icon: Users, label: "Connect" },
                  { icon: Heart, label: "Collaborate" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-3 rounded-2xl bg-base-200/80 px-2 py-5"
                    >
                      <Icon size={21} className="text-primary" />
                      <span className="text-[10px] font-bold text-base-content/65">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute -bottom-5 -right-3 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          </motion.div>

          {/* About Content */}
          <motion.div {...motionProps}>
            <SectionLabel number="03">The idea behind it</SectionLabel>

            <h2 className="text-4xl font-semibold leading-[1.12] tracking-[-0.05em] text-base-content sm:text-5xl lg:text-6xl">
              Built around
              <br />
              <span className="font-serif font-normal italic text-primary">
                human connection.
              </span>
            </h2>

            <p className="mt-7 text-sm leading-8 text-base-content/60 sm:text-base">
              Being a developer is more than writing code. It's about learning,
              sharing experiences, solving problems and finding people who
              inspire you to think bigger.
            </p>

            <p className="mt-4 text-sm leading-8 text-base-content/60 sm:text-base">
              DevTinder brings that spirit into one community. A space where
              developers can discover each other, build relationships and
              explore opportunities to grow together.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Meaningful developer connections",
                "A space for ideas and collaboration",
                "A community that grows together",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check size={14} />
                  </span>
                  <span className="text-sm font-semibold text-base-content/75">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================= CTA ========================= */}
      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] bg-[#542E20] px-7 py-16 text-center sm:px-12 sm:py-20 lg:rounded-[40px] lg:py-28"
        >
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-5 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#C47A53]/15 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2">
              <Zap size={14} className="text-[#E8B18F]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F1E9DF]/80">
                Your next chapter starts here
              </span>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.05em] text-[#F8F1E9] sm:text-5xl lg:text-7xl">
              The right connection
              <br />
              <span className="font-serif font-normal italic text-[#E8B18F]">
                changes everything.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-[#F1E9DF]/65 sm:text-base">
              Your next collaborator, coding partner or great conversation could
              be one connection away. Make it happen.
            </p>

            <Link
              to="/login"
              className=" text-black group mt-10 inline-flex items-center gap-3 rounded-full bg-[#F0E8DD] px-8 py-4 text-sm font-bold text-[#542E20] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Join the community
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <p className="mt-6 text-[10px] font-medium tracking-wide text-[#F1E9DF]/40">
              Connect with people. Grow with purpose.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer className="border-t border-base-300 bg-base-200/45 px-5 pb-8 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr]">
            {/* Brand */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-content">
                  <Code2 size={21} />
                </div>
                <span className="text-xl font-black tracking-tight text-base-content">
                  Dev<span className="text-primary">Tinder</span>
                </span>
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-7 text-base-content/55">
                A community for developers to discover, connect and create
                meaningful relationships beyond the code.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <a
                  href="https://github.com/shahbaz806"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content/65 transition-all hover:border-primary hover:text-primary"
                >
                  <span className="text-sm font-black">GH</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/md-shahbaz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content/65 transition-all hover:border-primary hover:text-primary"
                >
                  <span className="text-sm font-black">in</span>
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-base-content">
                Explore
              </h4>
              <div className="mt-6 flex flex-col gap-4">
                {[
                  { label: "Features", href: "#features" },
                  { label: "How it works", href: "#how-it-works" },
                  { label: "About", href: "#about" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="w-fit text-sm text-base-content/55 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Account */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-base-content">
                Account
              </h4>
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  to="/login"
                  className="w-fit text-sm text-base-content/55 transition-colors hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="w-fit text-sm text-base-content/55 transition-colors hover:text-primary"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-base-content">
                Our Philosophy
              </h4>
              <p className="mt-6 text-sm leading-7 text-base-content/55">
                Good code builds products. Great connections build
                possibilities.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-primary">
                <Heart size={14} />
                Built for developers
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-base-300 py-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-base-content/45">
              © {new Date().getFullYear()} DevTinder. All rights reserved.
            </p>

            <p className="text-xs text-base-content/45">
              Made with care for the developer community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
