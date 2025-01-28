import { useRouter } from "@tanstack/react-router"
import { motion } from "framer-motion"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  ShoppingBagIcon,
  ThumbsUpIcon,
} from "lucide-react"
// import { signOut } from "firebase/auth"
// import { useAuth } from "~/context/FirebaseContext"
import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useProfiles } from "~/context/ProfileContext"
import Arrow from "../../../public/svg/arrow"
import Follow from "../../../public/svg/follow"

const USERS = [
  {
    name: "John Doe",
    image: "https://api.multiavatar.com/JohnDoe.svg",
  },
  {
    name: "John Doe",
    image: "https://api.multiavatar.com/JaneSmith.svg",
  },
]

const PRODUCTS = [
  {
    id: "3460",
    price: "22.37 SOL",
    lastSale: "20.2 SOL",
    image: `https://robohash.org/3460?set=set3`,
  },
  {
    id: "372",
    price: "22.45 SOL",
    lastSale: "11.38 SOL",
    image: `https://robohash.org/nft-3458.png?set=set4&size=400x400`,
  },
  {
    id: "7697",
    price: "22.4742 ETH",
    lastSale: "20.16 ETH",
    image: `https://robohash.org/nft-372.png?set=set3&size=400x400`,
  },
]

const CATEGORIES = [
  {
    title: "3D Assets",
    products: "152",
    image: `https://robohash.org/nft-3455.png?set=set4&size=400x400`,
  },
  {
    title: "Game Assets",
    products: "445",
    image: `https://robohash.org/nft-3456.png?set=set4&size=400x400`,
  },
  {
    title: "UI Templates",
    products: "328",
    image: `https://robohash.org/nft-3457.png?set=set4&size=400x400`,
  },
  {
    title: "Code",
    products: "328",
    image: `https://robohash.org/nft-3458.png?set=set4&size=400x400`,
  },

  {
    title: "Other",
    products: "328",
    image: `https://robohash.org/nft-3459.png?set=set4&size=400x400`,
  },
]

export const HeroRoute = () => {
  const router = useRouter()
  // const { user } = useAuth()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const { otherProfiles } = useProfiles()
  const johnDoe = otherProfiles[0] // John Doe's profile

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 2 >= CATEGORIES.length ? 0 : prev + 2))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 2 < 0 ? CATEGORIES.length - 2 : prev - 2))
  }

  const handleGetStarted = async () => {
    setIsExiting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    document.body.style.overflow = "hidden"
    localStorage.setItem("transitionState", "entering")
    router.navigate({ to: "/auth" })
  }

  return (
    <motion.div
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 0.95 : 1,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="flex flex-col mt-10 p-4 sm:flex-row pt-[82px] gap-6 w-full relative min-h-screen "
    >
      <div className="absolute inset-0 neon-grid"></div>

      <div className="w-full relative z-10 flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2 order-1">
          <div className="flex flex-col items-center relative justify-center p-4 leading-tight">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl lg:text-[84px] font-pressStart font-thin bg-clip-text flex"
            >
              {Array.from("SolBond").map((letter, index) => (
                <span key={index} className="relative">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.2,
                      ease: [0.45, 0.05, 0.55, 0.95],
                    }}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
                className="inline-block"
              >
                _
              </motion.span>
            </motion.h1>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              // onClick={() =>
              //   user ? signOut(auth) : router.navigate({ to: "/auth" })
              // }
            >
              {/* {user ? ( */}
              {true ? (
                <motion.div
                  initial={{ width: "36px", scale: 0 }}
                  animate={{ width: "140px", scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative border border-emerald-500/50 bg-black/5 dark:bg-black/40 backdrop-blur-xs overflow-hidden justify-end whitespace-nowrap dark:text-emerald-400 h-[44px] font-mono font-semibold rounded-full px-4 py-2 flex gap-2 items-center transition-all group"
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 dark:from-emerald-500/20 dark:via-cyan-500/20 dark:to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mr-auto relative z-10"
                  >
                    Logout
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="relative z-10"
                  >
                    <Arrow />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ width: "36px", scale: 0 }}
                  animate={{
                    width: "180px",
                    scale: isExiting ? 0 : 1,
                    opacity: isExiting ? 0 : 1,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="relative border border-emerald-500/50 bg-inherit dark:bg-black/40 backdrop-blur-xs overflow-hidden justify-end whitespace-nowrap dark:text-emerald-400 h-[44px] font-mono font-semibold rounded-full px-4 py-2 flex gap-2 items-center transition-all group cursor-pointer"
                >
                  <motion.div
                    className="absolute inset-0 bg-inherit opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />

                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mr-auto relative z-10"
                  >
                    Get Started
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="relative z-10"
                  >
                    <div className="rotate-90">
                      <Arrow />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.button>
          </div>

          <div className="overflow-hidden px-4 relative shadow-lg flex items-center w-full rounded-xl min-h-[400px] mb-[2em] md:mb-0 md:min-h-[200px]">
            <motion.div
              className="text-3xl w-[70%] relative z-20"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              <span className="font-light relative text-emerald-700 dark:text-[var(--neon-cyan)]">
                Your one-stop marketplace to{" "}
                <span className="text-emerald-700 dark:text-emerald-400 font-normal">
                  buy and sell digital products.
                </span>
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-[2px] bg-linear-to-r from-emerald-500 via-cyan-500 to-[var(--neon-cyan)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              />
            </motion.div>

            <motion.div
              animate={{
                x: [100, 0],
                y: [100, 0],
                rotate: [45, 0],
                scale: [0.8, 1],
              }}
              transition={{
                duration: 1.2,
                ease: [0.6, 0.01, -0.05, 0.95],
              }}
              className="absolute bottom-[-40px] right-[-20px] z-10"
            >
              <div className="relative">
                {[200, 180, 160, 140, 120].map((size, index) => (
                  <motion.div
                    key={size}
                    animate={{
                      x: [100, 0],
                      y: [100, 0],
                      rotate: [35 - index * 5, 0],
                      scale: [0.7 + index * 0.1, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.15 * index,
                      ease: [0.6, 0.01, -0.05, 0.95],
                    }}
                    className={`absolute bottom-0 right-0
                      bg-linear-to-br from-emerald-500/5 via-cyan-500/5 to-blue-500/5
                      dark:from-emerald-500/10 dark:via-cyan-500/10 dark:to-blue-500/10
                      rounded-2xl backdrop-blur-xs`}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-4 relative z-20 order-3 sm:order-last">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-sans tracking-[0.2em] uppercase font-semibold text-gray-800 dark:text-gray-200">
              popular categories
            </h2>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm font-mono">
                {Math.floor(currentIndex / 2) + 1} /{" "}
                {Math.ceil(CATEGORIES.length / 2)}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={prevSlide}
                  className="p-1 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-1 rounded-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-hidden snap-x snap-mandatory pb-4 md:pb-0">
              {(windowWidth < 768
                ? [...CATEGORIES, ...CATEGORIES.slice(0, 2)]
                : CATEGORIES.slice(currentIndex, currentIndex + 3)
              ).map((category, index) => (
                <motion.div
                  key={`${category.title}-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800
                    bg-linear-to-br from-black/5 via-black/0 to-black/5
                    dark:from-white/5 dark:via-white/0 dark:to-white/5
                    backdrop-blur-xs shadow-lg hover:shadow-2xl
                    transition-all duration-300
                    min-w-[calc(50%-0.5rem)] md:min-w-0 w-full snap-start"
                >
                  <div className="aspect-square overflow-hidden">
                    <div className="relative h-full w-full">
                      <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/0 to-black/60 z-10" />
                      <img
                        src={category.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="font-semibold text-lg text-white mb-1">
                      {category.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-200">
                      <ShoppingBagIcon size={14} />
                      <span>{category.products} products</span>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/50
                    dark:group-hover:border-[var(--neon-cyan)] rounded-xl transition-colors duration-300"
                  />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent
                      dark:via-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform
                      duration-1000"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10 w-full order-2 sm:order-none">
        <div className="flex items-center justify-center flex-col gap-2">
          <h2 className="text-[28px] text-emerald-800 dark:text-white text-opacity-85 font-normal text-center monospace neon-text">
            Your digital quest starts here
          </h2>
          <div className="border border-gray-300 my-4  gap-2 rounded-full w-full max-w-[500px] overflow-hidden flex items-center p-2">
            <SearchIcon className="text-gray-600 dark:text-neon-green" />
            <input
              type="text"
              placeholder="Explore"
              className="w-full bg-transparent outline-hidden text-gray-800 dark:text-white monospace"
            />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 mt-4 relative z-20 order-2">
            {["All", "NFTs", "Code", "Design", "3D Assets", "Game Assets"].map(
              (category) => (
                <motion.button
                  key={category}
                  className="relative uppercase px-4 py-2 text-sm font-mono group hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                  {category}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black dark:bg-[var(--neon-cyan)] origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </motion.button>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[johnDoe].map((profile, index) => (
            <Link
              key={index}
              to="/profile"
              search={{ id: profile.id }}
              className="group overflow-hidden rounded-2xl hover:scale-[1.02] transition-all duration-300 cyber-card"
            >
              <div className="flex gap-4 p-4">
                <div className="relative">
                  <div className="w-[64px] h-[64px] rounded-xl overflow-hidden">
                    <img
                      src={profile.avatar}
                      alt={`${profile.name}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-[16px] font-normal text-gray-900 dark:text-gray-100">
                        {profile.name}
                      </h2>
                      <p className="text-[12px] dark:text-[var(--neon-yellow)] text-gray-400">
                        Digital creator
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-[12px] px-3 h-7 font-medium rounded-lg
                       bg-inherit border hover:border-2 hover:border-emerald-700 dark:hover:border-[var(--neon-cyan)] transition-all"
                    >
                      <Follow />
                    </motion.button>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-[12px] text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <ShoppingBagIcon size={14} />
                      200 items
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUpIcon size={14} />
                      96% positive
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-sm font-sans tracking-[0.2em] uppercase font-semibold text-gray-800 dark:text-gray-200">
          trending now
        </h2>
        <div className="relative">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto sm:overflow-hidden snap-x snap-mandatory pb-4 sm:pb-0">
            {(windowWidth < 640 ? [...PRODUCTS, PRODUCTS[0]] : PRODUCTS).map(
              (product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="group overflow-hidden cyber-card rounded-2xl transition-all duration-300
                  bg-white dark:bg-black/40 shadow-lg hover:shadow-xl dark:[box-shadow:0_0_15px_rgba(139,92,246,0.3)]
                  min-w-[100%] sm:min-w-0 snap-start"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/80 backdrop-blur-md z-10">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          delay: 0.3,
                          duration: 0.8,
                        }}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-8 py-3 rounded-xl overflow-hidden bg-[#14F195]/5 group/btn"
                      >
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: [
                              "radial-gradient(200% 200% at 50% 50%, rgba(20, 241, 149, 0.05) 0%, rgba(20, 241, 149, 0) 50%)",
                              "radial-gradient(100% 100% at 50% 50%, rgba(20, 241, 149, 0.1) 0%, rgba(20, 241, 149, 0) 50%)",
                              "radial-gradient(200% 200% at 50% 50%, rgba(20, 241, 149, 0.05) 0%, rgba(20, 241, 149, 0) 50%)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100"
                          animate={{
                            background: [
                              "linear-gradient(45deg, rgba(20, 241, 149, 0) 0%, rgba(20, 241, 149, 0) 45%, rgba(20, 241, 149, 0.1) 50%, rgba(20, 241, 149, 0) 55%, rgba(20, 241, 149, 0) 100%)",
                              "linear-gradient(45deg, rgba(20, 241, 149, 0) 0%, rgba(20, 241, 149, 0) 40%, rgba(20, 241, 149, 0.2) 50%, rgba(20, 241, 149, 0) 60%, rgba(20, 241, 149, 0) 100%)",
                              "linear-gradient(45deg, rgba(20, 241, 149, 0) 0%, rgba(20, 241, 149, 0) 45%, rgba(20, 241, 149, 0.1) 50%, rgba(20, 241, 149, 0) 55%, rgba(20, 241, 149, 0) 100%)",
                            ],
                            backgroundPosition: [
                              "200% 200%",
                              "-100% -100%",
                              "200% 200%",
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100"
                          animate={{
                            boxShadow: [
                              "inset 0 0 20px rgba(20, 241, 149, 0.1)",
                              "inset 0 0 30px rgba(20, 241, 149, 0.2)",
                              "inset 0 0 20px rgba(20, 241, 149, 0.1)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        <motion.span
                          className="relative z-10 text-[#14F195] font-mono text-lg tracking-wide font-medium"
                          animate={{
                            textShadow: [
                              "0 0 8px rgba(20, 241, 149, 0.3)",
                              "0 0 12px rgba(20, 241, 149, 0.4)",
                              "0 0 8px rgba(20, 241, 149, 0.3)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          Buy Now
                        </motion.span>

                        <div className="absolute inset-0 border border-[#14F195]/20 rounded-xl group-hover/btn:border-[#14F195]/40 transition-colors duration-500" />

                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          animate={{
                            boxShadow: [
                              "0 0 15px rgba(20, 241, 149, 0.15), 0 0 25px rgba(20, 241, 149, 0.1)",
                              "0 0 20px rgba(20, 241, 149, 0.2), 0 0 35px rgba(20, 241, 149, 0.15)",
                              "0 0 15px rgba(20, 241, 149, 0.15), 0 0 25px rgba(20, 241, 149, 0.1)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.button>
                    </div>
                    <div className="relative h-full">
                      <img
                        src={product.image}
                        alt={`NFT #${product.id}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent dark:to-black/90 to-white/20 pointer-events-none" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-3 space-y-3 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[16px] sm:text-[14px] font-mono font-semibold text-gray-800 dark:text-gray-200">
                        #{product.id}
                      </span>
                      <span className="text-[16px] sm:text-[14px] font-mono font-bold text-emerald-500 dark:text-emerald-400">
                        {product.price}
                      </span>
                    </div>
                    <div className="text-[14px] sm:text-[12px] font-mono text-black/60 dark:text-[var(--neon-yellow)]">
                      Last sale: {product.lastSale}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
