import { Variants } from 'framer-motion'

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Fade in from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Scale up
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Floating image animation for screensaver effect
export const floatingImage: Variants = {
  hidden: (custom: { startX: number; startY: number }) => ({
    opacity: 0,
    x: custom.startX,
    y: custom.startY,
    scale: 0.8,
    rotate: Math.random() * 10 - 5,
  }),
  visible: (custom: { endX: number; endY: number; delay: number }) => ({
    opacity: 1,
    x: custom.endX,
    y: custom.endY,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      delay: custom.delay,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
}

// Hover scale effect
export const hoverScale = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
}

// Image reveal (for galleries)
export const imageReveal: Variants = {
  hidden: {
    clipPath: 'inset(0 100% 0 0)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// Parallax scroll effect (use with useTransform)
export const parallaxConfig = {
  slow: { inputRange: [0, 1], outputRange: [0, -50] },
  medium: { inputRange: [0, 1], outputRange: [0, -100] },
  fast: { inputRange: [0, 1], outputRange: [0, -150] },
}

// Text reveal (letter by letter)
export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

// Nav link hover
export const navLinkHover = {
  rest: {
    width: 0,
  },
  hover: {
    width: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}
