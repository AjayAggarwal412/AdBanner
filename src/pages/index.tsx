// pages/index.tsx
import React from "react";
import AdBanner from "../components/AdBanner";
import { Box, Grid, Heading } from "@chakra-ui/react";
import ads from "../ads.json"; // Import the JSON data

const Home: React.FC = () => {
  return (
    <Box
      maxW="1200px"
      mx="auto"
      p="6"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap="6"
        width="100%"
        maxWidth="800px"
        justifyItems="center"
      >
        {ads.map((ad, index) => (
          <AdBanner
            key={index}
            title={ad.title}
            description={ad.description}
            cta={ad.cta}
            image={ad.image}
            background={ad.background}
            shape={index % 3 === 0 ? "circle" : "rounded"}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
