export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  archived?: boolean;
}

export interface TodosResponse {
  tasks: Todo[];
  meta: {
    page: number;
    totalPages: number;
  };
}