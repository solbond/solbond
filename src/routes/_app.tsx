import { createFileRoute, Outlet } from "@tanstack/react-router"
import { JazzInspector } from "jazz-inspector"
import { JazzProvider } from "jazz-react"
import { JazzAccount } from "~/jazz/schema"
import { CloudAuthBasicUI } from "jazz-react-auth-cloudauth"

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
        <CloudAuthBasicUI
          appName="SolBond"
          baseUrl="http://localhost:3010"
          keyserver="http://localhost:6189"
        >
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
        </CloudAuthBasicUI>
      </JazzProvider>
    </>
  )
}

export const Route = createFileRoute("/_app")({
  component: LayoutComponent,
})
