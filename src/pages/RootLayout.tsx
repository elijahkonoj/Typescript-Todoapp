import { Outlet, Link } from "react-router-dom"

export default function RootLayout() {
  return (
    <div>
      <header>
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">Task Manager</h1>

        <nav>
          <Link to="/tasks">Tasks</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
