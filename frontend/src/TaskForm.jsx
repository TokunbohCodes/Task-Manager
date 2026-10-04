import { MdAddBox} from 'react-icons/md';
import { useTaskStore } from './store/taskStore.js';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const TaskForm = () => {
  const taskLoading = useTaskStore((state) => state.taskLoading);
  const addTask = useTaskStore((state) => state.addTask);
  const { taskError, clearError } = useTaskStore();

  const [formData, setFormData] = useState({
    title: "",
    completed: false
  });


  const handleSubmitTask = async(e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("All fields must be filled")
      return;
    }
    try {
      await addTask(formData);
      toast.success("Task Added")
      setFormData({
        title: '',
        completed: false,
      })

    } catch (error) {
      toast.error("Failed to add task")
      console.log("Error:", error );
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  useEffect(() => {
    if (taskError) {
      toast.error(taskError, { id: "taskID" })
      clearError()
    }
  });

 console.log(formData);
  return (
    <form onSubmit={handleSubmitTask} className="flex flex-1 items-center rounded-lg">
      <input
        type="text"
        name='title'
        value={formData.title}
        onChange={handleChange}
        className="w-0 h-12 flex-1 outline-0 border border-gray-700 rounded-tl-lg rounded-bl-lg pl-6 text-lg capitalize"
      />
      <button
        disabled={taskLoading}
        type="submit"
        className={`${taskLoading? "cursor-not-allowed": ""}-ml-1 cursor-pointer p-0 m-0 border rounded-tr-lg rounded-br-lg border-cl flex items-center justify-center`}
      >
        <MdAddBox className="size-11 text-green-700 pointer-events-none" />
      </button>
    </form>
  )
}

export default TaskForm
