import type { Todo } from "./types";

interface Props {
  todos: Todo[];
}

function TodoList({ todos }: Props) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          {todo.title} {todo.completed ? "Done" : ""}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;