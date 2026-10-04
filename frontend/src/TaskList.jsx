import { easeInOut, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { LuLoader } from 'react-icons/lu'
import { toast } from 'react-toastify'
import Task from './Task'
import TaskForm from './TaskForm'
import { useTaskStore } from './store/taskStore'

const TaskList = () => {
  const fetchTasks = useTaskStore((state) => state.fetchTasks)
  const tasks = useTaskStore((state) => state.tasks)
  const updateTask = useTaskStore((state) => state.updateTask)

  const taskLoading = useTaskStore((state) => state.taskLoading)
  const addTask = useTaskStore((state) => state.addTask)
  const { taskError, clearError } = useTaskStore()

  const [formData, setFormData] = useState({
    title: '',
    completed: false,
  })

   const [isEditing, setIsEditing] = useState(false);
   const [taskID, setTaskID] = useState("");

  const handleSubmitTask = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('All fields must be filled')
      return
    }
    try {
      await addTask(formData)
      toast.success('Task Added')
      setFormData({
        title: '',
        completed: false,
      })
    } catch (error) {
      toast.error('Failed to add task')
      console.log('Error:', error)
    }
  }

  const handleChange = (e) => {
     const { name, value } = e.target
     setFormData((prevState) => ({ ...prevState, [name]: value }))
   }

   const getSingleTask = (task) => {
      setFormData((state) => ({
         ...state,
         title: task.title,
         completed: false,
      }));
      setTaskID(task._id)
      setIsEditing(true)
   }
   const handleUpdateTask = async (e) => {
     e.preventDefault()
     if (!formData.title.trim()) {
       toast.error('All fields must be filled')
       return
     }
     try {
       await updateTask(formData, taskID)
       toast.success('Task Updated')
       setFormData({
         title: '',
         completed: false,
       })
        setTaskID("")
        setIsEditing(false)
     } catch (error) {
       toast.error('Failed to add task')
       console.log('Error:', error)
     }
   }

  useEffect(() => {
    if (taskError) {
      toast.error(taskError, { id: 'taskID' })
      clearError()
    }
  })

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="max-w-2xl mx-auto px-12 pt-8 pb-16 rounded-2xl bg-primary overflow-hidden">
      <div className="mb-4">
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: easeInOut }}
          className="font-extrabold tracking-[0.08em] text-fluid-lg font-[italic] text-cl"
        >
          Task Manager
        </motion.h1>
      </div>

      <div>
        <h1>TaskList</h1>
      </div>

      <TaskForm
        onHandleChange={handleChange}
        onHandleSubmitTask={handleSubmitTask}
        onHandleUpdateTask={handleUpdateTask}
        formData={formData}
        isEditing={isEditing}
      />

      <div className="mt-6 flex justify-between items-center text-cl">
        <span>Tasks Completed: 10</span>
        <span>Total Tasks: 10</span>
      </div>
      <hr className="text-gray-600 mt-2 mb-4"></hr>
      {taskLoading && (
        <div className="w-full my-2 flex items-center justify-center">
          <LuLoader className="size-12 animate-spin text-cl" />
        </div>
      )}
      {!tasks && tasks.length < 1 ? (
        <p>Empty Task, Add Task Please</p>
      ) : (
        <div className="mt-8 space-y-4 overflow-y-auto">
          {tasks.map((task, idx) => (
            <Task key={idx} idx={idx} task={task} onGetSingleTask={getSingleTask} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList
