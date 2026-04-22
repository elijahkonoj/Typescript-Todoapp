import { useState } from "react"
import axios from "axios"


interface TaskFormProps {
  onCreated: (task: any) => void
}

export function TaskForm({ onCreated }: TaskFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {  
    e.preventDefault() 
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post("https://api.oluwasetemi.dev/tasks", 
        { name, 
          description,
          priority: "LOW",
          status: "TODO"})
      onCreated(response.data)
      setName("")
      setDescription("")
    } catch (err) {
      if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || "Failed to create task")
    }  
    } finally {
      setLoading(false)
    }
  }

  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row md:items-center bg-gray-100 p-6 rounded-lg shadow-md mb-6">
    <input
        type="text"
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full md:w-auto"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full md:w-auto"
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 px-4 py-2 w-full md:w-auto"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>

      
    </form>
  )
}

