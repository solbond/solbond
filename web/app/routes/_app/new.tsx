import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "~/lib/utils"
import { TypingEffect } from "~/components/TypingEffect"
import { useNavigate } from "@tanstack/react-router"
import { productTypes } from "~/constants/productTypes"
import Arrow from "../../../public/svg/arrow"

function RouteComponent() {
  const [category, setCategory] = useState<string>("")
  const navigate = useNavigate()

  const handleNextStep = () => {
    if (category) {
      const selectedType = productTypes.find((type) => type.id === category)
      if (selectedType) {
        navigate({
          to: "/new-edit",
          search: { category: selectedType.category },
        })
      }
    }
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto p-6">
        <div className="space-y-8 flex flex-col items-center text-center">
          <div className="flex flex-col sm:flex-row items-center md:items-start justify-between w-full gap-4">
            <div className="flex flex-col text-left w-full md:w-[55%] gap-4">
              <p>Step 1</p>

              <TypingEffect
                text="Let's Create Something"
                delay={50}
                className="text-3xl font-pressStart font-bold text-gray-900 dark:text-white"
              />

              <p>
                Transform your expertise and digital assets into market-ready
                products. From educational content to collectibles — bring your
                vision to life.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setCategory(type.id)}
                className="cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all",
                    "hover:shadow-lg hover:border-[var(--neon-cyan)]",
                    category === type.id
                      ? "border-[var(--neon-cyan)] bg-[#14F195]/10"
                      : "border-gray-300 dark:border-gray-700",
                  )}
                >
                  <motion.h3
                    className="font-semibold mb-1"
                    animate={
                      category === type.id
                        ? {
                            color: "var(--neon-cyan)",
                            textShadow: "0 0 10px rgba(20, 241, 149, 0.5)",
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {type.title}
                  </motion.h3>
                  <p
                    className={cn(
                      "text-sm text-black dark:text-white",
                      category === type.id ? "opacity-100" : "opacity-60",
                    )}
                  >
                    {type.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
          {category && (
            <button
              onClick={handleNextStep}
              className="mt-6 bg-[var(--neon-cyan)] dark:text-black text-white p-3 rounded-lg items-center justify-center flex gap-2 hover:bg-opacity-90 font-pressStart"
            >
              Go to Step 2
              <div className="transform rotate-90">
                <Arrow />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/_app/new")({
  component: RouteComponent,
})
