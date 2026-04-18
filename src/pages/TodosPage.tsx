import { Suspense } from "react";
import { TaskList } from "../components/TaskList";

function TodosPage() {
  return (
    <div>
      <Suspense fallback={<p>Loading tasks...</p>}>
        <TaskList />
      </Suspense>
    </div>
  );
}

export default TodosPage;