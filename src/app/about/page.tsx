'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { CharacterReveal } from '@/components/animations/character-reveal';

const skills = [
  'React', 'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS',
  'Node.js', 'PostgreSQL', 'UI/UX Design', 'Figma', 'Git'
];

const timeline = [
  {
    year: '2024 - Present',
    role: 'Freelance Creative Developer',
    company: 'Self-employed',
    description: 'Building immersive web experiences for clients worldwide'
  },
  {
    year: '2021 - 2024',
    role: 'Senior Developer',
    company: 'Tech Studio',
    description: 'Led development of multiple award-winning web applications'
  },
  {
    year: '2018 - 2021',
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    description: 'Built products from ground up, scaled to 100k+ users'
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-500 to-cyan-500 mb-8"
        />
        
        <motion.h1 
          className="text-6xl md:text-8xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <CharacterReveal text="JOHN DOE" />
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-text-muted mt-6 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Creative Developer crafting immersive digital experiences with modern web technologies
        </motion.p>
      </section>

      {/* Bio */}
      <section className="py-32 px-4 max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-8">About</h2>
          <div className="space-y-6 text-lg text-text-muted leading-relaxed">
            <p>
              I&apos;m a creative developer passionate about building memorable web experiences. 
              With 8+ years in the industry, I specialize in combining technical excellence 
              with stunning visuals.
            </p>
            <p>
              My work focuses on smooth animations, intuitive interactions, and 
              performance-first architecture. Every project is an opportunity to 
              push boundaries and create something unique.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me exploring new design trends, 
              contributing to open source, or sharing knowledge with the community.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Skills */}
      <section className="py-32 px-4 max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-8">Skills</h2>
        </ScrollReveal>
        
        <div className="flex flex-wrap gap-4">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill} delay={i * 0.05}>
              <motion.span
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-lg"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 61, 0, 0.5)' }}
                transition={{ duration: 0.2 }}
              >
                {skill}
              </motion.span>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-4 max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-12">Experience</h2>
        </ScrollReveal>
        
        <div className="space-y-12">
          {timeline.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="flex flex-col md:flex-row md:gap-8">
                <span className="text-orange-400 shrink-0 w-32">{item.year}</span>
                <div>
                  <h3 className="text-xl font-bold">{item.role}</h3>
                  <p className="text-cyan-400">{item.company}</p>
                  <p className="text-text-muted mt-2">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 px-4 text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-text-muted mb-8">Let&apos;s create something amazing together</p>
          <Link 
            href="mailto:hello@example.com" 
            className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-lg font-semibold transition-colors"
          >
            Contact Me
          </Link>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-text-muted">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-orange-400 transition-colors">GitHub</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-orange-400 transition-colors">LinkedIn</a>
        </div>
        <p>&copy; 2026 John Doe</p>
      </footer>
    </main>
  );
}