import { Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";
import { CVBuilderWrapper } from "./CVBuilderWrapper";

interface CVBuilderLayoutProps {
  onBack?: () => void;
}

export const CVBuilderLayout = ({ onBack }: CVBuilderLayoutProps) => {
  return (
    <Suspense fallback={<LoadingOverlay visible />}>
      <CVBuilderWrapper onBack={onBack} />
    </Suspense>
  );
};
