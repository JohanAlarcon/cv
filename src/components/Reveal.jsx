// src/components/Reveal.jsx
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Revelado al entrar en viewport. Una sola animación por bloque:
 * nada de motion.div anidados que se disparan a la vez al cargar la página.
 * Si el usuario pide menos movimiento, el contenido aparece sin transición.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  x = 0,
  duration = 0.55,
  once = true,
  style,
  ...rest
}) {
  const reduce = useReducedMotion();

  // Sin IntersectionObserver (rastreadores antiguos, navegadores sin soporte)
  // `whileInView` nunca se dispararía y la sección quedaría invisible.
  const canObserve = typeof window !== 'undefined' && 'IntersectionObserver' in window;

  if (reduce || !canObserve) return <div style={style}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-80px 0px -80px 0px' }}
      transition={{ duration, delay, ease: EASE }}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
