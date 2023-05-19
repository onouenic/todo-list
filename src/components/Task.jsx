import { useRef } from "react";

export default function Task({ task, tasks, setTasks, dispatch }) {

  const liRef = useRef();

  const handleChangeCompleted = (e) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
    if (liRef.current.className.includes('bg-green-600')) {
      liRef.current.className = liRef.current.className.replace('bg-green-600', '');
    } else {
      liRef.current.className += ' bg-green-600';
    }
    /* tasks.forEach((t, index) => {
      if (t.id === task.id) {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
      }
    }); */
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch({ type: 'REMOVE_TASK', payload: task.id });
    /* tasks.forEach((t, index) => {
      if (t.id === task.id) {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
      }
    }) */
  }

  return (
    <li ref={liRef} className={`flex justify-between gap-4 p-8 items-center border shadow-md rounded-md h-[10%] w-[80%] `}>
      <span>{task.id}: </span>
      <span>{task.title}</span>
      <div className="flex gap-4">
        <button
          className="border shadow-md rounded-md w-24 h-10 bg-orange-600 hover:transition-colors hover:bg-orange-500"
          type="submit"
          onClick={(e) => handleChangeCompleted(e, task)}
        >Concluida</button>
        <button
          className="border shadow-md rounded-md w-24 h-10 bg-red-600 hover:transition-colors hover:bg-red-500"
          onClick={handleDelete}
        >Excluir</button>
      </div>
    </li>
  )
}