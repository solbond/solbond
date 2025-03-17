import { createFileRoute, Outlet } from "@tanstack/react-router"
import { JazzProvider, PasskeyAuthBasicUI } from "jazz-react"
import { HeroRoute } from "~/components/Hero/HeroRoute"
import { Nav } from "~/components/Nav/Nav"
import { JazzAccount } from "~/jazz/schema"
import { JazzInspector } from "jazz-inspector"

export const APPLICATION_NAME = "SolBond"

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
          when: "signedUp", // users who have not signed up, store data locally
        }}
        AccountSchema={JazzAccount}
      >
        <PasskeyAuthBasicUI appName="SolBond">
          <main className="min-h-screen flex flex-col">
            <div className="flex flex-col min-h-screen w-full pt-14">
              <div className="flex flex-1 w-full">
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
