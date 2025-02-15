import { createFileRoute } from '@tanstack/react-router'

function RouteComponent() {
  return <></>
}

export const Route = createFileRoute('/_app/profile/auth')({
  component: RouteComponent,
})
