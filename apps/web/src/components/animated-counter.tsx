import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
  from: number;
  to: number;
  type?: "onboarding" | "main";
};

function AnimatedCounter({ from, to, type }: CounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest);
  });
  const ref = useRef(null);
  const inView = useInView(ref);

  // while in view animate the count
  useEffect(() => {
    if (inView) {
      if (type === "onboarding") {
        animate(count, to, { duration: 3.5 });
      } else {
        animate(count, to, { duration: 2 });
      }
    }
  }, [count, inView, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export { AnimatedCounter };
