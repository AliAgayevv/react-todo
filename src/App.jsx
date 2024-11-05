import './App.css'
import Header from './components/Header'
import Input from "./components/Input"
import NewTask from './components/NewTask'
import TaskList from "./components/TaskList"

function App() {
  return (
    <div className='w-8/12 mx-auto'>
      <Header />
      <Input />
      <TaskList />
      <div className="bg-white h-screen flex flex-col">
      <NewTask name={"Salam"} isEnd={false} />

      <NewTask name={"Necesen"} isEnd={false} />
      </div>

    </div>
  )
}

export default App;
