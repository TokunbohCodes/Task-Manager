import Task from "./Task";
import TaskForm from "./TaskForm";
import {easeInOut, motion} from "motion/react"

const TaskList = () => {
   return (
      <div className="max-w-2xl mx-auto px-12 pt-8 pb-16 rounded-2xl bg-primary overflow-hidden">
         <div className="mb-4">
            <motion.h1
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{duration: 1, ease: easeInOut}}
               className="font-extrabold tracking-[0.08em] text-fluid-lg font-[italic] text-cl">Task Manager
            </motion.h1>
         </div>

         <TaskForm />

         <div className="mt-6 flex justify-between items-center text-cl">
            <span>Tasks Completed: 10</span>
            <span>Total Tasks: 10</span>
         </div>

         <div className="mt-6 space-y-4 overflow-y-auto">
            {Array.from({length: 4}).map((_, idx) => (
               <Task key={idx} idx={idx} />
            ))}
         </div>
      </div>
   );
};

export default TaskList;
