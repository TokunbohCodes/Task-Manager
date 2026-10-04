import TaskList from "./TaskList";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className="min-h-screen w-full pt-18">
      <TaskList />

      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  )
};

export default App;
