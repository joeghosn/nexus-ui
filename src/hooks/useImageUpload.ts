import { useState, useCallback } from "react";
import { useUploadImagesMutation } from "../store/api";

interface UseImageUploadOptions {
  initialImages: string[];
}

interface UseImageUploadReturn {
  currentImages: string[];
  isUploading: boolean;
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setCurrentImages: React.Dispatch<React.SetStateAction<string[]>>;
  uploadAndGetImageUrls: () => Promise<string[]>;
  removeCurrentImage: (imageUrl: string) => void;
  addCurrentImages: (images: string[]) => void;
  getSelectedFiles: () => File[];
  hasImages: () => boolean;
  validateImages: () => string | undefined;
  hasImageChanges: () => boolean;
}

export const useImageUpload = (
  options: UseImageUploadOptions
): UseImageUploadReturn => {
  const { initialImages } = options;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentImages, setCurrentImages] = useState<string[]>(initialImages);

  const [uploadImages, { isLoading: isUploading }] = useUploadImagesMutation();

  const uploadAndGetImageUrls = useCallback(async (): Promise<string[]> => {
    let imageUrls = [...currentImages];

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const uploadResult = await uploadImages(formData).unwrap();
      imageUrls = [...imageUrls, ...uploadResult.data.imageUrls];
    }

    return imageUrls;
  }, [selectedFiles, currentImages, uploadImages]);

  const removeCurrentImage = useCallback((imageUrl: string) => {
    setCurrentImages((prev) => prev.filter((img) => img !== imageUrl));
  }, []);

  const addCurrentImages = useCallback((images: string[]) => {
    setCurrentImages((prev) => [...prev, ...images]);
  }, []);

  const getSelectedFiles = useCallback(() => {
    return selectedFiles;
  }, [selectedFiles]);

  const hasImages = useCallback(() => {
    return currentImages.length > 0 || selectedFiles.length > 0;
  }, [currentImages.length, selectedFiles.length]);

  const validateImages = useCallback(() => {
    if (!hasImages()) {
      return "At least one image is required";
    }
  }, [hasImages]);

  const hasImageChanges = useCallback(() => {
    // Check if new files have been selected
    if (selectedFiles.length > 0) {
      return true;
    }

    // Check if current images are different from initial images
    if (currentImages.length !== initialImages.length) {
      return true;
    }

    // Check if the order or content of images has changed
    return !currentImages.every((img, index) => img === initialImages[index]);
  }, [selectedFiles.length, currentImages, initialImages]);

  return {
    currentImages,
    isUploading,
    setSelectedFiles,
    setCurrentImages,
    uploadAndGetImageUrls,
    removeCurrentImage,
    addCurrentImages,
    getSelectedFiles,
    hasImages,
    validateImages,
    hasImageChanges,
  };
};
