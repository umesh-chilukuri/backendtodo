import express from "express";
import {
  deleteTask,
  getMyTask,
  newTask,
  updateTask,
} from "../controllers/task.js";
import { isauthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isauthenticated, newTask);

router.get("/my", isauthenticated, getMyTask);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;