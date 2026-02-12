import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PROPERTY_LIST } from "../config/properties";
import SeoHead from "./SEO/SeoHead";
import { buildOrganizationSchema } from "./SEO/schema";
import "../css/PropertySelection.scss";
import logo from "../assets/HHAL Logo.png";

const isBundledAsset = (url) =>
  typeof url === "string" &&
  (url.startsWith("/static/") ||
    url.startsWith("data:") ||
    url.startsWith("http"));

/** Slideshow media for a property card (slow cross-fade) */
const CardSlideshow = ({ images = [], logo }) => {
  const slides = useMemo(() => images.filter(isBundledAsset), [images]);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) {
    // Fallback: static logo or placeholder
    return logo ? (
      <img src={logo} alt="Property logo" className="ps-card-logo" />
    ) : (
      <div className="ps-card-placeholder" />
    );
  }

  return (
    <>
      {slides.map((src, i) => (
        <div
          key={src}
          className={`ps-card-bg ${i === idx ? "visible" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden="true"
        />
      ))}
    </>
  );
};

const PropertySelection = () => {
  const orgSchema = buildOrganizationSchema();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [orgSchema],
  };

  return (
    <>
      <SeoHead
        title="Holiday Homes & Lets | Book Direct Holiday Homes"
        description="Book direct holiday homes in Wales and England with Holiday Homes & Lets. Browse properties and check availability."
        canonicalPath="/"
        jsonLd={jsonLd}
      />
      <div className="ps-container">
      <div className="ps-content">
        <header className="ps-header panel">
          <img
            src={logo}
            alt="Holiday Homes And Lets"
            className="ps-site-logo"
          />
          <h1 className="ps-title">Welcome to Holiday Homes &amp; Lets</h1>
          <p className="ps-subtitle">Choose your perfect holiday destination</p>
        </header>

        <div className="ps-grid ps-grid--two">
          {PROPERTY_LIST.map((property) => {
            // Prefer hero images; if empty, fall back to a handful from gallery
            const hero = Array.isArray(property.images?.hero)
              ? property.images.hero
              : [];
            const gallery = Array.isArray(property.images?.gallery)
              ? property.images.gallery
              : [];
            const media = hero.length ? hero : gallery.slice(0, 6);
            const logo = property.images?.logo || null;

            return (
              <Link
                key={property.id}
                to={`/${property.slug}`}
                className="ps-card panel"
              >
                <div className="ps-card-media">
                  <CardSlideshow images={media} logo={logo} />
                </div>

                <div className="ps-card-body">
                  <h2 className="ps-card-title">{property.name}</h2>

                  {property.tagline && (
                    <p className="ps-card-tagline">{property.tagline}</p>
                  )}

                  {property.location?.address && (
                    <p className="ps-card-location">
                      {property.location.address}
                    </p>
                  )}

                  <div className="ps-meta">
                    {Number.isFinite(property.capacity?.bedrooms) && (
                      <span className="ps-chip">
                        {property.capacity.bedrooms} Bedrooms
                      </span>
                    )}
                    {Number.isFinite(property.capacity?.sleeps) && (
                      <span className="ps-chip">
                        Sleeps {property.capacity.sleeps}
                      </span>
                    )}
                    {property.capacity?.pets && (
                      <span className="ps-chip">Pet Friendly</span>
                    )}
                  </div>

                  <div className="ps-cta-row">
                    <span className="ps-cta">View Property &amp; Book</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default PropertySelection;
