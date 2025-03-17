import { createFileRoute } from "@tanstack/react-router"
import { useAccount } from "jazz-react"
import { useState } from "react"
import { Product } from "~/jazz/schema"

function RouteComponent() {
  const { me } = useAccount({
    root: { products: [{}] },
  })
  console.log(me, "me")

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const newProduct = Product.create({
        name: name,
        description: description,
      })

      // Reset form
      setName("")
      setDescription("")

      // Note: You'll need to implement the actual saving logic
      // to add this to your LinkCollection
      console.log("Created new product:", newProduct)
      me?.root.products.push(newProduct)
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  return (
    <div className="p-4">
      {me?.root.products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="url" className="block mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: "var(--primary)" }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export const Route = createFileRoute("/_app/test/privatePage")({
  component: RouteComponent,
})
