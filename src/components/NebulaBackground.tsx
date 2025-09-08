import { useEffect, useRef } from 'react';

interface NebulaBackgroundProps {
  scrollY: number;
}

export default function NebulaBackground({ scrollY }: NebulaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Nebula layers
    const nebulas = [
      {
        x: 0.2,
        y: 0.3,
        size: 400,
        color: 'rgba(255, 0, 255, 0.1)',
        speed: 0.1
      },
      {
        x: 0.8,
        y: 0.7,
        size: 300,
        color: 'rgba(0, 255, 255, 0.08)',
        speed: 0.05
      },
      {
        x: 0.5,
        y: 0.1,
        size: 500,
        color: 'rgba(255, 255, 0, 0.06)',
        speed: 0.08
      }
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nebulas.forEach((nebula, index) => {
        const parallaxOffset = scrollY * nebula.speed;
        const x = nebula.x * canvas.width;
        const y = nebula.y * canvas.height + parallaxOffset;

        // Create gradient for nebula
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, nebula.size);
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(0.5, nebula.color.replace(/[\d.]+\)$/g, '0.05)'));
        gradient.addColorStop(1, 'transparent');

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, nebula.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [scrollY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
