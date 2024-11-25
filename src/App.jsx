import './App.css';
import Header from './components/Header';
import { useRef, useState, useEffect } from 'react';
import NewTask from './components/NewTask';
import TaskList from "./components/TaskList";

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim()) {
      const newTask = { id: Date.now(), name: task, isEnd: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTask('');
    }
  }

  function handleChange(e) {
    setTask(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  function handleEditTask(id, newName) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  function handleToggleTaskEnd(id) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isEnd: !task.isEnd } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  return (
    <div className=" max-w-3xl mx-auto mt-10 p-4 bg-zinc-300 shadow-md rounded-lg">
      <Header />
      <div className="flex items-center mt-6">
        <input
          ref={inputRef}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          className="outline-none flex-grow h-12 px-4 text-lg border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What shall I do today?"
          value={task}
        />
        <button
          onClick={handleSubmit}
          className="h-12 px-6 text-lg font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-r-lg focus:outline-none"
        >
          +
        </button>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md">
        <div className="border-t-2 border-gray-300"></div>
        {tasks.length > 0 ? (
          tasks.map(taskItem => (
            <NewTask
              key={taskItem.id}
              id={taskItem.id}
              name={taskItem.name}
              isEnd={taskItem.isEnd}
              onDelete={() => handleDeleteTask(taskItem.id)}
              onEdit={(newName) => handleEditTask(taskItem.id, newName)}
              onToggleEnd={() => handleToggleTaskEnd(taskItem.id)}
            />
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No tasks yet. Start by adding one!</p>
        )}
      </div>
    </div>
  );
}

export default App;