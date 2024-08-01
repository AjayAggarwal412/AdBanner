import React, { useState } from "react";
import { Box, Text, Heading, Button, Image } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import AdModal from "./AdModal";

interface AdBannerProps {
  title: string;
  description: string;
  cta: string;
  background: string;
  image: string;
  shape?: "circle" | "rounded" | "ellipse" | "square";
}

const AdBanner: React.FC<AdBannerProps> = ({
  title: initialTitle,
  description: initialDescription,
  cta,
  background: initialBackground,
  image: initialImage,
  shape = "square",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [background, setBackground] = useState(initialBackground);
  const [image, setImage] = useState(initialImage);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSave = (
    newTitle: string,
    newDescription: string,
    newImage: string
  ) => {
    setTitle(newTitle);
    setDescription(newDescription);
    setImage(newImage);
  };

  return (
    <Box
      position="relative"
      width="400px"
      minHeight="280px"
      display="flex"
      flexDirection="row"
      color="black"
      overflow="hidden"
      boxShadow="md"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg={`url(${background})`}
        backgroundSize="cover"
        backgroundPosition="center"
        opacity="0.5"
        zIndex="-1"
      />
      <Box
        position="absolute"
        top="2"
        left="6"
        zIndex="1"
        maxW="50%"
        noOfLines={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        p="3"
      >
        <Heading as="h2" size="lg">
          {title}
        </Heading>
        <Text
          mt="8"
          mb="10"
          color="black"
          maxW="80%"
          noOfLines={2}
          fontWeight="bold"
        >
          {description}
        </Text>
        <Button colorScheme="orange" variant="solid">
          {cta}
        </Button>
      </Box>
      <Box
        position="absolute"
        bottom="-10"
        right="-10"
        p="4"
        zIndex="1"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Image
          src={image}
          alt="Ad image"
          boxSize="200px"
          objectFit="cover"
          borderRadius={
            shape === "circle"
              ? "full"
              : shape === "rounded"
              ? "md"
              : shape === "ellipse"
              ? "50% / 30%"
              : "none"
          }
        />

        <Box
          position="absolute"
          top="-16"
          right="14"
          zIndex="2"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          onClick={openModal}
          cursor="pointer"
        >
          <EditIcon boxSize="5" color="black" />
        </Box>
      </Box>
      <AdModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialTitle={title}
        initialDescription={description}
        initialImage={image}
        onSave={handleSave}
      />
    </Box>
  );
};

export default AdBanner;
