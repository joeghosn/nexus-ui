import { useCallback } from "react";

import { isBackendError } from "../utils/catch-error";
import { TOAST_MESSAGES } from "../constants/toast-messages";
import { useToast } from "./use-toast";

export const useErrorHandler = () => {
  const { toast } = useToast();

  const handleError = useCallback(
    (error: unknown, customMessage?: string) => {
      if (isBackendError(error)) {
        const errorMessage =
          error.data.message || customMessage || TOAST_MESSAGES.GENERIC_ERROR;
        toast({
          title: "Error",
          description: errorMessage,
          variant: "error",
        });
      } else {
        toast({
          title: "Error",
          description: customMessage || TOAST_MESSAGES.GENERIC_ERROR,
          variant: "error",
        });
      }
    },
    [toast]
  );

  const handleSuccess = useCallback(
    (message: string) => {
      toast({
        title: "Success",
        description: message,
        variant: "success",
      });
    },
    [toast]
  );

  return { handleError, handleSuccess };
};
