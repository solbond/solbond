import { createFileRoute } from "@tanstack/react-router"
import { ThumbsUpIcon, Tag, Heart, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "~/components/Badge"
import { cn } from "~/lib/utils"
import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { getFileIcon } from "~/constants/fileUtils"
import { Input } from "~/components/ui/input"

export interface ProductFile {
  name: string
  fileName: string
  icon: string
  quantity: number
  description: string
}

export const productFiles: ProductFile[] = [
  {
    name: "UI Kit Design",
    fileName: "ui-kit-design.json",
    quantity: 1,
    icon: getFileIcon("ui-kit-design.json"),
    description: "Code for the UI Kit Design",
  },
  {
    name: "Figma Template",
    quantity: 1,
    fileName: "figma-template.fig",
    icon: getFileIcon("figma-template.fig"),
    description:
      "Figma Template for the UI Kit Design which is fully customizable",
  },
  {
    name: "Design Guide",
    quantity: 1,
    fileName: "design-guide.pdf",
    icon: getFileIcon("design-guide.pdf"),
    description: "Design Guide for the UI Kit Design for design purposes",
  },
]

export const Route = createFileRoute("/_app/product")({
  component: RouteComponent,
})

function RouteComponent() {
  const [productQuantity, setProductQuantity] = useState(1)
  const seller = {
    name: "John Doe",
    username: "johndoe",
    profileImage: "https://api.multiavatar.com/JohnDoe.svg",
    rating: 4.5,
    numSold: 100,
  }

  const product = {
    name: "Premium Figma UI Kit",
    price: 100,
    quantity: 1,
    rating: 4.5,
    description:
      "A comprehensive UI kit containing over 1000+ components, perfectly organized and fully customizable. Includes dark mode, responsive layouts, and regular updates.",
    tags: ["ui-kit", "figma", "design"],
    mainImage: "https://robohash.org/nft-1484.png?set=set4&size=400x400",
    images: [
      "https://robohash.org/nft-1484.png?set=set4&size=400x400",
      "https://robohash.org/nft-1485.png?set=set4&size=400x400",
      "https://robohash.org/nft-1486.png?set=set4&size=400x400",
      "https://robohash.org/nft-1487.png?set=set4&size=400x400",
    ],
  }

  const [selectedImage, setSelectedImage] = useState(product.mainImage)
  const [isInWishlist, setIsInWishlist] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } catch (err) {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value >= 1) {
      setProductQuantity(value)
    }
  }
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="w-full aspect-square rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="space-y-6">
            <div>
              <div className="flex flex-row items-center gap-4 justify-between">
                <h1 className="text-2xl mb-2">{product.name}</h1>
                <span className="text-2xl font-pressStart text-[var(--neon-cyan)]">
                  ${product.price}
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-6">
                <div className="text-sm flex flex-row items-center gap-1 text-gray-500">
                  <img
                    src={seller.profileImage}
                    alt={seller.username}
                    className="w-4  rounded-full"
                  />{" "}
                  by{" "}
                  <Link
                    to={"/profile"}
                    className="font-medium hover:text-white/90 transition-colors duration-300"
                  >
                    @{seller.username}
                  </Link>
                </div>

                <div className="flex flex-row items-center gap-2">
                  {product.tags.map((tag) => (
                    <Badge
                      className="dark:bg-white/10 p-2 rounded-md bg-black/10"
                      key={tag}
                    >
                      <Tag size={16} />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg text-gray-500 font-mono dark:text-gray-300">
                This product contains:
              </h2>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  {productFiles.map((file) => (
                    <div
                      key={file.fileName}
                      className="flex items-center justify-between bg-inherit px-3 py-5 border-b border-gray-200 dark:border-gray-800"
                    >
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <span className="text-3xl">{file.icon}</span>
                        <div className="flex flex-col hover:cursor-pointer gap-2">
                          <span className="font-semibold text-lg underline">
                            {file.name.toUpperCase()}
                          </span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {file.description}
                          </p>

                          <span>Qty: {file.quantity}</span>
                        </div>
                      </div>
                      <span className="text-xl font-bold line-through">
                        $50
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-lg font-bold">Quantity:</span>
                    <Input
                      type="number"
                      value={productQuantity}
                      onChange={(e) => handleQuantityChange(e)}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className={cn(
                      "flex-1 relative overflow-hidden",
                      "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-cyan)]",
                      "text-white dark:text-black border border-[var(--neon-cyan)]",
                      "transition-all duration-300",
                      "before:absolute before:inset-0",
                      "before:bg-[length:200%_100%]",
                      "before:animate-shimmer",
                      "before:bg-[linear-gradient(110deg,transparent,rgba(20,241,149,0.3),transparent)]",
                      "text-lg py-4 rounded-xl font-bold",
                      "hover:shadow-[0_0_20px_rgba(20,241,149,0.5)]",
                    )}
                  >
                    Add to Cart
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setIsInWishlist(!isInWishlist)}
                    className={cn(
                      "p-4 rounded-xl border",
                      isInWishlist
                        ? "bg-[var(--neon-cyan)]/10 justify-center flex flex-row items-center gap-2 border-[var(--neon-cyan)] text-[var(--neon-cyan)]"
                        : "border-gray-200 dark:border-gray-800 justify-center flex flex-row items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5",
                    )}
                  >
                    {!isInWishlist ? (
                      <Heart size={24} className="text-[var(--neon-cyan)]" />
                    ) : null}
                    <span>
                      {isInWishlist
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={handleShare}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-black/5 dark:hover:bg-white/5 justify-center flex flex-row items-center gap-2"
                  >
                    <Share2 size={24} />
                    <span>Copy URL</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
