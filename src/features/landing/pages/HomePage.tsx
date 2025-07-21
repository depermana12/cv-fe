import { Box, Divider } from "@mantine/core";
import { FeaturesCards, HeroBullets, FAQ, CTA } from "../components";
import { Footer } from "@shared/components/layout/Footer";

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
