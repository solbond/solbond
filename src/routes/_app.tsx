import { createFileRoute, Outlet } from "@tanstack/react-router"
import { JazzProvider, PasskeyAuthBasicUI } from "jazz-react"
import { HeroRoute } from "~/components/Hero/HeroRoute"
import { Nav } from "~/components/Nav/Nav"
import { JazzAccount } from "~/jazz/schema"
import { JazzInspector } from "jazz-inspector"

// We use this to identify the app in the passkey auth
export const APPLICATION_NAME = "Issue Tracker"

declare module "jazz-react" {
  export interface Register {
    Account: JazzAccount
  }
}

function LayoutComponent() {
  return (
    <>
      <JazzProvider
        sync={{
          peer: "wss://cloud.jazz.tools/?key=jazz@solbond.co",
          when: "signedUp", // makes users who have not signed up, store data only locally
        }}
        AccountSchema={JazzAccount}
      >
        <PasskeyAuthBasicUI appName="Issue Tracker">
          <main className="min-h-screen flex flex-col">
            <div className="flex flex-col min-h-screen w-full pt-14">
              <div className="flex flex-1 w-full">
                <Nav />
                <HeroRoute />
                <Outlet />
              </div>
            </div>
          </main>
          <div className="hidden">
            <JazzInspector />
          </div>
        </PasskeyAuthBasicUI>
      </JazzProvider>
    </>
  )
}

export const Route = createFileRoute("/_app")({
  component: LayoutComponent,
})
