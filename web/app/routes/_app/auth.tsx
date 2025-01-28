import { createFileRoute } from "@tanstack/react-router"
// import { createUserWithEmailAndPassword } from "firebase/auth"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import LinkSentCase from "~/components/auth/LinkSentCase"
import SignInCase from "~/components/auth/SignInCase"
import SignUpCase from "~/components/auth/SignUpCase"
import VerifiedCase from "~/components/auth/VerifiedCase"
// import { useAuth } from "~/context/FirebaseContext"
import { auth } from "~/lib/firebase"
import { CyberTransition } from "~/components/transitions/CyberTransition"

export type ErrorType = {
  type: "email" | "password" | "other"
  message: string
} | null

function RouteComponent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const { user } = useAuth()

  const [currentCase, setCurrentCase] = useState<
    "signup" | "login" | "link-sent" | "verified" | "forgot-password"
  >("signup")

  const [isTransitioning, setIsTransitioning] = useState(true)

  useEffect(() => {
    setIsTransitioning(false)
  }, [])

  return (
    <>
      <CyberTransition isPresent={isTransitioning} />
      <div className="h-screen w-full overflow-hidden relative flex flex-col sm:flex-row">
        <div className="w-full sm:w-2/3 h-1/3 sm:h-full relative bg-linear-to-br from-emerald-500/80 to-cyan-500/80 dark:from-emerald-500/20 dark:to-cyan-500/20">
          <motion.div
            initial={{ scale: 1.5 }}
            animate={{ scale: [1.5, 1.7, 1.5] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            className="absolute bottom-[-20px] rotate-[30deg] left-[-20px] bg-white/10 w-[200px] h-[200px] rounded-2xl"
          >
            <motion.div className="bg-emerald-400/20 dark:bg-[var(--neon-cyan)]/20 w-[180px] absolute bottom-0 left-0 h-[180px] rounded-2xl"></motion.div>
            <motion.div className="bg-emerald-400/30 dark:bg-[var(--neon-cyan)]/30 w-[160px] absolute bottom-0 left-0 h-[160px] rounded-2xl"></motion.div>
            <motion.div className="bg-emerald-400/40 dark:bg-[var(--neon-cyan)]/40 w-[140px] absolute bottom-0 left-0 h-[140px] rounded-2xl"></motion.div>
            <motion.div className="bg-emerald-400/50 dark:bg-[var(--neon-cyan)]/50 w-[120px] absolute bottom-0 left-0 h-[120px] rounded-2xl"></motion.div>
          </motion.div>
        </div>

        {/* Right side - auth form */}
        <div className="w-full sm:w-1/3 bg-white dark:bg-black h-2/3 sm:h-full flex items-center justify-center z-10">
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="h-full w-full p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              key={currentCase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.4,
              }}
              className="w-full max-w-sm mx-auto"
            >
              {currentCase === "signup" && (
                <SignUpCase setCurrentCase={setCurrentCase} />
              )}
              {currentCase === "login" && (
                <SignInCase setCurrentCase={setCurrentCase} />
              )}
              {currentCase === "link-sent" && (
                <LinkSentCase
                  currentCase={currentCase}
                  setCurrentCase={setCurrentCase}
                />
              )}
              {currentCase === "verified" && <VerifiedCase />}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export const Route = createFileRoute("/_app/auth")({
  component: RouteComponent,
})
