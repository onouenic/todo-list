import { useContext, useReducer, useState } from "react";
import Task from "./Task";
import { ThemeContext } from "../App";

function tasksReducer(state, action) {
  switch(action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map((task) => {
        if (task.id === action.payload) {
          return { ...task, completed: !task.completed }
        }
        return task;
      }
    );
    default:
      throw new Error ('Action type not found');
  }
}

function idsReducer(state, action) {
  switch(action.type) {
    case 'ADD_ID':
      return [...state, action.payload];
    default:
      throw new Error ('Action type not found');
  }
}

export default function TaskList() {

  const [ tasks, tasksDispatch ] = useReducer(tasksReducer, []);
  const [ title, setTitle ] = useState('');
  const { theme } = useContext(ThemeContext);
  const [ idsUtilizados, idsDispatch ] = useReducer(idsReducer, []);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = 1;
    const gerarId = () => {
      if (idsUtilizados.length > 0) {
        while (idsUtilizados.includes(id)) {
          id++;
        }
        return id;
      } else {
        return id;
      }
    }
    const newTask = {
      id: gerarId(),
      title,
      completed: false,
    }
    tasksDispatch({ type: 'ADD_TASK', payload: newTask })
    idsDispatch({ type: 'ADD_ID', payload: newTask.id })
    setTitle('');
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen border shadow-md w-[50%]">
      <ol className="flex flex-col gap-4 w-full items-center">
        {tasks && tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            idsUtilizados={idsUtilizados}
            tasksDispatch={tasksDispatch}
            idsDispatch={idsDispatch}
          />
        ))}
      </ol>
      <form className="flex flex-col justify-center items-center gap-4" name="new-task">
        <label className="flex gap-6">Adicionar tarefa: <input className={`flex text-center border shadow-md rounded-md ${ theme === "light" ? 'bg-white text-black' : 'bg-black text-white' }`} type="text" name="title" value={title} onChange={handleChangeTitle} /></label>
        <button className="border shadow-md rounded-md w-24 h-10" type="submit" onClick={handleSubmit}>Adicionar</button>
      </form>
    </div>
  );
}
