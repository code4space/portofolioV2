import { useEffect, useRef } from 'react';

interface StarFieldProps {
  scrollY: number;
}

export default function StarField({ scrollY }: StarFieldProps) {
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

    // Generate stars
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
    }> = [];

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.7 ? '#00ffff' : '#ffffff'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Parallax movement
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Twinkling effect
        const twinkle = Math.sin(Date.now() * 0.001 + star.x * 0.01) * 0.3 + 0.7;
        
        ctx.save();
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.size * 2;
        ctx.shadowColor = star.color;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)'
      }}
    />
  );
}
