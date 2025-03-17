import { createFileRoute } from "@tanstack/react-router"

function RouteComponent() {
  return (
    <>
      <div>Anyone can see this</div>
    </>
  )
}

export const Route = createFileRoute("/_app/test/public")({
  component: RouteComponent,
})
