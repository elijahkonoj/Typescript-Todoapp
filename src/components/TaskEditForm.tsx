import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import type { Todo } from "../features/todos/types"

interface Props {
    task: Todo | null;
    onCancel: () => void;
    onUpdated: () => void;
  }

export default function TaskEditForm( {task, onCancel, onUpdated} : Props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (task) {
      setName(task.title || "");
      setDescription(task.description || "");
    }
  }, [task]);

  if (!task) return null;

  
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

  try {
    const response = await axios.put(
      `https://api.oluwasetemi.dev/tasks/${task._id}`,
      {
        name: name,
        description: description,
        priority: task.priority || "LOW",
        status: task.status || "TODO",
        archived: true
      }
    )


    const updatedTask = response.data  

    const queryClient = useQueryClient();

    // Update React Query cache so the task detail shows the latest data
    queryClient.setQueryData(["task", updatedTask.id], updatedTask)

    // Refresh the task list
    onUpdated() // Notify parent about the update, which can also trigger a refetch
    // Optional: close the edit form
    onCancel()
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || "Failed to update task")
    } 
  } finally {
    setLoading(false)
  }
}

  
  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
      <h2 className="text-lg font-bold">Edit Task</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 w-full"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Task"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
