import { useContext, useEffect } from "react";
import { Context } from "../App";

export default function TaskList() {

  const { tasks, setTasks } = useContext(Context);

  useEffect(() => {
    const setTasksToStorage = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    setTasksToStorage();

    const getTasksFromStorage = () => { 
      const tasks = localStorage.getItem('tasks');
      const data = JSON.parse(tasks)
      setTasks(data);
    }
    getTasksFromStorage();
  }, [])

  return (
    <ul>
      {tasks && tasks.map((task) => (
        <li key={task.id}>
          <div>
            <span>{task.title}</span>
            <label>
              Concluída:
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => setTasks({ ...task, completed: !task.completed})}
              />
              <button onClick={() => tasks.map(({ id }) => id !== task.id )}>Excluir</button>
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}
