import { Box, Divider } from "@mantine/core";
import { FeaturesCards } from "./components/FeatureCards";
import { HeroBullets } from "./components/HeroBullets";
import { FAQ } from "./components/FAQ";
import { Footer } from "../../components/layout/Footer";
import { CTA } from "./components/CTA";

const HomePage = () => {
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
export default HomePage;
