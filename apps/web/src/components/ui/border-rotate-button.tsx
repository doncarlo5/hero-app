import { motion } from 'framer-motion'

const BorderRotateButton = () => {
  return (
    <motion.button
      className="relative flex overflow-hidden rounded-full"
      initial={{
        scale: 1,
        padding: '3px',
      }}
      
      whileTap={{
        scale: 0.98,
        opacity: 0.8,
      }}
      // whileHover={{
      //   padding: '0px',
      //   scale: 1.05,
      // }}
      transition={{
        stiffness: 500,
        damping: 20,
        type: 'spring',
      }}
    >
      <motion.span
        className="absolute inset-[-1000%] bg-[conic-gradient(from_calc(var(--border-rotate-button-angle)+60deg)_at_calc(50%+var(--border-rotate-button-x))_50%,#14b8a6_50%,#e6fffa_98%,#14b8a6_100%)]"
        initial={
          {
            '--border-rotate-button-angle': '0deg',
            '--border-rotate-button-x': '20px',
          } as any
        }
        animate={
          {
            '--border-rotate-button-angle': '360deg',
            '--border-rotate-button-x': ['18px', '-18px', '18px'],
          } as any
        }
        transition={{
          '--border-rotate-button-angle': {
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          },
          '--border-rotate-button-x': {
            duration: 6,
            repeat: Infinity,
            ease: [0.445, 0.05, 0.55, 0.95],
            times: [0, 0.5, 1],
          },
        }}
      />

      <span className="rounded-full font-medium  dark:bg-zinc-950 dark:bg-opacity-95 bg-zinc-950 px-7 py-2 text-sm text-[#f6f6f6] backdrop-blur-sm">
        Start now
      </span>
    </motion.button>
  )
}

export default BorderRotateButton