import { create } from "zustand";
import { getCourses } from "../api/auth";

export const useCourseStore = create((set) => ({
  courses: [],
  getCourses: async () => {
    try {
      const { data } = await getCourses();
      set({ courses: data.data || [] });
      return data.data || [];
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },
}));
