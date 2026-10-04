import Task from "../model/task.model.js";
import errorWrapper from "../utils/errorWrapper.js";

export const createTask = async (req, res, next) => {

   const { title, completed } = req.body;
   try {
      const task = await Task.create({
         title,
         completed
      })

      return res.status(201).json({
         success: true,
         message: "A Task Successfully Created",
         task
      })
   } catch (error) {
      console.error(error.message);
      next(error)
   }
};
export const fetchTasks = async (req, res, next) => {
   try {
      const tasks = await Task.find({});
      return res.status(200).json({
         success: true,
         tasks
      })
   } catch (error) {
      console.error(error.message);
      next(error)
   }
};
export const updateTask = async (req, res, next) => {
   const { id } = req.params;
   try {
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { returnDocument: "after" })
      return res.status(200).json({
         success: true,
         message: "Task Updated",
         task: updatedTask
      })
   } catch (error) {
      console.error(error.message);
      next(error)
   }
};
export const updateTaskToCompleted = async (req, res, next) => {
   const { id } = req.params;
   try {

      const task = await Task.findById(id);
      if (!task) {
         next(errorWrapper(404, "Task not found"))
      }
      if (task) {
         task.completed = !task.completed
      }
      const taskCompleted = await task.save();
      return res.status(200).json({
         success: true,
         message: "Task Updated",
         task: taskCompleted
      })
   } catch (error) {
      console.error(error.message);
      next(error)
   }
};
export const deleteTask = async (req, res, next) => {

   const {id} = req.params
   try {
      await Task.findByIdAndDelete(id)
      return res.status(200).json({
         sucess: true,
         message: "Task Deleted"
      })
   } catch (error) {
      console.error(error.message);
      next(error)
   }
};
