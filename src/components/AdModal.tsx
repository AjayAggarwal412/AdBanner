import React, { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  Box,
  FormLabel,
  Image,
  Stack,
} from "@chakra-ui/react";

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  initialDescription: string;
  initialImage: string;
  onSave: (title: string, description: string, image: string) => void;
}

const AdModal: React.FC<AdModalProps> = ({
  isOpen,
  onClose,
  initialTitle,
  initialDescription,
  initialImage,
  onSave,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [imagePreview, setImagePreview] = useState(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert file to base64 string
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file); // Read file as base64 string
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };

  const handleSave = () => {
    onSave(title, description, imagePreview); // Pass base64 string as image URL
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Edit Banner</ModalHeader>
        <ModalBody>
          <Box mb="4">
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box mb="4">
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box mb="4">
            <FormLabel>Upload New Image</FormLabel>
            <Button onClick={handleUploadClick} colorScheme="blue">
              Choose Image
            </Button>
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              hidden
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Stack spacing={4} width="100%">
            <Button onClick={handleSave} width="100%" colorScheme="blue">
              Done
            </Button>
            <a
              href={initialImage}
              style={{ display: "flex", justifyContent: "center" }}
            >
              Download
            </a>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdModal;
