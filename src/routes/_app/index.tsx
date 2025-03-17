import { createFileRoute } from "@tanstack/react-router"
import { HeroRoute } from "~/components/Hero/HeroRoute"
import { Nav } from "~/components/Nav/Nav"

function RouteComponent() {
  return (
    <div className="">
      <Nav />
      <HeroRoute />
    </div>
  )
}

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
})
