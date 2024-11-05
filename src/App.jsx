import './App.css';
import Header from './components/Header';
import { useRef, useState, useEffect } from 'react';
import NewTask from './components/NewTask';
import TaskList from './components/TaskList';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, { name: task, isEnd: false }]);
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

  function handleDeleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function handleEditTask(index, newName) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, name: newName } : task
      )
    );
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
          {tasks.map((taskItem, index) => (
            <NewTask 
              key={index} 
              name={taskItem.name} 
              isEnd={taskItem.isEnd} 
              onDelete={() => handleDeleteTask(index)} 
              onEdit={(newName) => handleEditTask(index, newName)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
