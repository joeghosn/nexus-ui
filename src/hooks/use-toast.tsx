import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastParams = {
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning";
  duration?: number;
};

export type ToastState = ToastParams & {
  id: string;
  open: boolean;
};

interface ToastContextType {
  toast: (params: ToastParams) => void;
  toasts: ToastState[];
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const toast = useCallback((params: ToastParams) => {
    const id = Date.now().toString();
    const newToast: ToastState = {
      ...params,
      id,
      open: true,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, params.duration || 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, toasts, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
};
