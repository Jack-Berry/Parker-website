import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PROPERTY_LIST } from "../config/properties";
import SeoHead from "./SEO/SeoHead";
import { buildOrganizationSchema } from "./SEO/schema";
import "../css/PropertySelection.scss";
import logo from "../assets/HHAL Logo.png";

const isBundledAsset = (url) =>
  typeof url === "string" &&
  (url.startsWith("/static/") || // webpack/CRA
    url.startsWith("/assets/") || // Vite production
    url.startsWith("/src/") || // Vite dev mode
    url.startsWith("data:") ||
    url.startsWith("http"));

/** Slideshow media for a property card (slow cross-fade).
 *  Shows thumbnails instantly and swaps in full-size images as they load. */
const CardSlideshow = ({ images = [], thumbnails = [], logo }) => {
  const slides = useMemo(() => images.filter(isBundledAsset), [images]);
  const thumbSlides = useMemo(() => thumbnails.filter(isBundledAsset), [thumbnails]);

  const [idx, setIdx] = useState(0);
  // Track which full-size images have finished loading
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  // Progressively load full-size images: first the current slide, then the rest
  useEffect(() => {
    if (!slides.length) return;
    // Load current slide first, then next, then remaining
    const order = [idx, (idx + 1) % slides.length];
    slides.forEach((_, i) => { if (!order.includes(i)) order.push(i); });

    order.forEach((i, delay) => {
      if (loaded[i]) return;
      const img = new Image();
      img.onload = () => setLoaded((prev) => ({ ...prev, [i]: true }));
      // Stagger non-current images slightly so current loads first
      if (i === idx) {
        img.src = slides[i];
      } else {
        setTimeout(() => { img.src = slides[i]; }, delay * 200);
      }
    });
  }, [idx, slides]);

  if (!slides.length) {
    return logo ? (
      <img src={logo} alt="Property logo" className="ps-card-logo" />
    ) : (
      <div className="ps-card-placeholder" />
    );
  }

  return (
    <>
      {slides.map((src, i) => {
        const thumbSrc = thumbSlides[i];
        const isActive = i === idx;
        const hasLoaded = loaded[i];
        return (
          <div key={src} className={`ps-card-bg ${isActive ? "visible" : ""}`} aria-hidden="true">
            {/* Thumbnail layer - instant */}
            {thumbSrc && (
              <div
                className="ps-card-bg-layer"
                style={{ backgroundImage: `url(${thumbSrc})` }}
              />
            )}
            {/* Full-size layer - fades in once loaded */}
            {hasLoaded && (
              <div
                className="ps-card-bg-layer ps-card-bg-full"
                style={{ backgroundImage: `url(${src})` }}
              />
            )}
          </div>
        );
      })}
      {logo && (
        <div className="ps-card-logo-overlay">
          <img src={logo} alt="Property logo" />
        </div>
      )}
    </>
  );
};

const PropertySelection = () => {
  // Preload topbar + welcome images for every property so they appear
  // instantly when the user navigates to a property page
  useEffect(() => {
    PROPERTY_LIST.forEach((p) => {
      [p.images?.topbar, p.images?.welcomeTo].forEach((src) => {
        if (src) {
          const img = new Image();
          img.src = src;
        }
      });
    });
  }, []);

  const orgSchema = buildOrganizationSchema();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [orgSchema],
  };

  return (
    <>
      <SeoHead
        title="Holiday Homes & Lets | Book Direct Holiday Homes"
        description="Book direct holiday homes with Holiday Homes & Lets. Pet-friendly cottages in Anglesey & Dorset. No booking fees, best rates. Browse properties & check availability."
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
            const hero = Array.isArray(property.images?.hero)
              ? property.images.hero
              : [];
            const heroThumbs = Array.isArray(property.images?.heroThumbnails)
              ? property.images.heroThumbnails
              : [];
            const gallery = Array.isArray(property.images?.gallery)
              ? property.images.gallery
              : [];
            const media = hero.length ? hero : gallery.slice(0, 6);
            const thumbs = heroThumbs.length ? heroThumbs : [];
            const logo = property.images?.logo || null;

            return (
              <Link
                key={property.id}
                to={`/${property.slug}`}
                className="ps-card panel"
              >
                <div className="ps-card-media">
                  <CardSlideshow images={media} thumbnails={thumbs} logo={logo} />
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
