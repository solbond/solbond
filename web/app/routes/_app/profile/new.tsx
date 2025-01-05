import { createFileRoute } from '@tanstack/react-router'

function RouteComponent() {
  return <></>
}

export const Route = createFileRoute('/_app/profile/new')({
  component: RouteComponent,
})
