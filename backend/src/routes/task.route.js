import express from "express"
import { createTask, deleteTask, fetchTasks, updateTask, updateTaskToCompleted } from "../controllers/task.controller.js";


const router = express.Router();

router.post("/create", createTask);
router.put("/complete-task/:id", updateTaskToCompleted);
router.get("/get", fetchTasks);
router.put("/update-task/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
