import React from "react";
import { Helmet } from "react-helmet-async";

const BASE_URL = "https://www.holidayhomesandlets.co.uk";

/**
 * Reusable head manager for SEO:
 * - <title>
 * - meta description
 * - canonical URL
 * - JSON-LD schema (later)
 */
export default function SeoHead({
  title,
  description,
  canonicalPath,
  jsonLd,
  robots,
}) {
  const canonicalUrl = canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL;

  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {robots ? <meta name="robots" content={robots} /> : null}

      <link rel="canonical" href={canonicalUrl} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
