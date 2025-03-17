import { motion } from "framer-motion"

export const CyberTransition = ({ isPresent }: { isPresent: boolean }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        height: isPresent ? "100%" : "0%",
      }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "var(--background)",
        transformOrigin: "top",
        zIndex: 9999,
      }}
      className="flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: isPresent ? [0, 1.2, 1] : [1, 0],
          rotate: isPresent ? [0, 45, 0] : [0, -45, 0],
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="w-32 h-32 relative"
      >
        <div className="absolute inset-0 border-4 border-emerald-500/50 rounded-xl animate-pulse" />
        <div className="absolute inset-2 border-4 border-cyan-500/50 rounded-xl animate-pulse delay-75" />
        <div className="absolute inset-4 border-4 border-blue-500/50 rounded-xl animate-pulse delay-150" />
      </motion.div>
    </motion.div>
  )
}
