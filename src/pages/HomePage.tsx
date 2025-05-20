import { Box } from "@mantine/core";
import { FeaturesCards } from "../components/ui/FeatureCards";
import { HeroBullets } from "../components/ui/HeroBullets";
import { Footer } from "../components/ui/Footer";
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
