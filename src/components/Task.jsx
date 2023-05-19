import { useRef } from "react";

export default function Task({ task, tasks, setTasks }) {

  const titleRef = useRef();

  const handleChangeCompleted = (e) => {
    e.preventDefault();
    titleRef.current.style.textDecoration === 'line-through'
    ? titleRef.current.style.textDecoration = ''
    : titleRef.current.style.textDecoration = 'line-through';
    tasks.forEach((t, index) => {
      if (t.id === task.id) {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
      }
    });
  }

  const handleDelete = (e) => {
    e.preventDefault();
    tasks.forEach((t, index) => {
      if (t.id === task.id) {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
      }
    })
  }

  return (
    <li>
      <div>
        <span>{task.id}</span>
        <span ref={titleRef}>{task.title}</span>
        <label>
          Concluída:
          <button
            type="submit"
            onClick={(e) => handleChangeCompleted(e, task)}
          >Concluida</button>
        </label>
        <button onClick={handleDelete}>Excluir</button>
      </div>
    </li>
  )
}