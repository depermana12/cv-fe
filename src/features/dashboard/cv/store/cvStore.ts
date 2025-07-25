import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CvStore } from "../types/types";
import { queryClient } from "@/shared/lib/queryClient";

export const useCvStore = create<CvStore>()(
  persist(
    (set, get) => ({
      activeCvId: null,
      setActiveCvId: (id: number) => set({ activeCvId: id }),
      clearActiveCvId: () => set({ activeCvId: null }),
      getActiveCv: () => {
        const { activeCvId } = get();
        return activeCvId ? queryClient.getQueryData(["cv", activeCvId]) : null;
      },
    }),
    {
      name: "cv-store",
      partialize: (state) => ({ activeCvId: state.activeCvId }),
    },
  ),
);
