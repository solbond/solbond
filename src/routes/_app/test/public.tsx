import { createFileRoute } from "@tanstack/react-router"
import { useIsAuthenticated } from "jazz-react"

// TODO: figure out how to not trigger auth on public pages
// query jazz state?
function RouteComponent() {
  const authed = useIsAuthenticated()
  console.log(authed, "authed")
  return (
    <>
      <div>Public page, no need to sign in yet</div>
    </>
  )
}

export const Route = createFileRoute("/_app/test/public")({
  component: RouteComponent,
})
