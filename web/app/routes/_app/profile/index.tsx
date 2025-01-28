import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { motion } from "framer-motion"
import { SearchIcon, FilterIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useProfiles } from "~/context/ProfileContext"
import { Badge } from "~/components/Badge"
import {
  ChevronRightIcon,
  StarIcon,
  ThumbsUpIcon,
  MessageCircle,
} from "lucide-react"

export const Route = createFileRoute("/_app/profile/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useSearch()
  const { myProfile, otherProfiles } = useProfiles()

  const profile =
    id === myProfile.id
      ? myProfile
      : otherProfiles.find((p) => p.id === id) || myProfile

  const [userData, setUserData] = useState(profile)

  const [openFilter, setOpenFilter] = useState<string | null>(null)

  const filterOptions = {
    "Price Range": ["$0-50", "$51-100", "$101-200", "$200+"],
    Category: ["Digital Art", "Courses", "Templates", "Other"],
    Rating: ["5 stars", "4+ stars", "3+ stars", "All ratings"],
  }

  return (
    <div className="min-h-screen pt-10 ">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 p-4">
        <div className="w-full md:w-[300px] space-y-4">
          <div className="cyber-card flex items-center gap-3 p-3 bg-inherit backdrop-blur-xs rounded-xl border border-gray-200 dark:border-gray-800">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium">{userData.name}</div>
              <div className="text-sm text-gray-500">@{userData.username}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono">
                <ThumbsUpIcon size={14} />
                {userData.rating * 20}%
              </Badge>
              <button className="px-3 py-1.5 rounded-xl bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/20 transition-colors">
                <MessageCircle size={18} />
              </button>
            </div>
          </div>
          <div className="hidden md:block cyber-card bg-white dark:bg-black/40 backdrop-blur-xs rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center  border border-gray-200 dark:border-gray-800 rounded-xl p-2">
              <SearchIcon size={16} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent rounded-md p-2 placeholder:opacity-60 focus:outline-hidden focus:ring-none"
              />
            </div>
          </div>

          <div className="cyber-card bg-white dark:bg-black/40 backdrop-blur-xs rounded-xl p-4 space-y-4 border border-gray-200 dark:border-gray-800">
            <div className="space-y-2">
              <h3 className="font-semibold">About</h3>
              <p className="text-sm opacity-60">{userData.description}</p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Products Sold</span>
                <span className="font-semibold">
                  {userData.products.filter((product) => product.sold).length}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="opacity-60">Success Rate</span>
                <span className="font-semibold">94%</span>
              </div>
            </div>
          </div>

          <div className="cyber-card bg-white dark:bg-black/40 backdrop-blur-xs rounded-xl p-4 space-y-4 border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold">Filters</h3>
            <div className="space-y-2">
              {Object.keys(filterOptions).map((filter) => (
                <div key={filter} className="space-y-1">
                  <div
                    onClick={() =>
                      setOpenFilter(openFilter === filter ? null : filter)
                    }
                    className="flex items-center justify-between p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-sm cursor-pointer"
                  >
                    <span className="opacity-60">{filter}</span>
                    <ChevronRightIcon
                      className={`opacity-60 transition-transform ${openFilter === filter ? "rotate-90" : ""}`}
                      size={16}
                    />
                  </div>

                  {openFilter === filter && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 space-y-1"
                    >
                      {filterOptions[filter].map((option) => (
                        <div
                          key={option}
                          className="p-2 text-sm opacity-60 hover:opacity-100 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded-sm"
                        >
                          {option}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="md:hidden mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl p-3 placeholder:opacity-60 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:focus:ring-[var(--neon-cyan)]"
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              Products ({userData.products.length})
            </h2>
            <button className="cyber-card px-3 py-1.5 rounded-md bg-inherit text-[var(--neon-cyan)] hover:opacity-80 transition-all flex items-center gap-2">
              <FilterIcon size={16} />
              Sort by
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData.products.map((product) => (
              <Link
                key={product.id}
                to={`/profile/${userData.id}/product/${product.id}`}
                className="cyber-card bg-white dark:bg-black/40 backdrop-blur-xs rounded-xl overflow-hidden hover:scale-[1.02] transition-all cursor-pointer border border-gray-200 dark:border-gray-800"
              >
                <div className="relative h-[200px] w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-gray-300/10 backdrop-blur-xs text-[var(--neon-cyan)] font-semibold">
                    ${product.price}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <StarIcon
                      className="text-gray-400 dark:text-[var(--neon-cyan)]"
                      size={14}
                    />
                    <span className="opacity-60 text-sm">No ratings</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
