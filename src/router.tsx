import { QueryClient } from "@tanstack/react-query"
import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routerWithQueryClient } from "@tanstack/react-router-with-query"
import { routeTree } from "./routeTree.gen"
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary"

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // 1 minute
      },
    },
  })

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      defaultSsr: false,
      context: { queryClient },
      defaultPreload: "intent",
      // react-query will handle data fetching & caching
      // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#passing-all-loader-events-to-an-external-cache
      defaultPreloadStaleTime: 0,
      defaultErrorComponent: DefaultCatchBoundary,
      scrollRestoration: true,
      defaultStructuralSharing: true,
    }),
    queryClient,
  )
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
