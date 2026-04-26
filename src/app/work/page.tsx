'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

const projects = [
  {
    id: 1,
    title: 'Elegant Web App',
    category: 'Web Development',
    description: 'A modern web application with cinematic animations',
    gradient: 'from-orange-500/30 to-cyan-500/30',
  },
  {
    id: 2,
    title: 'Mobile Fitness App',
    category: 'Mobile Design',
    description: 'iOS and Android fitness tracking app',
    gradient: 'from-cyan-500/30 to-emerald-500/30',
  },
  {
    id: 3,
    title: 'Brand Identity',
    category: 'Branding',
    description: 'Complete brand identity system',
    gradient: 'from-emerald-500/30 to-purple-500/30',
  },
  {
    id: 4,
    title: 'E-commerce Platform',
    category: 'E-commerce',
    description: 'Full-featured online store',
    gradient: 'from-purple-500/30 to-pink-500/30',
  },
  {
    id: 5,
    title: 'Dashboard UI',
    category: 'UI/UX Design',
    description: 'Analytics dashboard for SaaS',
    gradient: 'from-pink-500/30 to-orange-500/30',
  },
  {
    id: 6,
    title: 'Creative Agency Site',
    category: 'Web Development',
    description: 'Portfolio site for creative agency',
    gradient: 'from-orange-500/30 to-emerald-500/30',
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-32 px-4 text-center">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Work
        </motion.h1>
        <motion.p 
          className="text-xl text-text-muted max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Selected projects showcasing design and development work
        </motion.p>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <Link href="#" className="project-card block">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <motion.div 
                    className={`w-full h-full bg-gradient-to-br ${project.gradient}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="mt-4">
                  <span className="text-sm text-orange-400">{project.category}</span>
                  <h3 className="text-2xl font-bold mt-1">{project.title}</h3>
                  <p className="text-text-muted mt-2">{project.description}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 text-center text-text-muted">
        <Link href="mailto:hello@example.com" className="text-orange-400 hover:text-orange-300">
          Interested in working together?
        </Link>
      </footer>
    </main>
  );
}