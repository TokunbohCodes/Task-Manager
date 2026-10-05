import { create } from "zustand";
import api from "../utils/axios.js";

export const useTaskStore = create((set, get) => ({
   tasks: [],
   filteredTasks: [],
   taskLoading: false,
   taskError: null,
   clearError: () => set({ taskError: null }),

   addTask: async (formData) => {
      set({taskLoading: true, taskError: null})
      try {
         await api.post("/task/create", formData)
         set({taskLoading: false, taskError: null })
         get().fetchTasks()
      } catch (error) {
         const msg = error.response?.data?.message || "Something went wrong while creating task"
        set({taskError: msg, taskLoading: false})
      }
   },
   fetchTasks: async () => {
      set({taskLoading: true, taskError: null})
      try {
         const res = await api.get("/task/get")
         set({tasks: res.data.tasks, taskLoading: false, taskError: null})
      } catch (error) {
         const msg = error.response?.data?.message || "Something went wrong while fetching tasks"
        set({taskError: msg, taskLoading: false})
      }
   },

   deleteTask: async (id) => {
      try {
         await api.delete(`/task/delete/${id}`)
         set({ taskLoading: false, taskError: null })
         get().fetchTasks();
      } catch (error) {
         const msg = error.response?.data?.message || "Something went wrong while deleting task"
        set({taskError: msg, taskLoading: false})
      }

   },

   updateTaskToCompleted: async (id) => {
      try {
         await api.put(`/task/complete-task/${id}`)
         set({ taskLoading: false, taskError: null })
         get().fetchTasks();
      } catch (error) {
         const msg = error.response?.data?.message || "Something went wrong while updating completed task"
        set({taskError: msg, taskLoading: false})
      }
   },

   updateTask: async (formData, taskID) => {
      try {
         await api.put(`/task/update-task/${taskID}`, formData)
         set({ taskLoading: false, taskError: null })
         get().fetchTasks();
      } catch (error) {
         const msg = error.response?.data?.message || "Something went wrong while updating task"
        set({taskError: msg, taskLoading: false})
      }
   },

}))
