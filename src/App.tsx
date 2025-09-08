import { useCallback, useState, useEffect, useRef } from "react";
import Typewriter from 'typewriter-effect';
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { particlesConfig } from "./particleConfig";
import Cursor from "./cursor";

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [glitchText, setGlitchText] = useState('WILLIAM WIJAYA');

  // Refs for sections
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const resumeRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Parallax scroll effect
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1);
    return () => clearTimeout(timer);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Use middle of viewport

      const sections = [
        { id: 'home', ref: homeRef },
        { id: 'about', ref: aboutRef },
        { id: 'resume', ref: resumeRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef },
      ];

      let currentActiveSection = 'home';

      sections.forEach(({ id, ref }) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          const sectionBottom = sectionTop + ref.current.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentActiveSection = id;
          }
        }
      });

      setCurrentSection(currentActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const sectionRefs = {
      home: homeRef,
      about: aboutRef,
      resume: resumeRef,
      projects: projectsRef,
      contact: contactRef,
    };

    const targetRef = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
      const original = 'WILLIAM WIJAYA';
      let glitched = '';

      for (let i = 0; i < original.length; i++) {
        if (Math.random() < 0.1) {
          glitched += chars[Math.floor(Math.random() * chars.length)];
        } else {
          glitched += original[i];
        }
      }

      setGlitchText(glitched);

      setTimeout(() => setGlitchText(original), 100);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="pixel-loader mb-4"></div>
          <div className="text-cyan-400 font-pixel text-sm">INITIALIZING SPACE STATION...</div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'home', label: 'HOME', icon: '🏠' },
    { id: 'about', label: 'ABOUT', icon: '👨‍🚀' },
    { id: 'resume', label: 'RESUME', icon: '📄' },
    { id: 'projects', label: 'PROJECTS', icon: '🚀' },
    { id: 'contact', label: 'CONTACT', icon: '📡' },
  ];

  const projects = [
    {
      id: 1,
      title: 'MARS EXPLORER',
      description: 'AI-powered rover simulation with real-time data analysis',
      tech: ['React', 'Three.js', 'Python'],
      status: 'ACTIVE'
    },
    {
      id: 2,
      title: 'NEBULA DASHBOARD',
      description: 'Space data visualization platform for cosmic phenomena',
      tech: ['Vue.js', 'D3.js', 'Node.js'],
      status: 'BETA'
    },
    {
      id: 3,
      title: 'QUANTUM CHAT',
      description: 'Encrypted communication system for space missions',
      tech: ['WebRTC', 'Rust', 'WebAssembly'],
      status: 'PLANNED'
    }
  ];

  const skills = [
    { name: 'JAVASCRIPT', level: 95 },
    { name: 'REACT', level: 90 },
    { name: 'PYTHON', level: 85 },
    { name: 'NODE.JS', level: 80 },
    { name: 'THREE.JS', level: 75 },
    { name: 'RUST', level: 70 }
  ];

  return (
    <div className="w-full min-h-[100dvh] bg-black text-white overflow-x-hidden relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="fixed inset-0 z-0"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-1 md:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-item ${currentSection === item.id ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col h-full px-5">
        <section
          id="home"
          ref={homeRef}
          className="min-h-screen flex items-center justify-center relative px-4 flex-col text-center"
        >
          <div className="glitch-container mb-8">
            <h1 className="glitch-text text-4xl md:text-6xl font-pixel text-cyan-400 mb-4">
              {glitchText}
            </h1>
            <div className="flex text-pink-400 text-base md:text-lg font-pixel mb-6 gap-2 items-center justify-center">
              <span>&gt;</span>
              <Typewriter
                options={{
                  strings: ['SPACE DEVELOPER', 'DEDICATED TO EXCELLENCE', 'BRINGING IDEAS TO LIFE'],
                  autoStart: true,
                  loop: true,
                  skipAddStyles: true,
                }}
              />
              <span>&lt;</span>
            </div>

          </div>
          <p className="max-w-2xl mx-auto text-gray-300 font-pixel text-xs leading-relaxed mb-8">
            SPACE ENGINEER SPECIALIZING IN INTERGALACTIC WEB APPLICATIONS • BUILDING SCALABLE SYSTEMS THAT DEFY THE LAWS OF PHYSICS
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="pixel-button bg-cyan-600 hover:bg-cyan-500"
            >
              VIEW MISSIONS
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="pixel-button bg-pink-600 hover:bg-pink-500"
            >
              CONTACT BASE
            </button>
          </div>
        </section>

        {/* about */}
        <section
          id="about"
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center relative px-4 flex-col text-center"
        >
          <h2 className="text-3xl md:text-4xl font-pixel text-cyan-400 mb-8 text-center">
            ABOUT MISSION
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-card">
              <h3 className="text-2xl font-pixel text-pink-400 mb-4">COMMANDER PROFILE</h3>
              <div className="text-gray-300 font-pixel text-xs leading-relaxed space-y-4">
                <p>GREETINGS, EARTHLING! I AM WILLIAM, YOUR FRIENDLY NEIGHBORHOOD SPACE DEVELOPER.</p>
                <p>WITH 5+ YEARS OF EXPERIENCE NAVIGATING THE COSMIC WEB, I SPECIALIZE IN BUILDING STELLAR USER EXPERIENCES AND ROCKET-FAST APPLICATIONS.</p>
                <p>MY MISSION: TO BRIDGE THE GAP BETWEEN IMAGINATION AND DIGITAL REALITY.</p>
              </div>
            </div>
            <div className="space-card">
              <h3 className="text-2xl font-pixel text-pink-400 mb-4">SKILL MATRIX</h3>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-pixel text-xs text-gray-300">{skill.name}</span>
                      <span className="font-pixel text-xs text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="resume"
          ref={resumeRef}
          className="min-h-screen flex items-center justify-center relative px-4 flex-col text-center"
        >
          <h2 className="text-3xl md:text-4xl font-pixel text-cyan-400 mb-8 text-center">
            MISSION LOG
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-card">
              <h3 className="text-2xl font-pixel text-pink-400 mb-6">WORK EXPERIENCE</h3>
              <div className="space-y-6">
                <div className="timeline-item">
                  <div className="font-pixel text-sm text-cyan-400 mb-2">2023 - PRESENT</div>
                  <h4 className="font-pixel text-lg text-white mb-2">SENIOR SPACE DEVELOPER</h4>
                  <p className="font-pixel text-xs text-gray-400 mb-2">COSMIC TECH CORP</p>
                  <p className="text-gray-300 text-xs">Leading frontend missions across multiple star systems. Built 15+ interplanetary applications.</p>
                </div>
                <div className="timeline-item">
                  <div className="font-pixel text-sm text-cyan-400 mb-2">2021 - 2023</div>
                  <h4 className="font-pixel text-lg text-white mb-2">JUNIOR ASTRONAUT</h4>
                  <p className="font-pixel text-xs text-gray-400 mb-2">STELLAR SOLUTIONS INC</p>
                  <p className="text-gray-300 text-xs">Developed space-grade React applications. Reduced loading times by 40% across the galaxy.</p>
                </div>
              </div>
            </div>
            <div className="space-card">
              <h3 className="text-2xl font-pixel text-pink-400 mb-6">EDUCATION</h3>
              <div className="space-y-6">
                <div className="timeline-item">
                  <div className="font-pixel text-sm text-cyan-400 mb-2">2021</div>
                  <h4 className="font-pixel text-lg text-white mb-2">B.S. COMPUTER SCIENCE</h4>
                  <p className="font-pixel text-xs text-gray-400 mb-2">MARS TECHNICAL UNIVERSITY</p>
                  <p className="text-gray-300 text-xs">Specialized in quantum computing and space-time algorithms.</p>
                </div>
                <div className="timeline-item">
                  <div className="font-pixel text-sm text-cyan-400 mb-2">2019</div>
                  <h4 className="font-pixel text-lg text-white mb-2">SPACE CADET CERTIFICATION</h4>
                  <p className="font-pixel text-xs text-gray-400 mb-2">GALACTIC CODE ACADEMY</p>
                  <p className="text-gray-300 text-xs">Full-stack development bootcamp across 12 different planets.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={projectsRef}
          className="min-h-screen flex items-center justify-center relative px-4 flex-col text-center"
        >
          <h2 className="text-3xl md:text-4xl font-pixel text-cyan-400 mb-8 text-center">
            ACTIVE MISSIONS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="project-card group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-pixel text-white mb-2">{project.title}</h3>
                  <span className={`status-badge ${project.status === 'ACTIVE' ? 'bg-green-600' :
                    project.status === 'BETA' ? 'bg-yellow-600' : 'bg-purple-600'
                    }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-300 text-xs mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="pixel-button-small bg-cyan-600 hover:bg-cyan-500 w-full">
                  EXPLORE MISSION
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          ref={contactRef}
          className="min-h-screen flex items-center justify-center relative px-4 flex-col text-center"
        >
          <h2 className="text-3xl md:text-4xl font-pixel text-cyan-400 mb-8 text-center">
            CONTACT STATION
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-card">
              <h3 className="text-2xl font-pixel text-pink-400 mb-6">SEND TRANSMISSION</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="YOUR CALL SIGN"
                  className="space-input"
                />
                <input
                  type="email"
                  placeholder="COMMUNICATION FREQUENCY"
                  className="space-input"
                />
                <textarea
                  placeholder="MESSAGE TO SPACE STATION..."
                  rows={4}
                  className="space-input resize-none"
                ></textarea>
                <button
                  onClick={() => alert('MESSAGE TRANSMITTED TO SPACE STATION!')}
                  className="pixel-button bg-pink-600 hover:bg-pink-500 w-full"
                >
                  TRANSMIT MESSAGE
                </button>
              </div>
            </div>
            <div className="space-card">
              <h3 className="text-2xl font-pixel text-pink-400 mb-6">COMMUNICATION CHANNELS</h3>
              <div className="space-y-4">
                <a href="#" className="contact-link group">
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="font-pixel text-sm text-white group-hover:text-cyan-400 transition-colors">
                      EMAIL RELAY
                    </div>
                    <div className="font-pixel text-xs text-gray-400">
                      WILLIAM@spacecoder.dev
                    </div>
                  </div>
                </a>
                <a href="#" className="contact-link group">
                  <span className="text-2xl">💼</span>
                  <div>
                    <div className="font-pixel text-sm text-white group-hover:text-cyan-400 transition-colors">
                      LINKEDIN NETWORK
                    </div>
                    <div className="font-pixel text-xs text-gray-400">
                      /in/WILLIAMcosmic
                    </div>
                  </div>
                </a>
                <a href="#" className="contact-link group">
                  <span className="text-2xl">🐙</span>
                  <div>
                    <div className="font-pixel text-sm text-white group-hover:text-cyan-400 transition-colors">
                      GITHUB REPOSITORY
                    </div>
                    <div className="font-pixel text-xs text-gray-400">
                      /WILLIAMcosmic
                    </div>
                  </div>
                </a>
                <a href="#" className="contact-link group">
                  <span className="text-2xl">🐦</span>
                  <div>
                    <div className="font-pixel text-sm text-white group-hover:text-cyan-400 transition-colors">
                      TWITTER FEED
                    </div>
                    <div className="font-pixel text-xs text-gray-400">
                      @WILLIAMcosmic
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-gray-800 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-pixel text-xs text-gray-500">
            © 2025 WILLIAM WIJAYA • TRANSMITTED FROM EARTH ORBIT • ALL RIGHTS RESERVED ACROSS THE GALAXY
          </div>
        </div>
      </footer>


      {/* Scroll indicator */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="w-1 h-32 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-cyan-400 to-pink-500 transition-all duration-300 ease-out"
            style={{
              height: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
            }}
          />
        </div>
      </div>

      <Cursor />
    </div>
  );
}

export default App;