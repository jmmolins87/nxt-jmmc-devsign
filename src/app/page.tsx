'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CharacterReveal } from '@/components/animations/character-reveal';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="hero-bg" />
        
        <motion.h1 
          className="text-8xl md:text-[10rem] font-bold text-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CharacterReveal text="JHON" />
          <br />
          <CharacterReveal text="DOE" delay={10} />
        </motion.h1>
        
        <motion.p 
          className="text-2xl md:text-4xl text-text-muted mt-8 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Creative Developer
        </motion.p>
        
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="scroll-indicator" />
        </motion.div>
      </section>

      <section className="py-32 px-4 max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-6xl font-bold mb-16">Featured Work</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.1}>
            <Link href="/work" className="project-card block">
              <div className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                <motion.div 
                  className="w-full h-full bg-gradient-to-br from-orange-500/20 to-cyan-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3 className="text-2xl font-bold mt-4">Project One</h3>
              <p className="text-text-muted">Web Application</p>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link href="/work" className="project-card block">
              <div className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                <motion.div 
                  className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3 className="text-2xl font-bold mt-4">Project Two</h3>
              <p className="text-text-muted">Mobile Design</p>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link href="/work" className="project-card block">
              <div className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                <motion.div 
                  className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-orange-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3 className="text-2xl font-bold mt-4">Project Three</h3>
              <p className="text-text-muted">Branding</p>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Link href="/work" className="project-card block">
              <div className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                <motion.div 
                  className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3 className="text-2xl font-bold mt-4">Project Four</h3>
              <p className="text-text-muted">E-commerce</p>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-32 px-4 max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-6xl font-bold mb-16">Latest Posts</h2>
        </ScrollReveal>
        
        <div className="space-y-8">
          <ScrollReveal delay={0.1}>
            <Link href="/blog" className="block border-b border-white/10 pb-8">
              <span className="text-sm text-text-muted">April 26, 2026</span>
              <h3 className="text-3xl font-bold mt-2">Building Cinematic Web Experiences</h3>
              <p className="text-text-muted mt-2">How to create immersive web experiences with smooth animations...</p>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link href="/blog" className="block border-b border-white/10 pb-8">
              <span className="text-sm text-text-muted">April 19, 2026</span>
              <h3 className="text-3xl font-bold mt-2">The Art of Modern Web Design</h3>
              <p className="text-text-muted mt-2">Exploring trends in digital design and interactions...</p>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link href="/blog" className="block pb-8">
              <span className="text-sm text-text-muted">April 12, 2026</span>
              <h3 className="text-3xl font-bold mt-2">Creative Development Workflow</h3>
              <p className="text-text-muted mt-2">Tools and techniques for creative developers...</p>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-32 px-4 text-center">
        <ScrollReveal>
          <h2 className="text-6xl font-bold mb-8">Let&apos;s Work Together</h2>
          <Link href="mailto:hello@example.com" className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-lg font-semibold transition-colors">
            Get in Touch
          </Link>
        </ScrollReveal>
      </section>

      <footer className="py-8 px-4 text-center text-text-muted">
        <p>&copy; 2026 John Doe. All rights reserved.</p>
      </footer>
    </main>
  );
}