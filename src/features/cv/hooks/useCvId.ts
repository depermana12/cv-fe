import { useAuthStore } from "../../auth/store/authStore";
import { useCvStore } from "../store/cvStore";
import { useCvs } from "./useCvs";

export const useCvId = (specificCvId?: number) => {
  const { user } = useAuthStore();
  const { data: cvs } = useCvs();
  const { activeCvId, setActiveCvId } = useCvStore();

  if (!user) throw new Error("User must be logged in to use CV operations");
  if (!Array.isArray(cvs) || cvs.length === 0)
    throw new Error("User must have at least one CV");

  if (specificCvId) {
    const selectedCv = cvs.find((cv) => cv.id === specificCvId);
    if (!selectedCv) throw new Error(`CV with id ${specificCvId} not found`);
    return selectedCv.id;
  }

  if (activeCvId) {
    const selectedCv = cvs.find((cv) => cv.id === activeCvId);
    if (selectedCv) {
      return selectedCv.id;
    }
  }

  const firstCvId = cvs[0].id;
  setActiveCvId(firstCvId);
  return firstCvId;
};
