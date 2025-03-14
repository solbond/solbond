import { createFileRoute } from "@tanstack/react-router"
import { useAccount } from "jazz-react"
import { useState } from "react"
import { Link } from "~/jazz/schema"

function RouteComponent() {
  const { me } = useAccount({
    root: { links: [{}] },
  })
  console.log(me, "me")

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const newLink = Link.create({
        title,
        url,
      })

      // Reset form
      setTitle("")
      setUrl("")

      // Note: You'll need to implement the actual saving logic
      // to add this to your LinkCollection
      console.log("Created new link:", newLink)
      me?.root.links.push(newLink)
    } catch (error) {
      console.error("Error creating link:", error)
    }
  }

  return (
    <div className="p-4">
      {me?.root.links.map((link) => (
        <div key={link.id}>
          <h2>{link.title}</h2>
          <p>{link.url}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="url" className="block mb-1">
            URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Link
        </button>
      </form>
    </div>
  )
}

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
})
