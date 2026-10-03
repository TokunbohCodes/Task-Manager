import { FaCheckDouble } from 'react-icons/fa'
import { MdDeleteForever, MdEditSquare } from 'react-icons/md'
import {easeInOut, motion} from "motion/react"

const Task = ({ idx }) => {
  console.log(idx)
  return (
     <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{duration:idx * 1, ease: easeInOut}}
        className="flex items-center w-full px-2 bg-gray-800 py-2 rounded-lg shadow-cl">
      <p className="flex-1 capitalize">
           <span className="text-cl mr-6">{+idx + 1}</span>
           task 1
      </p>
      <div className="flex items-center gap-6">
        <button className="cursor-pointer border border-red-600 rounded-full shadow-cl px-2 py-2">
          <FaCheckDouble color="red" />
        </button>
        <button className="cursor-pointer border border-green-600 rounded-full shadow-cl px-2 py-2">
          <MdEditSquare color="green" />
        </button>
        <button className="cursor-pointer border border-yellow-600 rounded-full shadow-cl px-2 py-2">
          <MdDeleteForever color="gold" />
        </button>
      </div>
    </motion.div>
  )
}

export default Task
