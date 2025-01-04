import {
  Outlet,
  createFileRoute,
  useLocation,
  useRouter,
} from "@tanstack/react-router"
import { AuthProvider } from "~/context/FirebaseContext"
import { Nav } from "~/components/Nav/Nav"
import { Suspense } from "react"
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
      <AuthProvider>
        <ProfileProvider>
          {location.pathname === "/auth" ? null : <Nav />}
          <Outlet />
        </ProfileProvider>
      </AuthProvider>
    </Suspense>
  )
}
