import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CvStore } from "../types/types";

export const useCvStore = create<CvStore>()(
  persist(
    (set) => ({
      activeCvId: null,
      setActiveCvId: (id: number) => set({ activeCvId: id }),
      clearActiveCvId: () => set({ activeCvId: null }),
    }),
    {
      name: "cv-store",
      partialize: (state) => ({ activeCvId: state.activeCvId }),
    },
  ),
);
