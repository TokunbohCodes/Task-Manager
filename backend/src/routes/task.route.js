import express from "express"
import { createTask, deleteTask, fetchTasks, updateTask } from "../controllers/task.controller.js";


const router = express.Router();

router.post("/create", createTask);
router.get("/get", fetchTasks);
router.put("/update-task/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
