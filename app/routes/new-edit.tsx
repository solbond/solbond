import { createFileRoute } from "@tanstack/react-router"
import { EyeIcon } from "lucide-react"
import { MinimalTiptapEditor } from "~/components/minimal-tiptap"
import { useForm } from "@tanstack/react-form"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
// import { $createProduct } from "~/actions/actions"
// import { useAuth } from "~/context/FirebaseContext"
import { cn } from "~/lib/utils"
import { Badge } from "~/components/Badge"
import { Tag } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useNavigate } from "@tanstack/react-router"
import Arrow from "../../public/svg/arrow"
import File from "../../public/svg/file"
import Remove from "../../public/svg/remove"

import {
  suggestedTags,
  getFileIcon,
  formatFileSize,
} from "~/constants/fileUtils"

export interface ProductForm {
  name: string
  description: string
  image?: string
  price: number
  category: string
  tags: string[]
  documents: File[]
}

function RouteComponent() {
  const { category } = Route.useSearch()
  console.log(category, "category")
  const [description, setDescription] = useState("")
  // const [showPreview, setShowPreview] = useState(false)
  // const { user } = useAuth()
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [inputTag, setInputTag] = useState("")
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([])
  const [allowCrypto, setAllowCrypto] = useState(false)
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>([])
  const [discount, setDiscount] = useState(false)

  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      image: "",
      price: 0,
      category: category,
      tags: [],
      documents: [],
    },
  })

  useEffect(() => {
    form.setFieldValue("category", category)
  }, [category])

  const isFormValid = (values: ProductForm) => {
    const isCryptoValid = !allowCrypto || selectedCryptos.length > 0
    return (
      values.name.trim() !== "" &&
      values.price > 0 &&
      values.category !== "" &&
      values.documents.length > 0 &&
      isCryptoValid
    )
  }

  const MAX_IMAGES = 4
  const MAX_TAG_LENGTH = 18

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
    const normalizedTag = tag
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .slice(0, MAX_TAG_LENGTH)
    if (
      normalizedTag &&
      // !form.state.values.tags.includes(normalizedTag) &&
      form.state.values.tags.length < 5
    ) {
      // form.setFieldValue("tags", [...form.state.values.tags, normalizedTag])
      setInputTag("")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "_")
    if (value.length <= MAX_TAG_LENGTH) {
      setInputTag(value)
    }
  }

  const tagLimitReached = inputTag.length >= MAX_TAG_LENGTH

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

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newTags = Array.from(form.state.values.tags)
    const [reorderedTag] = newTags.splice(result.source.index, 1)
    newTags.splice(result.destination.index, 0, reorderedTag)

    form.setFieldValue("tags", newTags)
  }

  const uploadDocuments = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newDocuments = Array.from(files)
      setUploadedDocuments((prev) => [...prev, ...newDocuments])
      // form.setFieldValue("documents", [...uploadedDocuments, ...newDocuments])
    }
  }

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: handle cover upload
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto p-6">
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
                // onClick={() => setStep("type")}
                onClick={() => navigate({ to: "/new" })}
                className="flex flex-row items-center gap-10 md:gap-2 bg-inherit mb-[2em] text-black dark:text-white opacity-70 hover:opacity-100 transition-opacity border-none"
              >
                <div className="" style={{ transform: "rotate(270deg)" }}>
                  <Arrow />
                </div>
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
                                      "flex items-center bg-black/10 dark:bg-white/5 backdrop-blur-xs border rounded-lg border-black/10 dark:border-[var(--neon-cyan)]/20 px-2 py-1.5 transition-all duration-300 hover:border-[var(--neon-cyan)] group",
                                      snapshot.isDragging && "shadow-lg",
                                    )}
                                  >
                                    <Tag className="w-4 h-4 text-black/70 dark:text-[var(--neon-cyan)]" />
                                    <Badge
                                      variant="selected"
                                      className="flex items-center gap-2 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
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
                        <div className="absolute inset-0 bg-linear-to-r from-[var(--neon-cyan)]/10 to-emerald-500/10" />
                        <div className="absolute inset-0 border border-[var(--neon-cyan)]/20 transition-colors duration-300 group-hover:border-[var(--neon-cyan)]" />
                        <Input
                          type="text"
                          placeholder="#add tag"
                          value={inputTag}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          onFocus={(e) => {
                            e.target.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            })
                          }}
                          className={cn(
                            "relative text-center font-mono bg-transparent shadow-none placeholder:text-black/40 dark:placeholder:text-[var(--neon-cyan)] px-4 py-3 transition-all duration-300",
                            tagLimitReached
                              ? "border-2 border-red-500 text-red-500 shadow-[0_0_0_1px_red-500]"
                              : "border-2 border-[var(--neon-cyan)] focus:shadow-[0_0_0_1px_var(--neon-cyan)] focus:bg-black/5 dark:focus:bg-white/5 text-black dark:text-white",
                          )}
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
                          // .filter(
                          //   (tag) => !form.state.values.tags.includes(tag),
                          // )
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
                <span className="text-[var(--neon-cyan)] uppercase">
                  {category}
                </span>
              </p>
              <div className="flex flex-col gap-8">
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

                <div className="flex flex-col">
                  <label className="text-sm lg:text-md font-pressStart font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Cover
                  </label>
                  <motion.div
                    whileHover={{ borderColor: "var(--neon-cyan)" }}
                    className={cn(
                      "w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white/60 dark:hover:bg-black/30 transition-all duration-300 backdrop-blur-xs",
                      "p-4 text-center",
                    )}
                  >
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={handleCoverUpload}
                      />
                      <div className="flex flex-col text-gray-500 gap-2 dark:text-gray-400 items-center">
                        <File />
                        <p className="text-sm">Upload image</p>
                      </div>
                    </label>
                  </motion.div>
                </div>

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
                      <div className="relative rounded-xl overflow-visible">
                        <MinimalTiptapEditor
                          onValueChange={(value) => setDescription(value)}
                          onFocus={(e) => {
                            e.target.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            })
                          }}
                          className="min-h-[200px] bg-inherit border-b border-b-gray-300 dark:border-b-gray-700 backdrop-blur-xs text-black dark:text-white"
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
                            className="relative aspect-3/2 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 p-4 backdrop-blur-xs"
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
                                // form.setFieldValue("documents", newDocs)
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
                            "flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:bg-white/60 dark:hover:bg-black/30 transition-all duration-300 backdrop-blur-xs",
                            "aspect-3/2",
                            uploadedDocuments.length === 0
                              ? "col-span-full"
                              : "",
                          )}
                        >
                          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                            <div className="flex flex-col items-center justify-center gap-2 p-4">
                              <File />
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
                              className="dark:text-white text-[var(--neon-cyan)] hover:opacity-50 transition-all duration-300"
                            >
                              <Remove />
                            </button>
                          </div>
                        ))}
                        {uploadedImages.length < MAX_IMAGES && (
                          <motion.div
                            whileHover={{ borderColor: "var(--neon-cyan)" }}
                            className={cn(
                              "flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:bg-white/60 dark:hover:bg-black/30 transition-all duration-300 backdrop-blur-xs",
                              "aspect-square md:aspect-2/1",
                              uploadedImages.length === 0
                                ? "col-span-full"
                                : "",
                            )}
                          >
                            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                              <div className="flex flex-col items-center justify-center gap-2 p-4">
                                <File />
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
            </div>

            <div className="lg:w-1/5 order-2 lg:order-3 flex flex-col justify-start gap-3">
              {form.Field({
                name: "price",
                children: (field) => (
                  <div className="w-full">
                    <label className="block text-sm uppercase font-pressStart mb-2">
                      Pricing*
                    </label>
                    <div className="flex items-center mt-2">
                      <Input
                        type="text"
                        placeholder="$0"
                        className={cn(
                          "w-24 h-12 uppercase text-lg font-pressStart border-none hover:opacity-100 transition-all duration-300 bg-transparent text-[var(--neon-cyan)]",
                          discount &&
                            "text-gray-500 dark:text-gray-400 line-through",
                        )}
                        value={
                          form.state.values.price
                            ? `$${form.state.values.price}`
                            : ""
                        }
                        onChange={(e) => {
                          const value = e.target.value.replace(/^\$/, "")
                          if (/^\d*\.?\d*$/.test(value)) {
                            form.setFieldValue("price", Number(value))
                          }
                        }}
                      />
                      {discount && (
                        <div className=" text-md font-pressStart text-[var(--neon-cyan)]">
                          ${form.state.values.price * 0.7}
                        </div>
                      )}
                    </div>
                    <div className="flex items-start mt-4">
                      <input
                        type="checkbox"
                        id="discount"
                        className="appearance-none w-5 h-5 border-2 border-gray-300 dark:border-gray-700 bg-transparent checked:bg-[var(--neon-cyan)] checked:border-[var(--neon-cyan)] focus:outline-hidden transition-all duration-300 mr-2"
                        onChange={(e) => setDiscount(e.target.checked)}
                      />

                      <label
                        htmlFor="discount"
                        className="text-sm font-mono text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        Offer 30% discount to first 10 buyers
                      </label>
                    </div>

                    <div className="flex items-start mt-4">
                      <input
                        type="checkbox"
                        id="allowCrypto"
                        className="appearance-none w-5 h-5 border-2 border-gray-300 dark:border-gray-700 bg-transparent checked:bg-[var(--neon-cyan)] checked:border-[var(--neon-cyan)] focus:outline-hidden transition-all duration-300 mr-2"
                        onChange={(e) => setAllowCrypto(e.target.checked)}
                      />

                      <label
                        htmlFor="allowCrypto"
                        className="text-sm font-mono text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        Allow customers to pay with crypto{" "}
                      </label>
                    </div>

                    {allowCrypto && (
                      <div className="mt-4">
                        <label className="text-sm mb-4 text-[var(--neon-cyan)] font-mono block">
                          at least 1 crypto required
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["SOL", "ETH", "TON", "USDT"].map((crypto) => (
                            <div key={crypto} className="flex items-center">
                              <input
                                type="checkbox"
                                id={crypto}
                                className="appearance-none w-5 h-5 border-2 border-gray-300 dark:border-gray-700 bg-transparent checked:bg-[var(--neon-cyan)] checked:border-[var(--neon-cyan)] focus:outline-hidden transition-all duration-300 mr-2"
                                checked={selectedCryptos.includes(crypto)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedCryptos((prev) => [
                                      ...prev,
                                      crypto,
                                    ])
                                  } else {
                                    setSelectedCryptos((prev) =>
                                      prev.filter((c) => c !== crypto),
                                    )
                                  }
                                }}
                              />
                              <label
                                htmlFor={crypto}
                                className="text-sm font-pressStart text-gray-700 dark:text-gray-300 cursor-pointer"
                              >
                                {crypto}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ),
              })}

              <Button
                type="submit"
                // disabled={!isFormValid(form.state.values)}
                className={cn(
                  "w-full mt-6 font-pressStart relative overflow-hidden",
                  "bg-linear-to-r from-[var(--neon-cyan)] to-[var(--neon-cyan)]",
                  "text-white dark:text-black border border-[var(--neon-cyan)]",
                  "transition-all duration-300",
                  "before:absolute before:inset-0",
                  "before:bg-[length:200%_100%]",
                  "before:animate-shimmer",
                  "before:bg-[linear-gradient(110deg,transparent,rgba(20,241,149,0.3),transparent)]",
                  "text-lg py-6",
                  // {
                  //   "opacity-50 cursor-not-allowed before:hidden": !isFormValid(
                  //     form.state.values,
                  //   ),
                  //   "hover:shadow-[0_0_20px_rgba(20,241,149,0.5)] hover:-translate-y-0.5 hover:scale-[1.02]":
                  //     isFormValid(form.state.values),
                  // },
                )}
              >
                Create
              </Button>

              <Button
                type="button"
                variant="outline"
                // onClick={() => setShowPreview(true)}
                className={cn(
                  "w-full font-pressStart relative",
                  "border-2 border-[var(--neon-cyan)]/30 bg-black/5 dark:bg-white/5",
                  "text-[var(--neon-cyan)] dark:text-[var(--neon-cyan)]",
                  "backdrop-blur-xs",
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
      </div>
    </div>
  )
}

export const Route = createFileRoute("/new-edit")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
})
