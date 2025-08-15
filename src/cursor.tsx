import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Track mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Trigger on any visible text or button-like element
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "P" ||
        target.tagName === "SPAN" ||
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3"
      ) {
        console.log("masuk")
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      {/* Outer circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 border-sky-400"
        style={{
          translateX: springX,
          translateY: springY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: isHovering ? 70 : 45,
          height: isHovering ? 70 : 45,
          borderColor: isHovering ? "#fbbf24" : "#38bdf8",
          boxShadow: isHovering
            ? "0 0 25px rgba(251,191,36,0.8)"
            : "0 0 15px rgba(56,189,248,0.7)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-sky-400"
        style={{
          translateX: springX,
          translateY: springY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: isHovering ? 14 : 10,
          height: isHovering ? 14 : 10,
          backgroundColor: isHovering ? "#fbbf24" : "#38bdf8",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />
    </>
  );
};

export default Cursor;
