import React from "react";
import { Helmet } from "react-helmet-async";

const BASE_URL = "https://www.holidayhomesandlets.co.uk";

function normalizeCanonicalPath(path) {
  if (!path) return "/";

  // Ensure it starts with "/"
  let p = path.startsWith("/") ? path : `/${path}`;

  // Root stays as "/"
  if (p === "/") return "/";

  // If it has a query/hash, don't try to “fix” it here (canonicals should generally not include them)
  const hasQueryOrHash = p.includes("?") || p.includes("#");
  if (hasQueryOrHash) return p;

  // Add trailing slash to match your server behaviour: "/about" => "/about/"
  if (!p.endsWith("/")) p = `${p}/`;

  return p;
}

function buildCanonicalUrl(canonicalPath) {
  const normalizedPath = normalizeCanonicalPath(canonicalPath);
  return `${BASE_URL}${normalizedPath}`;
}

export default function SeoHead({
  title,
  description,
  canonicalPath,
  jsonLd,
  robots,
}) {
  const canonicalUrl = buildCanonicalUrl(canonicalPath);

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
