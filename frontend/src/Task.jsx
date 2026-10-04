import { FaCheckDouble } from 'react-icons/fa'
import { MdDeleteForever, MdEditSquare } from 'react-icons/md'
import {easeInOut, motion} from "motion/react"
import { useTaskStore } from './store/taskStore'
const Task = ({task, idx }) => {

  const { deleteTask, updateTaskToCompleted } = useTaskStore();
  return (
     <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{duration:idx * 1, ease: easeInOut}}
      className={`${task.completed? "border-r-4 border-l-4 border-green-600" : "border-r-4 border-l-4 border-red-600"} flex items-center w-full px-2 bg-gray-800 py-2 rounded-lg shadow-cl`}>
      <span className="text-cl mr-6">{+idx + 1}</span>
      <p className={`${task.completed? "line-through decoration-red-500": ""} flex-1 capitalize text-white`}>
           {task.title}
      </p>
      <div className="flex items-center gap-6">
        <button
          onClick={() => updateTaskToCompleted(task._id)}
          className="cursor-pointer border border-red-600 rounded-full shadow-cl px-2 py-2">
          <FaCheckDouble color="red" />
        </button>
        <button className="cursor-pointer border border-green-600 rounded-full shadow-cl px-2 py-2">
          <MdEditSquare color="green" />
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="cursor-pointer border border-yellow-600 rounded-full shadow-cl px-2 py-2">
          <MdDeleteForever color="gold" />
        </button>
      </div>
    </motion.div>
  )
}

export default Task
