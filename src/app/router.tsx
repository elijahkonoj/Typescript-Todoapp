import { createBrowserRouter } from "react-router-dom";
import TodosPage from "../pages/TodosPage";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TodosPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);