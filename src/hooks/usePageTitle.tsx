import React from "react";
import { Helmet } from "react-helmet-async";
import { usePageTitle } from "./usePageTitle";

interface PageHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article" | "profile";
}

// Component wrapper for easier usage
export const PageHead: React.FC<PageHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  image,
  type = "website",
}) => {
  const {
    title: fullTitle,
    description: desc,
    keywords: kw,
  } = usePageTitle({ title, description, keywords });
  const siteUrl = "https://cueforartproduction.com"; // Replace with your actual domain
  const defaultImage = `${siteUrl}/logo.jpeg`; // Use CUE logo as default sharing image
  const canonicalUrl =
    canonical ||
    `${siteUrl}${
      typeof window !== "undefined" ? window.location.pathname : ""
    }`;
  const ogImage = image || defaultImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={kw} />
      <meta name="author" content="CUE For Art Production" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="CUE For Art Production" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@cueforart" />
      <meta name="twitter:site" content="@cueforart" />

      {/* Additional SEO */}
      <meta name="theme-color" content="#D4AF37" />
      <meta name="msapplication-TileColor" content="#D4AF37" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "CUE For Art Production",
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          description:
            "Professional film and video production equipment rental services",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "info@cueforartproduction.com",
          },
          sameAs: [
            "https://facebook.com/cueforart",
            "https://instagram.com/cueforart",
            "https://twitter.com/cueforart",
          ],
        })}
      </script>
    </Helmet>
  );
};
