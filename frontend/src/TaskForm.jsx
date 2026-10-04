import { MdAddBox} from 'react-icons/md';
import { useTaskStore } from './store/taskStore.js';
import { FaEdit } from 'react-icons/fa';
// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
const TaskForm = ({onHandleChange, onHandleSubmitTask, formData, isEditing, onHandleUpdateTask}) => {
  const { taskLoading } = useTaskStore();
  return (
    <form onSubmit={isEditing ? onHandleUpdateTask : onHandleSubmitTask} className="flex flex-1 items-center rounded-lg">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={onHandleChange}
        className="w-0 h-12 flex-1 outline-0 border border-gray-700 rounded-tl-lg rounded-bl-lg pl-6 text-lg capitalize"
      />
      <button
        disabled={taskLoading}
        type="submit"
        className={`${taskLoading ? 'cursor-not-allowed' : ''}-ml-1 cursor-pointer h-11 w-11 border rounded-tr-lg rounded-br-lg border-cl flex items-center justify-center`}
      >
        {isEditing ? (
          <FaEdit className="size-8 text-green-700 pointer-events-none ml-1" />
        ) : (
          <MdAddBox className="size-8 text-green-700 pointer-events-none" />
        )}
      </button>
    </form>
  )
}

export default TaskForm
