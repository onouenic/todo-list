import { useContext, useState } from "react";
import Task from "./Task";
import { ThemeContext } from "../App";

export default function TaskList() {

  const [ tasks, setTasks ] = useState([]);
  const [ title, setTitle ] = useState('');
  const { theme } = useContext(ThemeContext);

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
    <div className="flex flex-col gap-4 justify-center items-center h-screen border shadow-md w-[50%]">
      <ul className="flex flex-col gap-4 w-full items-center">
        {tasks && tasks.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
      </ul>
      <form className="flex flex-col justify-center items-center gap-4" name="new-task">
        <label className="flex gap-6">Adicionar tarefa: <input className={`flex text-center border shadow-md rounded-md ${ theme === "light" ? 'bg-white text-black' : 'bg-black text-white' }`} type="text" name="title" value={title} onChange={handleChangeTitle} /></label>
        <button className="border shadow-md rounded-md w-24 h-10" type="submit" onClick={handleSubmit}>Adicionar</button>
      </form>
    </div>
  );
}
