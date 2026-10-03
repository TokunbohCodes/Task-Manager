import express from "express"


const router = express.Router();

router.post("/create", createTask);
router.get("/get", fetchTasks);
router.put("/update-task/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
