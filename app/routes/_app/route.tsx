import { Outlet, createFileRoute, useLocation } from "@tanstack/react-router"
import { Suspense } from "react"
import { Nav } from "~/components/Nav/Nav"
// import { AuthProvider } from "~/context/FirebaseContext"
import { ProfileProvider } from "~/context/ProfileContext"

export const Route = createFileRoute("/_app")({
  component: LayoutComponent,
})

function LayoutComponent() {
  const location = useLocation()
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center font-bold text-2xl text-[var(--neon-cyan)] justify-center">
          Loading...
        </div>
      }
    >
      {/* TODO: old firebase auth, del it */}
      {/* <AuthProvider> */}
      <ProfileProvider>
        {location.pathname === "/auth" ? null : <Nav />}
        <Outlet />
      </ProfileProvider>
      {/* </AuthProvider> */}
    </Suspense>
  )
}
