import { useState } from "react";
import Task from "./Task";

export default function TaskList() {

  const [ tasks, setTasks ] = useState([]);
  const [ title, setTitle ] = useState('');

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = tasks ? tasks.length + 1 : 1;
    const newTask = {
      id,
      title,
      completed: false,
    }
    setTasks([...tasks, newTask]);
    setTitle('');
  }

  return (
    <div>
      <ul>
        {tasks && tasks.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
      </ul>
      <form name="new-task">
        <input type="text" name="title" value={title} onChange={handleChangeTitle} />
        <button type="submit" onClick={handleSubmit}>Adicionar</button>
      </form>
    </div>
  );
}
