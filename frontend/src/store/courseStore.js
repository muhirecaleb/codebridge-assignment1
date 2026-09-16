import { create } from 'zustand'; // Change this line

const BASE_URI = 'http://localhost:5000';

export const useCourseStore = create((set) => ({ 
  courses: [],
  getCourses: async () => {
    try {
      const response = await fetch(BASE_URI + '/api/courses/');
      const data = await response.json();
      set({ courses: data.data });
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  },
}));
