'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { CharacterReveal } from '@/components/animations/character-reveal';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <motion.div 
          className="hero-bg"
          style={{ y: backgroundY }}
        />
        
        {/* Interactive grid */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,61,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,61,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            x: mousePosition.x,
            y: mousePosition.y,
          }}
        />

        {/* Central content */}
        <motion.div
          className="text-center z-10"
          style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
        >
          <motion.h1 
            className="text-7xl md:text-[9rem] font-bold tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <span className="block">
              <CharacterReveal text="JHON" className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400" />
            </span>
            <span className="block">
              <CharacterReveal text="DOE" delay={8} className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 mt-6 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Creative Developer
          </motion.p>
        </motion.div>

        {/* Floating shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30 blur-3xl"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(255,61,0,0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)',
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div className="w-1 h-2 bg-white rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Work */}
      <section className="py-40 px-4 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-20">
            <h2 className="text-5xl md:text-7xl font-bold">Selected Work</h2>
            <Link href="/work" className="hidden md:block text-gray-400 hover:text-white transition-colors">
              View all projects →
            </Link>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.1}>
            <Link href="/work" className="group block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-cyan-500/30 group-hover:from-orange-500/50 group-hover:to-cyan-500/50 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    01
                  </motion.span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-orange-500 text-sm">Web Development</span>
                <h3 className="text-2xl font-bold mt-1 group-hover:text-orange-500 transition-colors">Elegant Web App</h3>
                <p className="text-gray-400 mt-2">A modern web application with cinematic animations</p>
              </div>
            </Link>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <Link href="/work" className="group block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 group-hover:from-cyan-500/50 group-hover:to-emerald-500/50 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    02
                  </motion.span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-cyan-500 text-sm">Mobile Design</span>
                <h3 className="text-2xl font-bold mt-1 group-hover:text-cyan-500 transition-colors">Mobile Fitness App</h3>
                <p className="text-gray-400 mt-2">iOS and Android fitness tracking app</p>
              </div>
            </Link>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <Link href="/work" className="group block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-purple-500/30 group-hover:from-emerald-500/50 group-hover:to-purple-500/50 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    03
                  </motion.span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-emerald-500 text-sm">Branding</span>
                <h3 className="text-2xl font-bold mt-1 group-hover:text-emerald-500 transition-colors">Brand Identity</h3>
                <p className="text-gray-400 mt-2">Complete brand identity system</p>
              </div>
            </Link>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <Link href="/work" className="group block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    04
                  </motion.span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-purple-500 text-sm">E-commerce</span>
                <h3 className="text-2xl font-bold mt-1 group-hover:text-purple-500 transition-colors">E-commerce Platform</h3>
                <p className="text-gray-400 mt-2">Full-featured online store</p>
              </div>
            </Link>
          </ScrollReveal>
        </div>

        <Link href="/work" className="md:hidden mt-8 text-gray-400 hover:text-white transition-colors">
          View all projects →
        </Link>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-40 px-4 max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-20">
            <h2 className="text-5xl md:text-7xl font-bold">Latest Posts</h2>
            <Link href="/blog" className="hidden md:block text-gray-400 hover:text-white transition-colors">
              Read all posts →
            </Link>
          </div>
        </ScrollReveal>
        
        <div className="space-y-8">
          <ScrollReveal delay={0.1}>
            <Link href="/blog/building-cinematic-web-experiences" className="group block border-b border-white/10 pb-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <span className="text-sm text-gray-500 shrink-0">April 26, 2026</span>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold group-hover:text-orange-500 transition-colors">
                    Building Cinematic Web Experiences
                  </h3>
                  <p className="text-gray-400 mt-2">
                    How to create immersive web experiences with smooth animations that captivate your audience.
                  </p>
                </div>
                <motion.span
                  className="hidden md:block text-4xl text-white/20 group-hover:text-orange-500"
                  whileHover={{ x: 10 }}
                >
                  →
                </motion.span>
              </div>
            </Link>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <Link href="/blog/art-of-modern-web-design" className="group block border-b border-white/10 pb-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <span className="text-sm text-gray-500 shrink-0">April 19, 2026</span>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold group-hover:text-orange-500 transition-colors">
                    The Art of Modern Web Design
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Exploring trends in digital design and interactions that shape the web today.
                  </p>
                </div>
                <motion.span
                  className="hidden md:block text-4xl text-white/20 group-hover:text-orange-500"
                  whileHover={{ x: 10 }}
                >
                  →
                </motion.span>
              </div>
            </Link>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <Link href="/blog/creative-development-workflow" className="group block">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <span className="text-sm text-gray-500 shrink-0">April 12, 2026</span>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold group-hover:text-orange-500 transition-colors">
                    Creative Development Workflow
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Tools and techniques for creative developers to build amazing experiences.
                  </p>
                </div>
                <motion.span
                  className="hidden md:block text-4xl text-white/20 group-hover:text-orange-500"
                  whileHover={{ x: 10 }}
                >
                  →
                </motion.span>
              </div>
            </Link>
          </ScrollReveal>
        </div>

        <Link href="/blog" className="md:hidden mt-8 text-gray-400 hover:text-white transition-colors">
          Read all posts →
        </Link>
      </section>

      {/* Contact */}
      <section className="py-40 px-4 text-center">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">Let&apos;s Work Together</h2>
            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s create something amazing.
            </p>
            <Link 
              href="mailto:hello@example.com" 
              className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-lg font-semibold transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500">© 2026 John Doe. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}