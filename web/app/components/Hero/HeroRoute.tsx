import {
  ArrowRightIcon,
  CornerUpRightIcon,
  MailIcon,
  SearchIcon,
  SendIcon,
  ShoppingCartIcon,
  ThumbsUpIcon,
} from "lucide-react"
import { FaDiscord, FaTwitter } from "react-icons/fa"
import { motion } from "framer-motion"

export const HeroRoute = () => {
  const users = [
    {
      name: "John Doe",
      image: "https://picsum.photos/100/100?random=1",
    },
    {
      name: "John Doe",
      image: "https://picsum.photos/100/100?random=1",
    },
  ]
  const products = [
    {
      name: "Product 1",
      image: "https://picsum.photos/400/400?random=2",
    },
    {
      name: "Product 2",
      image: "https://picsum.photos/400/400?random=3",
    },
  ]

  return (
    <div className="flex  p-2 pt-[82px] gap-2 w-full relative h-screen">
      <div className="w-full relative z-10 h-full flex flex-col gap-2">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="flex flex-col items-center relative justify-center p-4 leading-tight h-full w-full">
            <h1 className="text-[64px] font-bold z-10">Solbond</h1>
            <motion.button
              animate={{
                width: ["0px", "160px"],
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-black overflow-hidden justify-center whitespace-nowrap text-white h-[36px] font-semibold rounded-full px-4 p-2 flex gap-2 items-center"
            >
              Get Started <ArrowRightIcon size={20} />
            </motion.button>
          </div>
          <div className="bg-gradient-to-tr overflow-hidden relative shadow-lg flex items-center p-4 to-rose-400 from-rose-600 w-full h-full rounded-xl">
            <motion.h2
              className="text-white/60 absolute top-4 left-4 text-[18px] font-semibold"
              animate={{ x: [-200, 0] }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Solbond.co
            </motion.h2>
            <motion.p
              className="text-[28px] text-white w-[70%] "
              animate={{ y: [10, 0], filter: ["blur(10px)", "blur(0px)"] }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className=" font-semibold">
                Your one-stop marketplace to buy and sell digital products.
              </span>
            </motion.p>
            <motion.div
              animate={{
                x: [100, 0],
                y: [100, 0],
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute bottom-[-40px] scale-x-[1.5] right-[-20px]  bg-white/10 w-[200px] h-[200px] rounded-2xl"
            >
              <motion.div
                animate={{
                  x: [100, 0],
                  y: [100, 0],
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="bg-white/20 w-[180px] absolute bottom-0 right-0 h-[180px] rounded-2xl"
              ></motion.div>
              <motion.div
                animate={{
                  x: [100, 0],
                  y: [100, 0],
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="bg-white/30 w-[160px] absolute bottom-0 right-0 h-[160px] rounded-2xl"
              ></motion.div>
              <motion.div
                animate={{
                  x: [100, 0],
                  y: [100, 0],
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                className="bg-white/40 w-[140px] absolute bottom-0 right-0 h-[140px] rounded-2xl"
              ></motion.div>
              <motion.div
                animate={{
                  x: [100, 0],
                  y: [100, 0],
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                className="bg-white/50 w-[120px] absolute bottom-0 right-0 h-[120px] rounded-2xl"
              ></motion.div>
            </motion.div>
          </div>
        </div>
        <div className="h-[50%] w-full flex gap-2">
          <div className="bg-gradient-to-r p-2 flex flex-col gap-2 from-blue-400 to-blue-600 shadow-lg w-full h-full rounded-xl">
            <div className="bg-white flex items-start justify-center flex-col w-full h-[50%] rounded-xl p-2">
              <p className="text-[40px] px-3 font-semibold flex gap-1 items-end">
                4000{" "}
                <span className="text-[14px] font-normal mb-3">
                  Active users
                </span>
              </p>
              <div className="w-full bg-gray-200 relative rounded-full h-[10px] overflow-hidden">
                <motion.div
                  className="w-full absolute top-0 left-0 rounded-full h-[10px] bg-gradient-to-r from-blue-500 to-rose-500"
                  animate={{ x: ["-100%", 0] }}
                  transition={{
                    duration: 3,
                    ease: [0.165, 0.84, 0.44, 1],
                  }}
                ></motion.div>
              </div>
            </div>
            <div className="bg-white flex items-start justify-center flex-col w-full h-[50%] p-2 rounded-xl">
              <p className="text-[40px] px-3 font-semibold flex gap-1 items-end">
                13000{" "}
                <span className="text-[14px] mb-3 font-normal">
                  Products Sold
                </span>
              </p>
              <div className="w-full bg-gray-200 relative rounded-full h-[10px] overflow-hidden">
                <motion.div
                  className="w-full absolute top-0 left-0 rounded-full h-[10px] bg-gradient-to-r from-blue-500 to-rose-500"
                  animate={{ x: ["-100%", 0] }}
                  transition={{
                    duration: 3,
                    ease: [0.165, 0.84, 0.44, 1],
                    delay: 0.2,
                  }}
                ></motion.div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b gap-2 flex-col overflow-hidden relative flex items-center justify-center text-white  from-blue-400 to-blue-600 shadow-lg w-full h-full rounded-xl">
            <h2 className="text-[24px] font-semibold">Contact Us</h2>
            <div className="flex text-[14px] gap-2 font-semibold z-10">
              <motion.p
                animate={{
                  y: [10, 0],
                  opacity: [0, 1],
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                }}
                className="flex cursor-pointer gap-1 px-2 p-0.5 rounded-full hover:bg-white hover:text-black transition-colors duration-300 items-center"
              >
                <FaTwitter /> Twitter
              </motion.p>
              <motion.p
                animate={{
                  y: [10, 0],
                  opacity: [0, 1],
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: 0.2,
                }}
                className="flex cursor-pointer gap-1 px-2 p-0.5 rounded-full hover:bg-white hover:text-black transition-colors duration-300 items-center"
              >
                <FaDiscord /> Discord
              </motion.p>
              <motion.p
                animate={{
                  y: [10, 0],
                  opacity: [0, 1],
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: 0.4,
                }}
                className="flex cursor-pointer gap-1 px-2 p-0.5 rounded-full hover:bg-white hover:text-black transition-colors duration-300 items-center"
              >
                <SendIcon size={16} /> Email
              </motion.p>
            </div>
            <motion.div
              initial={{ rotate: "30deg", scaleX: 1.5 }}
              animate={{
                y: [100, 0],
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute bottom-[-100px] scale-x-[1.5] rotate-[30deg] left-[-20px]  bg-white/10 w-[200px] h-[200px] rounded-2xl"
            >
              <motion.div
                animate={{
                  y: [100, 0],
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="bg-white/20 w-[180px] absolute bottom-0 left-0 h-[180px] rounded-2xl"
              ></motion.div>
              <motion.div
                animate={{
                  y: [100, 0],
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="bg-white/30 w-[160px] absolute bottom-0 left-0 h-[160px] rounded-2xl"
              ></motion.div>
              <motion.div
                animate={{
                  y: [100, 0],
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                className="bg-white/40 w-[140px] absolute bottom-0 left-0 h-[140px] rounded-2xl"
              ></motion.div>
              <motion.div
                animate={{
                  y: [100, 0],
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                className="bg-white/50 w-[120px] absolute bottom-0 left-0 h-[120px] rounded-2xl"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-tr p-4 flex flex-col gap-2 shadow-lg from-rose-400 to-rose-600 rounded-xl relative z-10 w-full h-full">
        <motion.div
          initial={{ x: "-50%", scaleX: 2.4 }}
          animate={{
            y: [-100, 0],
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-[-124px]   left-[50%] translate-x-[-50%]  bg-white/10 w-[200px] h-[200px] rounded-2xl"
        >
          <motion.div
            initial={{ x: "-50%" }}
            animate={{
              y: [-100, 0],
            }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="bg-white/20 w-[180px] absolute top-0 left-[50%] translate-x-[-50%] h-[180px] rounded-2xl"
          ></motion.div>
          <motion.div
            initial={{ x: "-50%" }}
            animate={{
              y: [-100, 0],
            }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="bg-white/30 w-[160px] absolute top-0 left-[50%] translate-x-[-50%] h-[160px] rounded-2xl"
          ></motion.div>
          <motion.div
            initial={{ x: "-50%" }}
            animate={{
              y: [-100, 0],
            }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="bg-white/40 w-[140px] absolute top-0 left-[50%] translate-x-[-50%] h-[140px] rounded-2xl"
          ></motion.div>
          <motion.div
            initial={{ x: "-50%" }}
            animate={{
              y: [-100, 0],
            }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            className="bg-white/50 w-[120px] absolute top-0 left-[50%] translate-x-[-50%] h-[120px] rounded-2xl"
          ></motion.div>
        </motion.div>
        <div className=" flex items-center min-h-[25%] justify-center flex-col gap-2">
          <h2 className="text-[28px] text-white font-semibold">
            Your digital quest starts here
          </h2>
          <div className="bg-white gap-2 rounded-full w-[60%] overflow-hidden flex items-center p-2">
            <SearchIcon />
            <input
              type="text"
              placeholder="Explore"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 overflow ">
          {users.map((user, index) => (
            <div
              key={user.name}
              className={`bg-white overflow-hidden w-full rounded-xl ${
                index < 2 ? "col-span-1" : "col-span-2"
              }`}
            >
              <div
                className={`h-[100px] relative ${index === 1 ? "bg-gradient-to-tr from-orange-400 to-yellow-400" : "bg-gradient-to-b from-teal-400 to-teal-600"}`}
              >
                <button className="bg-black text-[12px] px-3 py-1 font-semibold rounded-full text-white absolute top-2 right-2">
                  Visit me!
                </button>
                <div className="absolute p-1 bottom-[-40px] left-[20px] w-[80px] h-[80px] bg-white rounded-full">
                  <img
                    src={user.image || "https://picsum.photos/100/100?random=1"}
                    alt={`${user.name}'s profile`}
                    className="w-full h-full rounded-full"
                  />
                </div>
              </div>
              <div className="p-4 text-end">
                <h2 className="text-[20px] font-semibold">{user.name}</h2>
                <p className="text-[14px] text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="w-full p-1 flex gap-1 text-[10px] self-start">
                <div className="bg-gray-200 font-semibold text-black/40 rounded-full px-2 py-1 w-fit">
                  200 sold
                </div>
                <div className="bg-gray-200 flex gap-1 font-semibold text-black/40 rounded-full px-2 py-1 w-fit">
                  96% <ThumbsUpIcon size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 overflow-hidden h-full ">
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`bg-white overflow-hidden flex justify-between flex-col w-full rounded-xl ${
                index < 2 ? "col-span-1" : "col-span-2"
              }`}
            >
              <div
                className={`h-[100px] overflow-hidden relative ${index === 1 ? "bg-gradient-to-tr from-orange-400 to-yellow-400" : "bg-gradient-to-b from-teal-400 to-teal-600"}`}
              >
                <img
                  src={
                    product.image || "https://picsum.photos/100/100?random=1"
                  }
                  alt={`${product.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-end">
                <h2 className="text-[20px] font-semibold">{product.name}</h2>
                <p className="text-[14px] text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="w-full p-2 flex gap-1 text-[10px] self-start">
                <div className="bg-gray-200 font-semibold text-black/40 rounded-full px-2 py-1 w-fit">
                  200 sold
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}