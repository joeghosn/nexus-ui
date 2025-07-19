import { useEffect } from "react";

export interface UsePageTitleOptions {
  title: string;
  description?: string;
  keywords?: string;
}

export const usePageTitle = ({
  title,
  description,
  keywords,
}: UsePageTitleOptions) => {
  const fullTitle = `${title} | CUE For Art Production`;

  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  return {
    title: fullTitle,
    description:
      description ||
      "Professional film and video production equipment rental services",
    keywords:
      keywords ||
      "film equipment, video production, camera rental, lighting, film gear",
  };
};
