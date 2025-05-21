import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/templates')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/templates"!</div>
}
