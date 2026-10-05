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

  const [isEditing, setIsEditing] = useState(false)
  const [taskID, setTaskID] = useState('')
  const [completedTasks, setCompletedTasks] = useState(false)

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
    }))
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
      setTaskID('')
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

   const filtered = completedTasks ? tasks.filter((task) => task.completed) : tasks
   const filterCompleted = tasks.filter((task) => task.completed)

  return (
    <div className="max-w-2xl mx-auto px-12 pt-8 pb-16 rounded-2xl overflow-hidden relative">
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

      <div className="top-1/2 -translate-y-1/2 h-60 w-60 absolute left-1/2 -translate-x-1/2 border-2 border-gray-400 rounded-full flex items-center justify-center bg-linear-[125deg,#0C0B17] opacity-10 overflow-hidden p-1 font-serif italic">
        <h1 className="text-4xl font-extrabold">DEVMINT</h1>
      </div>

      <TaskForm
        onHandleChange={handleChange}
        onHandleSubmitTask={handleSubmitTask}
        onHandleUpdateTask={handleUpdateTask}
        formData={formData}
        isEditing={isEditing}
      />

      {Array.isArray(tasks) && tasks.length > 0 && (
        <div className="mt-6 flex justify-between items-center text-cl">
          <div className="flex items-center justify-between gap-4">
            <input
              type="checkbox"
              name="completedTasks"
              checked={completedTasks}
              className="checkbox size-6 checkbox-success"
              onChange={(e) => setCompletedTasks(e.target.checked)}
            />
            <small className="text-lg mt-1">
              Tasks Completed:{' '}
              <span className="text-2xl font-extrabold align-baseline">{filterCompleted.length}</span>
            </small>
          </div>
          <div className="flex items-center justify-between gap-2">
            <small className="text-lg">
              Total Tasks:{' '}
              <span className="text-2xl font-extrabold align-baseline">{tasks.length}</span>
            </small>
          </div>
        </div>
      )}
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
          {filtered.map((task, idx) => (
            <Task key={idx} idx={idx} task={task} onGetSingleTask={getSingleTask} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList
