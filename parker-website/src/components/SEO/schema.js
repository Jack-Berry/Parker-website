// src/seo/schema.js

const BASE_URL = "https://www.holidayhomesandlets.co.uk";

function safeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getPostalCodeFromAddressLines(addressLines) {
  if (!Array.isArray(addressLines) || addressLines.length === 0) return "";
  // UK postcodes are typically at the end; your Preswylfa lines include "LL67 0DW"
  const last = safeString(addressLines[addressLines.length - 1]);
  return last;
}

function splitAddressGuess(address) {
  // Basic split for "Cemaes, Anglesey, Wales" style strings
  const parts = safeString(address)
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    locality: parts[0] || "",
    region: parts[1] || "",
    country: parts[2] || "GB",
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Holiday Homes & Lets",
    url: BASE_URL,
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

export function buildVacationRentalSchema(property) {
  const slug = safeString(property?.slug);
  const name = safeString(property?.name);

  const addressGuess = splitAddressGuess(property?.location?.address);

  const addressLines = property?.contact?.addressLines;
  const postalCode = getPostalCodeFromAddressLines(addressLines);

  const lat = property?.location?.coordinates?.lat;
  const lng = property?.location?.coordinates?.lng;

  const sleeps = property?.capacity?.sleeps;
  const bedrooms = property?.capacity?.bedrooms;
  const bathrooms = property?.capacity?.bathrooms;
  const petsAllowed = !!property?.capacity?.pets;

  const imageList = Array.isArray(property?.images?.hero)
    ? property.images.hero
        .map((u) => safeString(u))
        .filter(Boolean)
        .map((u) => (u.startsWith("http") ? u : `${BASE_URL}${u}`))
        .slice(0, 5) // keep it lightweight
    : [];

  const isPiddleInn = slug === "piddle-inn";

  const schema = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${BASE_URL}/${slug}#vacationrental`,
    name,
    ...(isPiddleInn ? { alternateName: "Piddle Inn" } : {}),
    url: `${BASE_URL}/${slug}`,
    description: isPiddleInn
      ? "Piddle Inn (escape the ordinary) — book direct with Holiday Homes & Lets."
      : `Book ${name} direct with Holiday Homes & Lets.`,
    isPartOf: { "@id": `${BASE_URL}/#organization` },

    address: {
      "@type": "PostalAddress",
      addressLocality: addressGuess.locality,
      addressRegion: addressGuess.region,
      addressCountry: addressGuess.country || "GB",
      ...(postalCode ? { postalCode } : {}),
    },

    ...(Number.isFinite(lat) && Number.isFinite(lng)
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: lat,
            longitude: lng,
          },
        }
      : {}),

    ...(imageList.length ? { image: imageList } : {}),

    ...(typeof petsAllowed === "boolean" ? { petsAllowed } : {}),

    ...(Number.isFinite(sleeps)
      ? { occupancy: { "@type": "QuantitativeValue", value: sleeps } }
      : {}),

    ...(Number.isFinite(bedrooms) ? { numberOfBedrooms: bedrooms } : {}),

    ...(Number.isFinite(bathrooms)
      ? { numberOfBathroomsTotal: bathrooms }
      : {}),

    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/${slug}`,
        inLanguage: "en-GB",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: `Book ${name}` },
    },
  };

  return schema;
}
