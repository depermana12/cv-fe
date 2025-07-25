import { Box, Divider } from "@mantine/core";
import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { FeaturesCards } from "../components/FeatureCards";
import { HeroBullets } from "../components/HeroBullets";
import { Footer } from "@shared/components/layout/Footer";

export const HomePage = () => {
  const deviderProps = {
    variant: "dashed",
    color: "gray.8",
    my: "xl",
    opacity: 0.3,
  };
  return (
    <Box>
      <HeroBullets />
      <Divider {...deviderProps} style={{ maxWidth: "70%", margin: "auto" }} />
      <FeaturesCards />
      <Divider {...deviderProps} style={{ maxWidth: "70%", margin: "auto" }} />
      <FAQ />
      <CTA />
      <Footer />
    </Box>
  );
};
