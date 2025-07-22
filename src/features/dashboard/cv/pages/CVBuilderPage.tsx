import { useState, Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";
import { CVBuilderLayout } from "@features/dashboard/cv/builder/components/CVBuilderLayout";
import type { Cv } from "@features/dashboard/cv/types/types";
import { CvLibrary } from "../components/CvLibrary";

export const CVBuilderPage = () => {
  const { activeCvId, setActiveCvId, clearActiveCvId } = useCvStore();
  const [showBuilder, setShowBuilder] = useState(false);

  const handleCvSelect = (cv: Cv) => {
    setActiveCvId(cv.id);
    setShowBuilder(true);
  };

  const handleBackToLibrary = () => {
    setShowBuilder(false);
    clearActiveCvId();
  };

  return (
    <Suspense fallback={<LoadingOverlay visible />}>
      {showBuilder && activeCvId ? (
        <CVBuilderLayout onBack={handleBackToLibrary} />
      ) : (
        <CvLibrary onCvSelect={handleCvSelect} />
      )}
    </Suspense>
  );
};
