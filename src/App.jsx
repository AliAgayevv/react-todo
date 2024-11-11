

import './App.css';
import Header from './components/Header';
import { useRef, useState, useEffect } from 'react';
import NewTask from './components/NewTask';
import TaskList from "./components/TaskList";

function App() {
  // Single task state
  const [task, setTask] = useState('');
  // All tasks storage on this state and send to local storage
  
  const [tasks, setTasks] = useState(() => {
    
    const storedTasks = localStorage.getItem("tasks")
    // If tasks is null, return empty array, otherwise take tasks from localStorage and return
    return storedTasks ? JSON.parse(storedTasks) : []
  })  
  
  console.log("firsh",tasks)
  const inputRef = useRef(null);

  // useEffect(() => {
  //   const storedTasks = localStorage.getItem('tasks');
  //   if (storedTasks) {
  //     setTasks(JSON.parse(storedTasks));
  //   }
  //   inputRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim()) {
      const newTask = { id: Date.now(), name: task, isEnd: false };
      setTasks((prevTask) => ([...prevTask, newTask]));
      const exTasks = [...tasks, newTask];
      console.log(tasks)
      localStorage.setItem('tasks', JSON.stringify(exTasks));
      setTask('');
    }
  }

  function handleChange(e) {
    setTask(e.target.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function handleKeyPress(e) {
    // if user press enter, it trigger "+" button
    if (e.key === 'Enter') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      handleSubmit(e);
    }
  }

  function handleDeleteTask(id) {

    // When the user click „delete” button for each individual task component, newTasks” variable filters „tasks” variables for given ID.
    const newTasks = tasks.filter(task => task.id !== id);
    // set deleted newTasks variable to tasks state.
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  function handleEditTask(id, newName) {
    // When the user click "edit" button and type name for each individual task component, "newTasks” variable filters „tasks” variables for given ID and change name of component for texted newName.
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, name: newName } : task
    );
    // Set state 
    setTasks(newTasks);
    // set localStorage edited tasks element.
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  function handleToggleTaskEnd(id) {
    // When the user click name of task for each individual task component, "updatedTasks variable filters „tasks” variables for given ID and change isEnd state to reverse.(true -> false, false -> true)
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isEnd: !task.isEnd } : task
    );
    // set state
    setTasks(updatedTasks);
    // set localstorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  return (
    <div className="w-8/12 mx-auto">
      <Header />
      <div>
        <input
          ref={inputRef}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          className="w-11/12 h-16 p-4 outline-none text-custom-slategray"
          placeholder="What shall I do today?"
          value={task}
        />
        <button
          onClick={handleSubmit}
          className="bg-white w-1/12 h-16 border-none outline-none text-custom-slategray"
        >
          +
        </button>

        <TaskList />

        <div className="bg-white h-screen flex flex-col">
          <div className="border-t-2 border-[#010101] w-full h-px mt-4"></div>
          {tasks.map(taskItem => (
            <NewTask
              key={taskItem.id}
              id={taskItem.id}
              name={taskItem.name}
              isEnd={taskItem.isEnd}
              onDelete={() => handleDeleteTask(taskItem.id)}
              onEdit={(newName) => handleEditTask(taskItem.id, newName)}
              onToggleEnd={() => handleToggleTaskEnd(taskItem.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;