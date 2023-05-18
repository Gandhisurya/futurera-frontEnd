import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      student: null,
      setStudent: (student) => set({ student }),
    }),
    {
      name: "student",
    }
  )
);

export default function useStudent() {
  const { student, setStudent } = useStore();
  return {
    student,
    setStudent,
  };
}
