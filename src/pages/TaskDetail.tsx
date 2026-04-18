import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { api } from "../features/todos/api";
import { Suspense, useEffect } from "react";



function TaskDetailsContent() {
  const { taskId } = useParams();
  const queryClient = useQueryClient()

  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await api.get(`https://api.oluwasetemi.dev/tasks/${taskId}`);
      console.log("SINGLE TASK RESPONSE:", response.data);
      return response.data;
    },
  });

  useEffect(() => {
  if (data?.title) {
    document.title = `${data.title} | Task Manager`
  }
}, [data])

if (isError) {
  return <p>Failed to load task details.</p>
}

const handleDelete = async (taskId: string) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this task?")
  if (!confirmDelete) return

  try {
    await axios.delete(`https://api.oluwasetemi.dev/tasks/${taskId}`)
    queryClient.invalidateQueries({queryKey: ["tasks"]})
  } catch (err) {
    console.error("Failed to delete task", err)
  }
}

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Status: {data.status}</p>
      <p>Priority: {data.priority}</p>
      <button
        onClick={() => handleDelete(data.id)}
        className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
      </button>
      <Link to="/tasks">← Back to tasks</Link>
    </div>
  );
}

export default function TaskDetails() {
  return (
    <Suspense fallback={<p>Loading task...</p>}>
      <TaskDetailsContent />
    </Suspense>
  );
}
