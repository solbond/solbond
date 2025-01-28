import { useRouter } from "@tanstack/react-router"
// import { signOut } from "firebase/auth"
import { motion } from "framer-motion"
import { UserIcon, BellIcon, PlusIcon } from "lucide-react"
// import { useAuth } from "~/context/FirebaseContext"
import { auth } from "~/lib/firebase"
import { ArrowRightIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { useProfiles } from "~/context/ProfileContext"

export const Nav = () => {
  const router = useRouter()
  // const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const { myProfile } = useProfiles()

  const isHomeRoute = router.state.location.pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex z-100 justify-between border-b-[1px] bg-blur-sm shadow-xs dark:shadow-[0_1px_12px_-2px_var(--neon-cyan)] h-[37px] fixed top-0 left-0 right-0 items-center px-6"
      >
        <div className="flex items-center gap-4">
          <motion.h1
            className="text-xl font-bold text-emerald-800 dark:text-[var(--neon-cyan)]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link to="/">{isHomeRoute ? "Solbond" : "Back"}</Link>
          </motion.h1>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 text-emerald-800 dark:text-[var(--neon-cyan)] opacity-70 hover:opacity-100 transition-opacity"
          >
            <Link className="flex items-center gap-2" to="/new">
              <PlusIcon size={18} />
              <span className="text-sm">Create Product</span>
            </Link>
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 text-emerald-800 dark:text-[var(--neon-cyan)] opacity-70 hover:opacity-100 transition-opacity"
          >
            <Link
              className="flex items-center gap-2"
              to="/profile"
              search={{ id: myProfile.id }}
            >
              <UserIcon size={18} />
              <span className="text-sm">Profile</span>
            </Link>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: -37 }}
        animate={{ y: isScrolled ? 37 : -37 }}
        transition={{ duration: 0.3 }}
        className="flex z-99 justify-center border-b-[1px] bg-white/50 bg-blur-sm dark:bg-black/50 shadow-xs h-[37px] fixed top-0 left-0 right-0 items-center px-6 md:hidden"
      >
        <div className="flex items-center gap-6 md:hidden">
          <button className="px-3 py-1 uppercase text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[var(--neon-cyan)] transition-colors">
            Tags
          </button>
          <button className="px-3 py-1 uppercase text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[var(--neon-cyan)] transition-colors">
            Contains
          </button>
          <button className="px-3 py-1 uppercase text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[var(--neon-cyan)] transition-colors">
            Price
          </button>
          <button className="px-3 py-1 uppercase text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[var(--neon-cyan)] transition-colors">
            Trade
          </button>
        </div>
      </motion.div>
    </>
  )
}
