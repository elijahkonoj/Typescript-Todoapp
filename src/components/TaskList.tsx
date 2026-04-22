import { useSearchParams, Link } from 'react-router-dom';
import { useQueryClient } from "@tanstack/react-query"; 
import { useEffect, useState } from "react"
import type { Todo } from "../features/todos/types";
import { useTasks } from "../features/todos/hooks";
import { TaskForm } from "./TaskForm";
import TaskEditForm from "./TaskEditForm";
import axios from "axios"
import { Pagination } from "./pagination";



 export function TaskList() {
    const [searchParams, setSearchParams] = useSearchParams()
    const queryClient = useQueryClient()
    const [editing, setEditing] = useState<Todo | null>(null);

    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || "all"


    const { data, isError, isLoading } = useTasks(page, search, status);

    const tasks: Todo[] = data?.data || []
    const meta = data?.meta || { page: 1, totalPages: 1 }

    useEffect(() => {
     document.title = "Tasks | Task Manager"
}, [])

if (isError) {
  return <p>Failed to load tasks.</p>
}
if (isLoading) return <p>Loading tasks...</p>


  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-lg md:text-4xl font-bold mb-4 text-center">Tasks</h1>
      <input
         type="text"
         value={search}
         onChange={(e) => {
           setSearchParams({
          page: String(page),
          search: e.target.value,
    })
  }}
  placeholder="Search tasks..."
  className="border-4 border-solid border-gray-300 rounded-md p-2 w-full md:w-auto mb-4"
/>

<select
  value={status}
  onChange={(e) => {
    setSearchParams({
      page: String(page),
      search,
      status: e.target.value,
    })
  }}
  className="border-4 border-solid border-gray-300 rounded-md p-2 w-full md:w-auto mb-6"
>
  <option value="all">All</option>
  <option value="pending">Pending</option>
  <option value="completed">Completed</option>
</select>


<TaskForm onCreated={() => queryClient.invalidateQueries({queryKey: ["tasks"]})} />
  {editing && (
<TaskEditForm
  task={editing}
  onCancel={() => setEditing(null)}
  onUpdated={() => {
    setEditing(null)
    queryClient.invalidateQueries({queryKey: ["tasks"]})
  
  }}
/> )}       
 
<ul className="space-y-4">
      {tasks.map((task) => (
       <li key={task._id} 
            className={`p-4 border rounded flex items-center justify-between ${task.completed ? "bg-green-100" : "bg-white"}`}>
          <Link to={`/tasks/${task._id}`}className='font-medium' >
            {task.title } {task.completed ? "✅" : ""}
          </Link>
          <button
            onClick={() => setEditing(task)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={ async () => {
              if (!window.confirm("Are you sure you want to delete this task?")) return 
              try {
                await axios.delete(`https://api.oluwasetemi.dev/tasks/${task._id}`)
                queryClient.invalidateQueries({queryKey: ["tasks"]})    
              } catch (error) {
                console.error("Error deleting task:", error)
              }
            }}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </li>
      
      ))}

</ul>
      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={(newPage) =>
          setSearchParams({ page: String(newPage), search, status })
        }
      />
    </div>
  );
}


