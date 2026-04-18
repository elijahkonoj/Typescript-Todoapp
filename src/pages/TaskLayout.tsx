import { Outlet } from "react-router-dom";

export default function TasksLayout() {
  return (

      <div className="flex flex-col md:flex-row gap-6">
        <Outlet />
      </div>
  
  );
}