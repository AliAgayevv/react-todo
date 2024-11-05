import './App.css'
import Header from './components/Header'
import { useRef, useState, useEffect } from 'react'
import NewTask from './components/NewTask'
import TaskList from "./components/TaskList"

function App() {
  const [task, setTask] = useState(""); // To hold the current input
  const [tasks, setTasks] = useState([]); // Array to hold all tasks
  const inputRef = useRef(null); // Reference for the input field

  // Focus on input when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault(); // Prevent form submission
    if (task.trim()) {
      setTasks([...tasks, { name: task, isEnd: false }]); // Add new task to the tasks array
      setTask(""); // Clear the input after adding a task
    }
  }

  function handleChange(e) {
    setTask(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  // Function to delete a task by index
  function handleDeleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <div className='w-8/12 mx-auto'>
      <Header />
      <div>
        <input
          ref={inputRef} // Attach the ref to the input field
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
          <TaskList tasks={tasks}/>
          <div className="border-t-2 border-[#010101] w-full h-px mt-4"></div>
          {tasks.map((taskItem, index) => (
            <NewTask 
              key={index} 
              name={taskItem.name} 
              isEnd={taskItem.isEnd} 
              onDelete={() => handleDeleteTask(index)} // Pass delete function to each task
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
