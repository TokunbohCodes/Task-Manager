import { easeInOut, motion } from 'motion/react'
import { LuLoader } from 'react-icons/lu'
import Task from './Task'
import TaskForm from './TaskForm'
import { useTaskStore } from './store/taskStore';
import { useEffect } from 'react';

const TaskList = () => {
   const { taskLoading } = useTaskStore();
   const fetchTasks = useTaskStore((state) => state.fetchTasks);
   const tasks = useTaskStore((state) => state.tasks);

   useEffect(() => {
      fetchTasks()
   }, [fetchTasks]);

   console.log(tasks)
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

      <TaskForm />

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
        {!tasks && tasks.length < 1 ? (<p>Empty Task, Add Task Please</p>) : (
      <div className="mt-8 space-y-4 overflow-y-auto">
        {tasks.map((task, idx) => (
          <Task key={idx} idx={idx} task={task} />
        ))}
      </div>
      )}
    </div>
  )
}

export default TaskList
