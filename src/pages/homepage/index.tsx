import { Box } from "@mantine/core";
import { FeaturesCards } from "./components/FeatureCards";
import { HeroBullets } from "./components/HeroBullets";
import { Footer } from "../../components/layout/Footer";
// import HomeBanner from "../components/ui/HomeBanner";

const HomePage = () => {
  return (
    <Box>
      <HeroBullets />
      <Box py="xl">
        <FeaturesCards />
      </Box>
      <Footer />
    </Box>
  );
};
export default HomePage;
