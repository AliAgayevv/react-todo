import './App.css';
import Header from './components/Header';
import { useRef, useState, useEffect } from 'react';
import NewTask from './components/NewTask';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim()) {
      const newTask = { id: Date.now(), name: task, isEnd: false };
      setTasks([...tasks, newTask]);
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
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }
  

  function handleEditTask(index, newName) {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, name: newName } : task
    );
    setTasks(newTasks);
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
  />
))}

        </div>
      </div>
    </div>
  );
}

export default App;
