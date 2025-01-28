import { createFileRoute } from "@tanstack/react-router"
import { ThumbsUpIcon, Tag, Heart, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "~/components/Badge"
import { cn } from "~/lib/utils"
import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Input } from "~/components/ui/input"
import { useProfiles } from "~/context/ProfileContext"

export const Route = createFileRoute(
  "/_app/profile/:profileId/product/:productId",
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { profileId, productId } = Route.useParams()
  const { myProfile, otherProfiles } = useProfiles()

  const profile =
    profileId === myProfile.id
      ? myProfile
      : otherProfiles.find((p) => p.id === profileId)

  if (!profile) {
    return <div>Profile not found</div>
  }

  const product = profile.products.find((p) => p.id === parseInt(productId))

  if (!product) {
    return <div>Product not found</div>
  }

  const [productQuantity, setProductQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product.image)
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
                    src={profile.avatar}
                    alt={profile.username}
                    className="w-4 rounded-full"
                  />{" "}
                  by{" "}
                  <Link
                    to={"/profile"}
                    search={{ id: profile.id }}
                    className="font-medium hover:text-white/90 transition-colors duration-300"
                  >
                    @{profile.username}
                  </Link>
                </div>

                <div className="flex flex-row items-center gap-2">
                  {product.tags &&
                    product.tags.map((tag) => (
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
                  {profile.products.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between bg-inherit px-3 py-5 border-b border-gray-200 dark:border-gray-800"
                    >
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        {/* <span className="text-3xl">{file.icon}</span> */}
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
                      "bg-linear-to-r from-[var(--neon-cyan)] to-[var(--neon-cyan)]",
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
