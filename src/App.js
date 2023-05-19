import { createContext, useState } from 'react';
import './App.css';
import TaskList from './components/TasksList';

export const Context = createContext();

function App() {

  const [ tasks, setTasks ] = useState([
    {
      id: 1,
      title: 'Tarefa 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Tarefa 2',
      completed: false,
    },
  ]);

  return (
    <div className="App">
      <Context.Provider
        value={{ tasks, setTasks }}
      >
        <TaskList />
      </Context.Provider>
    </div>
  );
}

export default App;
