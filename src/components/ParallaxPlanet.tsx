import { useEffect, useRef, useState } from 'react';

interface ParallaxPlanetProps {
  type: 'home' | 'about' | 'resume' | 'projects' | 'contact';
  scrollY: number;
  sectionRef: React.RefObject<HTMLElement | null>;
}

const planetConfigs = {
  home: {
    size: 200,
    color: 'linear-gradient(45deg, #ff6b6b, #ff8e8e, #ffb3b3)',
    orbitRadius: 300,
    speed: 0.5,
    position: { x: 0.2, y: 0.3 },
    rings: true,
    atmosphere: true,
    name: 'NEXUS PRIME'
  },
  about: {
    size: 150,
    color: 'linear-gradient(45deg, #4ecdc4, #44a08d, #093637)',
    orbitRadius: 250,
    speed: 0.3,
    position: { x: 0.8, y: 0.2 },
    rings: false,
    atmosphere: true,
    name: 'AQUA WORLD'
  },
  resume: {
    size: 180,
    color: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
    orbitRadius: 280,
    speed: 0.4,
    position: { x: 0.1, y: 0.7 },
    rings: true,
    atmosphere: false,
    name: 'CRYSTAL SPHERE'
  },
  projects: {
    size: 220,
    color: 'linear-gradient(45deg, #f093fb, #f5576c, #4facfe)',
    orbitRadius: 320,
    speed: 0.6,
    position: { x: 0.9, y: 0.6 },
    rings: true,
    atmosphere: true,
    name: 'NEBULA CORE'
  },
  contact: {
    size: 160,
    color: 'linear-gradient(45deg, #43e97b, #38f9d7, #00c9ff)',
    orbitRadius: 260,
    speed: 0.35,
    position: { x: 0.5, y: 0.8 },
    rings: false,
    atmosphere: true,
    name: 'COMMUNICATION HUB'
  }
};

export default function ParallaxPlanet({ type, scrollY, sectionRef }: ParallaxPlanetProps) {
  const planetRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const config = planetConfigs[type];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const checkVisibility = () => {
      if (sectionRef.current && planetRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const planetRect = planetRef.current.getBoundingClientRect();
        
        // Check if section is in viewport
        const sectionInView = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
        setIsVisible(sectionInView);
      }
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    return () => window.removeEventListener('scroll', checkVisibility);
  }, [sectionRef]);

  // Reduce parallax effect on mobile for better performance
  const parallaxOffset = isMobile ? scrollY * config.speed * 0.3 : scrollY * config.speed;
  const rotation = (scrollY * 0.1) % 360;
  
  // Scale down planets on mobile
  const planetSize = isMobile ? config.size * 0.6 : config.size;

  return (
    <div
      ref={planetRef}
      className={`fixed pointer-events-none transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-30'
      }`}
      style={{
        left: `${config.position.x * 100}%`,
        top: `${config.position.y * 100}%`,
        transform: `translate(-50%, -50%) translateY(${-parallaxOffset}px)`,
        zIndex: 1
      }}
    >
      {/* Planet Container */}
      <div className="relative">
        {/* Atmosphere Glow - Disabled on mobile for performance */}
        {config.atmosphere && !isMobile && (
          <div
            className="absolute inset-0 rounded-full opacity-60 blur-xl animate-pulse"
            style={{
              width: planetSize * 1.5,
              height: planetSize * 1.5,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: config.color,
              filter: 'blur(20px)'
            }}
          />
        )}

        {/* Main Planet */}
        <div
          className="relative rounded-full shadow-2xl"
          style={{
            width: planetSize,
            height: planetSize,
            background: config.color,
            transform: `rotate(${rotation}deg)`,
            boxShadow: isMobile ? `
              inset -10px -10px 25px rgba(0, 0, 0, 0.3),
              inset 10px 10px 25px rgba(255, 255, 255, 0.1),
              0 0 25px rgba(255, 255, 255, 0.2)
            ` : `
              inset -20px -20px 50px rgba(0, 0, 0, 0.3),
              inset 20px 20px 50px rgba(255, 255, 255, 0.1),
              0 0 50px rgba(255, 255, 255, 0.2)
            `
          }}
        >
          {/* Planet Surface Details */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Surface patterns */}
            <div
              className="absolute w-full h-full opacity-30"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 2px, transparent 2px),
                  radial-gradient(circle at 70% 70%, rgba(0,0,0,0.3) 1px, transparent 1px),
                  radial-gradient(circle at 50% 20%, rgba(255,255,255,0.2) 3px, transparent 3px)
                `
              }}
            />
          </div>

          {/* Planet Rings - Simplified on mobile */}
          {config.rings && (
            <>
              <div
                className="absolute rounded-full border-2 opacity-60"
                style={{
                  width: planetSize * 1.8,
                  height: planetSize * 1.8,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  animation: isMobile ? 'none' : 'ringRotate 20s linear infinite'
                }}
              />
              {!isMobile && (
                <div
                  className="absolute rounded-full border opacity-40"
                  style={{
                    width: planetSize * 2.2,
                    height: planetSize * 2.2,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    animation: 'ringRotate 30s linear infinite reverse'
                  }}
                />
              )}
            </>
          )}

          {/* Orbiting Moons/Satellites - Simplified on mobile */}
          {!isMobile && (
            <div
              className="absolute rounded-full bg-gray-300 opacity-80"
              style={{
                width: planetSize * 0.2,
                height: planetSize * 0.2,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${rotation * 2}deg) translateX(${config.orbitRadius}px)`,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}
            />
          )}
        </div>

        {/* Planet Label */}
        <div
          className="absolute font-pixel text-xs text-cyan-400 text-center whitespace-nowrap"
          style={{
            top: planetSize + 20,
            left: '50%',
            transform: 'translateX(-50%)',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
            fontSize: isMobile ? '8px' : '12px'
          }}
        >
          {config.name}
        </div>

        {/* Connection Lines to Section - Simplified on mobile */}
        {!isMobile && (
          <div
            className="absolute opacity-30"
            style={{
              width: '2px',
              height: '100px',
              background: 'linear-gradient(to bottom, transparent, #00ffff, transparent)',
              left: '50%',
              top: planetSize + 40,
              transform: 'translateX(-50%)',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes ringRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
