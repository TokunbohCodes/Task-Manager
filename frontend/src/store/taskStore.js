import { create } from "zustand";
import api from "../utils/axios.js";

export const useTaskStore = create((set) => ({
   tasks: [],
   task: null,
   taskLoading: false,
   taskError: null,
   clearError: () => set({ taskError: null }),

   addTask: async (formData) => {
      set({taskLoading: true, taskError: null})
      try {
         const res = await api.post("/task/create", formData)
         set({task: res.data.task, taskLoading: false, taskError: null})
      } catch (error) {
         const msg = error.response?.data?.message || "Something went wrong while fetching data"
        set({taskError: msg, taskLoading: false})
      }

   }
}))
