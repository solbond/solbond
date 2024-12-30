import { createFileRoute } from "@tanstack/react-router"
import { UploadIcon, EyeIcon, ArrowRight, ArrowLeft } from "lucide-react"
import { MinimalTiptapEditor } from "~/components/minimal-tiptap"
import { useForm } from "@tanstack/react-form"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useState } from "react"
import { motion } from "framer-motion"
import { $createProduct } from "~/actions/actions"
import { useAuth } from "~/context/FirebaseContext"
import { cn } from "~/lib/utils"
import { Badge } from "~/components/Badge"
import { Tag } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { TypingEffect } from "~/components/TypingEffect"

export interface ProductForm {
  name: string
  description: string
  image?: string
  price: number
  category: string
  tags: string[]
  documents: File[]
}

export const Route = createFileRoute("/_app/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const [step, setStep] = useState<"type" | "customize">("type")
  const [category, setCategory] = useState<string>("")
  const [description, setDescription] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const { user } = useAuth()
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [inputTag, setInputTag] = useState("")
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([])

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      image: "",
      price: 0,
      category: "",
      tags: [],
      documents: [],
    },
  })

  const productTypes = [
    {
      id: "digital",
      title: "Digital product",
      description: "Any set of files to download or stream.",
      category: "digital",
    },
    {
      id: "ai-model",
      title: "AI Model",
      description: "Share your trained AI models, datasets, or custom prompts.",
      category: "ai",
    },
    {
      id: "research",
      title: "Research & Analysis",
      description:
        "Share market research, technical analysis, or academic papers.",
      category: "research",
    },
    {
      id: "template",
      title: "Design System",
      description: "Share UI kits, design systems, or Figma templates.",
      category: "template",
    },
    {
      id: "course",
      title: "Course or tutorial",
      description: "Sell a single lesson or teach a whole cohort of students.",
      category: "course",
    },
    {
      id: "nft",
      title: "NFT",
      description: "Sell your unique digital assets.",
      category: "nft",
    },
    {
      id: "game-assets",
      title: "Game Assets",
      description: "Sell game mechanics, levels, or complete game templates.",
      category: "game",
    },
    {
      id: "api",
      title: "API Access",
      description: "Provide access to your specialized APIs and web services.",
      category: "api",
    },
    {
      id: "blockchain",
      title: "Web3 Solutions",
      description: "Smart contracts, DeFi tools, or blockchain integrations.",
      category: "blockchain",
    },
  ]

  const suggestedTags = [
    "software",
    "ebook",
    "template",
    "plugin",
    "audio",
    "video",
    "graphics",
    "wallpaper",
    "3d-model",
    "animation",
  ]

  const handleNextStep = () => {
    if (category) {
      const selectedType = productTypes.find((type) => type.id === category)
      if (selectedType) {
        form.setFieldValue("category", selectedType.category)
        setStep("customize")
      }
    }
  }

  const isFormValid = (values: ProductForm) => {
    return (
      values.name.trim() !== "" &&
      values.price > 0 &&
      values.category !== "" &&
      values.documents.length > 0
    )
  }

  const MAX_IMAGES = 4

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      if (uploadedImages.length + files.length > MAX_IMAGES) {
        alert(`You can only upload up to ${MAX_IMAGES} images`)
        return
      }

      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setUploadedImages((prev) => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleAddTag = (tag: string) => {
    const normalizedTag = tag.toLowerCase().trim().replace(/\s+/g, "_")
    if (
      normalizedTag &&
      !form.state.values.tags.includes(normalizedTag) &&
      form.state.values.tags.length < 5
    ) {
      form.setFieldValue("tags", [...form.state.values.tags, normalizedTag])
      setInputTag("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag(inputTag)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    form.setFieldValue(
      "tags",
      form.state.values.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  const uploadDocuments = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newDocuments = Array.from(files)
      setUploadedDocuments((prev) => [...prev, ...newDocuments])
      form.setFieldValue("documents", [...uploadedDocuments, ...newDocuments])
    }
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newTags = Array.from(form.state.values.tags)
    const [reorderedTag] = newTags.splice(result.source.index, 1)
    newTags.splice(result.destination.index, 0, reorderedTag)

    form.setFieldValue("tags", newTags)
  }

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} bytes`
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`
    }
  }

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase() || ""

    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension))
      return "🖼️"

    if (["doc", "docx"].includes(extension)) return "📝"
    if (["pdf"].includes(extension)) return "📕"
    if (["txt"].includes(extension)) return "📄"
    if (["xls", "xlsx"].includes(extension)) return "📊"
    if (["ppt", "pptx"].includes(extension)) return "📽️"

    if (["js", "jsx", "ts", "tsx"].includes(extension)) return "⚛️"
    if (["html", "css"].includes(extension)) return "🌐"
    if (["py"].includes(extension)) return "🐍"
    if (["json"].includes(extension)) return "{ }"

    if (["zip", "rar", "7z"].includes(extension)) return "🗜️"
    if (["mp3", "wav", "ogg"].includes(extension)) return "🎵"
    if (["mp4", "mov", "avi"].includes(extension)) return "🎬"
    if (["ai", "psd", "sketch"].includes(extension)) return "🎨"

    return "📄"
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto p-6">
        {step === "type" ? (
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
                  products. From educational content to collectibles — bring
                  your vision to life.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCategory(type.id)}
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-all",
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
              ))}
            </div>
            {category && (
              <button
                onClick={handleNextStep}
                className="mt-6 bg-[var(--neon-cyan)] dark:text-black text-white p-3 rounded-lg  items-center justify-center flex gap-2 hover:bg-opacity-90 font-pressStart"
              >
                Go to Step 2
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex gap-6 flex-col h-full w-full"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <button
                  type="button"
                  onClick={() => setStep("type")}
                  className="flex flex-row items-center gap-2 bg-inherit mb-[2em] text-black dark:text-white opacity-70 hover:opacity-100 transition-opacity border-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Step 1
                </button>

                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex flex-col md:flex-row gap-4">
                    <p className="text-sm font-semibold text-emerald-500 dark:text-emerald-400 flex items-center gap-4">
                      Step 2.
                    </p>
                    <h3 className="text-black font-pressStart text-xl dark:text-white">
                      Customize Your Product
                    </h3>
                  </div>

                  <div className="flex gap-2 items-center ml-4">
                    {[...Array(4)].map((_, index) => {
                      const filledFields = [
                        !!form.state.values.name,
                        !!description,
                        // uploadedImages.length > 0,
                        form.state.values.price > 0,
                        uploadedDocuments.length > 0,
                      ].filter(Boolean).length

                      return (
                        <div
                          key={index}
                          className={cn(
                            "w-3 h-3 rounded-full border-2 transition-all duration-300",
                            index < filledFields
                              ? "border-[var(--neon-cyan)] bg-[var(--neon-cyan)] shadow-[0_0_8px_var(--neon-cyan)]"
                              : "border-gray-300 dark:border-gray-600",
                          )}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/5 order-2 lg:order-1">
                {form.Field({
                  name: "tags",
                  children: (field) => (
                    <div className="mt-4 space-y-4">
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="tags" direction="vertical">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="flex flex-wrap gap-3 mb-4"
                            >
                              {field.state.value.map((tag, index) => (
                                <Draggable
                                  key={tag}
                                  draggableId={tag}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={cn(
                                        "flex items-center bg-black/10 dark:bg-white/5 backdrop-blur-sm border rounded-lg border-black/10 dark:border-[var(--neon-cyan)]/20 px-2 py-1.5 transition-all duration-300 hover:border-[var(--neon-cyan)] group",
                                        snapshot.isDragging && "shadow-lg",
                                      )}
                                    >
                                      <Tag className="w-4 h-4 text-black/70 dark:text-[var(--neon-cyan)]" />
                                      <Badge
                                        variant="selected"
                                        className="flex items-center gap-2 font-mono text-sm"
                                      >
                                        {tag}
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveTag(tag)}
                                          className="ml-1.5 text-lg hover:text-[var(--neon-cyan)] transition-colors duration-200"
                                        >
                                          ×
                                        </button>
                                      </Badge>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>

                      {field.state.value.length < 5 && (
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-cyan)]/10 to-emerald-500/10" />
                          <div className="absolute inset-0 border border-[var(--neon-cyan)]/20 transition-colors duration-300 group-hover:border-[var(--neon-cyan)]" />
                          <Input
                            type="text"
                            placeholder="#add_tag"
                            value={inputTag}
                            onChange={(e) =>
                              setInputTag(e.target.value.replace(/\s+/g, "_"))
                            }
                            onKeyDown={handleKeyDown}
                            className="relative text-center font-mono bg-transparent border-0 shadow-none placeholder:text-black/40 dark:placeholder:text-[var(--neon-cyan)] text-black dark:text-white px-4 py-3 transition-all duration-300 focus:shadow-[0_0_0_1px_var(--neon-cyan)] focus:bg-black/5 dark:focus:bg-white/5"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-r-2 border-t-2 border-[var(--neon-cyan)]/30" />
                          <div className="absolute left-3 bottom-3 w-4 h-4 border-l-2 border-b-2 border-[var(--neon-cyan)]/30" />
                        </div>
                      )}

                      <div className="mt-8">
                        <h4 className="text-sm font-mono text-black/60 dark:text-white/60 mb-3 uppercase tracking-wider">
                          Suggested Tags ({form.state.values.tags.length}/5)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {suggestedTags
                            .filter(
                              (tag) => !form.state.values.tags.includes(tag),
                            )
                            .map((tag) => (
                              <Badge
                                key={tag}
                                variant="suggested"
                                className="cursor-pointer px-3 py-1.5 text-black/70 dark:text-[var(--neon-cyan)] font-mono text-sm border border-[var(--neon-cyan)]/20 hover:border-[var(--neon-cyan)] transition-all duration-300 hover:bg-[var(--neon-cyan)]/5"
                                onClick={() => handleAddTag(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  ),
                })}
              </div>

              <div className="lg:w-3/5 order-1 lg:order-2 flex flex-col gap-8">
                <p className="text-sm lg:text-md text-gray-500 dark:text-gray-400 font-pressStart">
                  Category:{" "}
                  <span className="text-[var(--neon-cyan)]">
                    {productTypes.find((type) => type.id === category)?.title}
                  </span>
                </p>
                {form.Field({
                  name: "name",
                  children: (field) => (
                    <div className="w-full">
                      <Input
                        type="text"
                        placeholder="Product Name*"
                        className="h-12 border-b placeholder:font-pressStart text-md lg:text-lg font-semibold border-b-gray-300 dark:border-b-gray-700 hover:opacity-100 transition-all duration-300"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  ),
                })}

                {form.Field({
                  name: "description",
                  children: (field) => (
                    <motion.div
                      whileHover={{ scale: 1.005 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="text-sm lg:text-md font-pressStart font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Description*
                      </label>
                      <div className="relative rounded-xl  overflow-visible">
                        <MinimalTiptapEditor
                          onValueChange={(value) => setDescription(value)}
                          className="min-h-[200px] bg-inherit border-b border-b-gray-300 dark:border-b-gray-700 backdrop-blur-sm text-black dark:text-white"
                        />
                      </div>
                    </motion.div>
                  ),
                })}

                {form.Field({
                  name: "documents",
                  children: (field) => (
                    <motion.div
                      whileHover={{ scale: 1.005 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="font-pressStart text-md font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Documents*
                      </label>
                      <div
                        className={cn(
                          "grid gap-4",
                          uploadedDocuments.length > 0
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1",
                        )}
                      >
                        {uploadedDocuments.map((doc, index) => (
                          <div
                            key={index}
                            className="relative aspect-[3/2] rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-700 p-4 backdrop-blur-sm"
                          >
                            <div className="flex flex-col items-center justify-center h-full gap-2">
                              <div className="text-4xl">
                                {getFileIcon(doc.name)}
                              </div>
                              <div className="w-full px-2">
                                <p className="text-sm text-center text-gray-700 dark:text-gray-300 truncate max-w-full break-all">
                                  {doc.name.length > 20
                                    ? doc.name.slice(0, 20) + "..."
                                    : doc.name}
                                </p>
                              </div>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(doc.size)}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                const newDocs = uploadedDocuments.filter(
                                  (_, i) => i !== index,
                                )
                                setUploadedDocuments(newDocs)
                                form.setFieldValue("documents", newDocs)
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:opacity-50 transition-all duration-300"
                            >
                              ×
                            </button>
                          </div>
                        ))}

                        <motion.div
                          whileHover={{ borderColor: "var(--neon-cyan)" }}
                          className={cn(
                            "flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:bg-white/60 dark:hover:bg-black/30 transition-all duration-300 backdrop-blur-sm",
                            "aspect-[3/2]",
                            uploadedDocuments.length === 0
                              ? "col-span-full"
                              : "",
                          )}
                        >
                          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                            <div className="flex flex-col items-center justify-center p-4">
                              <UploadIcon className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                Add Documents
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              multiple
                              onChange={uploadDocuments}
                            />
                          </label>
                        </motion.div>
                      </div>
                    </motion.div>
                  ),
                })}

                {form.Field({
                  name: "image",
                  children: (field) => (
                    <motion.div
                      whileHover={{ scale: 1.005 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      <label className="font-pressStart text-md font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Product Images
                      </label>
                      <div
                        className={cn(
                          "grid gap-4",
                          uploadedImages.length > 0
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1",
                        )}
                      >
                        {uploadedImages.map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden"
                          >
                            <img
                              src={image}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() =>
                                setUploadedImages((prev) =>
                                  prev.filter((_, i) => i !== index),
                                )
                              }
                              className="absolute top-2 right-2 px-2 bg-black/50 rounded-full text-white hover:opacity-50 transition-all duration-300"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {uploadedImages.length < MAX_IMAGES && (
                          <motion.div
                            whileHover={{ borderColor: "var(--neon-cyan)" }}
                            className={cn(
                              "flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:bg-white/60 dark:hover:bg-black/30 transition-all duration-300 backdrop-blur-sm",
                              "aspect-square md:aspect-[2/1]",
                              uploadedImages.length === 0
                                ? "col-span-full"
                                : "",
                            )}
                          >
                            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                              <div className="flex flex-col items-center justify-center p-4">
                                <UploadIcon className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                  Add Image{" "}
                                  {uploadedImages.length > 0 &&
                                    `(${uploadedImages.length}/${MAX_IMAGES})`}
                                </p>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileUpload}
                              />
                            </label>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ),
                })}
              </div>

              <div className="lg:w-1/5 order-2 lg:order-3 flex flex-col justify-start gap-3">
                {form.Field({
                  name: "price",
                  children: (field) => (
                    <div className="w-full">
                      <Input
                        type="text"
                        placeholder="$price*"
                        className="h-12 border-b uppercase text-lg font-pressStart border-b-gray-300 dark:border-b-gray-700 hover:opacity-100 transition-all duration-300"
                        value={field.state.value ? `$${field.state.value}` : ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/^\$/, "")
                          if (/^\d*\.?\d*$/.test(value)) {
                            field.handleChange(Number(value))
                          }
                        }}
                      />
                    </div>
                  ),
                })}

                <Button
                  type="submit"
                  disabled={!isFormValid(form.state.values)}
                  className={cn(
                    "w-full font-pressStart relative overflow-hidden",
                    "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-cyan)]",
                    "text-white dark:text-black border border-[var(--neon-cyan)]",
                    "transition-all duration-300",
                    "before:absolute before:inset-0",
                    "before:bg-[length:200%_100%]",
                    "before:animate-shimmer",
                    "before:bg-[linear-gradient(110deg,transparent,rgba(20,241,149,0.3),transparent)]",
                    "text-lg py-6",
                    {
                      "opacity-50 cursor-not-allowed before:hidden":
                        !isFormValid(form.state.values),
                      "hover:shadow-[0_0_20px_rgba(20,241,149,0.5)] hover:-translate-y-0.5 hover:scale-[1.02]":
                        isFormValid(form.state.values),
                    },
                  )}
                >
                  Create
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPreview(true)}
                  className={cn(
                    "w-full font-pressStart relative",
                    "border-2 border-[var(--neon-cyan)]/30 bg-black/5 dark:bg-white/5",
                    "text-[var(--neon-cyan)] dark:text-[var(--neon-cyan)]",
                    "backdrop-blur-sm",
                    "transition-all duration-300",
                    "hover:border-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10",
                    "hover:shadow-[0_0_15px_rgba(20,241,149,0.2)]",
                    "group",
                  )}
                >
                  <EyeIcon className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Preview
                </Button>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  )
}
