import { useRouteError } from "react-router-dom"

function ErrorPage() {
  const error = useRouteError() as Error | null

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error?.message || "Unexpected error"}</p>
    </div>
  )
}

export default ErrorPage