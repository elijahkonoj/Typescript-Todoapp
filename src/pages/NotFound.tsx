import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>

      <Link
        to="/"
        className="px-4 py-2 bg-black text-white rounded hover:opacity-80"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;