import { useEffect } from "react";
import TaskList from "./TaskList";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useTaskStore } from "./store/taskStore";


const App = () => {
  const fetchTasks = useTaskStore((state) => state.fetchTasks)
  useEffect(() => {
  fetchTasks()
  }, [fetchTasks])
  return (
    <div className="min-h-screen w-full pt-18">
      <TaskList />

      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  )
};

export default App;
