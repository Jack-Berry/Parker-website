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

// ============================================
// META DESCRIPTION BUILDERS
// ============================================

/**
 * Build optimized meta description for property booking/detail page
 * Max 160 chars, includes location, capacity, pet-friendly status, key features
 */
export function buildPropertyMetaDescription(property) {
  if (!property) return "";

  const name = safeString(property.name);
  const addressGuess = splitAddressGuess(property?.location?.address);
  const location = [addressGuess.locality, addressGuess.region]
    .filter(Boolean)
    .join(", ");

  const bedrooms = property?.capacity?.bedrooms;
  const sleeps = property?.capacity?.sleeps;
  const petFriendly = property?.capacity?.pets;

  // Build description parts
  const parts = [`Book ${name}`];

  if (location) parts.push(`in ${location} direct`);
  else parts.push("direct");

  if (petFriendly) parts.push("Pet-friendly");
  if (bedrooms) parts.push(`${bedrooms}-bed`);
  if (sleeps) parts.push(`sleeps ${sleeps}`);

  // Add 1-2 key amenities/features (prioritize unique ones)
  const amenities = property?.amenities || [];
  const keyAmenities = [];

  if (amenities.some(a => a.toLowerCase().includes("log burner"))) keyAmenities.push("log burner");
  if (amenities.some(a => a.toLowerCase().includes("en-suite"))) keyAmenities.push("en-suites");
  if (amenities.some(a => a.toLowerCase().includes("river") || a.toLowerCase().includes("view"))) keyAmenities.push("views");
  if (amenities.some(a => a.toLowerCase().includes("garden"))) keyAmenities.push("garden");

  if (keyAmenities.length > 0) {
    parts.push(keyAmenities.slice(0, 2).join(", "));
  }

  parts.push("Check availability.");

  // Join and ensure under 160 chars
  let description = parts.join(". ").replace(/\.\./g, ".");

  // Truncate if too long (shouldn't happen with our structure)
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  return description;
}

/**
 * Build meta description for property about page
 * Focuses on property features, gallery, location details
 */
export function buildAboutMetaDescription(property) {
  if (!property) return "";

  const name = safeString(property.name);
  const addressGuess = splitAddressGuess(property?.location?.address);
  const locality = addressGuess.locality;
  const region = addressGuess.region;

  const bedrooms = property?.capacity?.bedrooms;
  const petFriendly = property?.capacity?.pets;

  const parts = [`Discover ${name}`];

  if (bedrooms) parts.push(`${bedrooms}-bedroom`);

  // Add property type hint
  const propertyType = name.toLowerCase().includes("cottage") || name.toLowerCase().includes("bwthyn")
    ? "cottage"
    : name.toLowerCase().includes("inn")
    ? "house"
    : "property";
  parts.push(propertyType);

  if (locality && region) parts.push(`in ${locality}, ${region}`);
  else if (locality) parts.push(`in ${locality}`);

  parts.push("Gallery, facilities");
  if (petFriendly) parts.push("pet-friendly");

  // Add one unique feature if space allows
  const amenities = property?.amenities || [];
  if (amenities.length > 0 && amenities[0]) {
    const firstAmenity = amenities[0].split(",")[0].trim(); // Take first part if comma-separated
    if (firstAmenity.length < 20) {
      parts.push(firstAmenity.toLowerCase());
    }
  }

  let description = parts.join(". ").replace(/\.\./g, ".").replace(/\. \./g, ". ");

  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  return description;
}

/**
 * Build meta description for contact page
 * Focuses on booking inquiries, direct contact benefits
 */
export function buildContactMetaDescription(property) {
  if (!property) return "";

  const name = safeString(property.name);
  const addressGuess = splitAddressGuess(property?.location?.address);
  const locality = addressGuess.locality;
  const region = addressGuess.region;

  const parts = [`Contact us about ${name}`];

  if (locality && region) {
    parts.push(`in ${locality}, ${region}`);
  } else if (region) {
    parts.push(`in ${region}`);
  }

  parts.push("Book direct, check availability, or ask questions");
  parts.push("Fast response guaranteed.");

  let description = parts.join(". ").replace(/\.\./g, ".");

  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  return description;
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
  const propertyId = safeString(property?.id);

  const addressGuess = splitAddressGuess(property?.location?.address);

  const addressLines = property?.contact?.addressLines;
  const postalCode = getPostalCodeFromAddressLines(addressLines);

  // Build streetAddress from addressLines if available
  const streetAddress = Array.isArray(addressLines) && addressLines.length > 0
    ? addressLines.slice(0, -1).join(", ") // All lines except the last (which is usually the postcode)
    : "";

  const lat = property?.location?.coordinates?.lat;
  const lng = property?.location?.coordinates?.lng;

  const sleeps = property?.capacity?.sleeps;
  const bedrooms = property?.capacity?.bedrooms;
  const bathrooms = property?.capacity?.bathrooms;
  const petsAllowed = !!property?.capacity?.pets;

  // Use gallery images first (at least 8), fallback to hero
  const rawImages = Array.isArray(property?.images?.gallery) && property.images.gallery.length >= 8
    ? property.images.gallery
    : Array.isArray(property?.images?.hero)
    ? property.images.hero
    : [];

  const imageList = rawImages
    .map((u) => safeString(typeof u === "object" ? u.original : u))
    .filter(Boolean)
    .map((u) => (u.startsWith("http") ? u : `${BASE_URL}${u}`))
    .slice(0, 8); // Google recommends at least 8 images

  const isPiddleInn = slug === "piddle-inn";

  const schema = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${BASE_URL}/${slug}#vacationrental`,

    // Required: identifier
    identifier: propertyId,

    name,
    additionalType: "https://schema.org/House",
    ...(isPiddleInn ? { alternateName: "Piddle Inn" } : {}),
    url: `${BASE_URL}/${slug}`,
    description: isPiddleInn
      ? "Piddle Inn (escape the ordinary) — book direct with Holiday Homes & Lets."
      : `Book ${name} direct with Holiday Homes & Lets.`,
    isPartOf: { "@id": `${BASE_URL}/#organization` },

    // Required: containsPlace
    containsPlace: {
      "@type": "Accommodation",
      name: name,
      ...(Number.isFinite(sleeps)
        ? {
            occupancy: {
              "@type": "QuantitativeValue",
              value: sleeps,
              maxValue: sleeps,
            },
          }
        : {}),
      ...(Number.isFinite(bedrooms) ? { numberOfBedrooms: bedrooms } : {}),
      ...(Number.isFinite(bathrooms)
        ? { numberOfBathroomsTotal: bathrooms }
        : {}),
    },

    address: {
      "@type": "PostalAddress",
      ...(streetAddress ? { streetAddress } : {}),
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

    ...(Array.isArray(property?.amenities) && property.amenities.length > 0
      ? {
          amenityFeature: property.amenities.map((amenity) => ({
            "@type": "LocationFeatureSpecification",
            name: amenity,
            value: true,
          })),
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
