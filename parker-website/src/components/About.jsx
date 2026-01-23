import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getPropertyBySlug } from "../config/properties";
import "../css/about.scss";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import Lightbox from "react-image-lightbox"; // Full-screen view
import "react-image-lightbox/style.css";

const About = () => {
  const { propertySlug } = useParams();
  const property = getPropertyBySlug(propertySlug);

  const [view, setView] = useState("grid"); // "carousel" | "grid"
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Build gallery items from property config (safe defaults)
  const images = useMemo(() => {
    const gallery = property.images?.gallery ?? [];
    return gallery.map((src) => ({ original: src, thumbnail: src }));
  }, [property]);

  // Preload images for smoother UX (no-op if none)
  useEffect(() => {
    const preloadImages = (items) => {
      items.forEach(({ original }) => {
        const img = new Image();
        img.src = original;
      });
    };
    if (images.length) preloadImages(images);
  }, [images]);

  // Responsive default view: carousel on small screens, grid on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 850) {
        setView("carousel");
      } else {
        setView("grid");
      }
    };
    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Guard: invalid or missing property
  if (!property) {
    return (
      <div className="about-container">
        <div className="error-container">
          <h2>Property not found</h2>
          <p>The property you’re looking for does not exist.</p>
        </div>
      </div>
    );
  }

  // Render gallery view
  const renderView = () => {
    if (!images.length) {
      return (
        <div className="gallery-empty">
          <p>No gallery images available for {property.name} yet.</p>
        </div>
      );
    }

    if (view === "carousel") {
      return (
        <ImageGallery
          items={images}
          showThumbnails={true}
          showPlayButton={false}
          thumbnailPosition="bottom"
          onSlide={(index) => setLightboxIndex(index)}
          onClick={() => setIsLightboxOpen(true)}
        />
      );
    }

    // Grid view
    return (
      <div className="gallery-grid">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.thumbnail}
            alt={`${property.name} gallery image ${index + 1}`}
            onClick={() => {
              setLightboxIndex(index);
              setIsLightboxOpen(true);
            }}
          />
        ))}
      </div>
    );
  };

  const { description, details, amenities, accessibility, location } = property;

  return (
    <div className="about-container">
      {/* Optional topbar image */}
      {property.images?.topbar && (
        <img
          src={property.images.topbar}
          className="topbar"
          alt={`${property.name} top bar`}
        />
      )}

      <div className="about-content">
        <div className="feature-container">
          <div className="split-container">
            <div className="title-container">
              {/* Optional "Welcome to" graphic */}
              {property.images?.welcomeTo && (
                <img
                  src={property.images.welcomeTo}
                  className="welcome-to"
                  alt="Welcome"
                />
              )}
            </div>

            {/* Intro / About text */}
            <div className="info-container main-title">
              {description?.welcome && <h3>{description.welcome}</h3>}
              {description?.main && <h3>{description.main}</h3>}
              {description?.additional && <h3>{description.additional}</h3>}
              {description?.closing && <h3>{description.closing}</h3>}
            </div>
          </div>

          {/* Gallery */}
          <div className="gallery-container">
            {renderView()}
            <div className="view-options">
              <button
                type="button"
                onClick={() => setView("carousel")}
                aria-pressed={view === "carousel"}
              >
                Carousel View
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
              >
                Gallery View
              </button>
            </div>
          </div>

          {/* Lightbox */}
          {isLightboxOpen && images[lightboxIndex] && (
            <Lightbox
              mainSrc={images[lightboxIndex].original}
              nextSrc={images[(lightboxIndex + 1) % images.length].original}
              prevSrc={
                images[(lightboxIndex + images.length - 1) % images.length]
                  .original
              }
              onCloseRequest={() => setIsLightboxOpen(false)}
              onMovePrevRequest={() =>
                setLightboxIndex(
                  (lightboxIndex + images.length - 1) % images.length
                )
              }
              onMoveNextRequest={() =>
                setLightboxIndex((lightboxIndex + 1) % images.length)
              }
            />
          )}
        </div>

        <div className="feature-container">
          {/* About/summary */}
          {(details?.summary || property.capacity) && (
            <div className="split-container" id="about-space">
              <div className="title-container">
                <h2>About Our Cottage</h2>
              </div>
              <div className="info-container">
                <p>
                  {property.capacity?.sleeps
                    ? `Sleeps ${property.capacity.sleeps}`
                    : null}
                  {details?.summary && (
                    <>
                      <br />
                      {details.summary}
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Living spaces */}
          {(details?.spaces?.length || details?.additionalInfo) && (
            <div className="split-container" id="about-space">
              <div className="title-container">
                <h2>Living Spaces</h2>
              </div>
              <div className="info-container">
                {Array.isArray(details?.spaces) &&
                  details.spaces.map((space, i) => (
                    <p key={`${space?.title || "space"}-${i}`}>
                      {space?.title ? (
                        <>
                          <strong>{space.title}:</strong>{" "}
                          {space?.description || ""}
                        </>
                      ) : (
                        space?.description || ""
                      )}
                    </p>
                  ))}
                {details?.additionalInfo && (
                  <p>
                    <em>{details.additionalInfo}</em>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          {Array.isArray(amenities) && amenities.length > 0 && (
            <div className="split-container" id="about-space">
              <div className="title-container">
                <h2>Good To Know</h2>
              </div>
              <div className="info-container">
                <ul>
                  {amenities.map((item, idx) => (
                    <li key={`amenity-${idx}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Accessibility */}
          {accessibility && (
            <div className="split-container" id="about-space">
              <div className="title-container">
                <h2>Accessibility</h2>
              </div>
              <div className="info-container">
                <p>{accessibility}</p>
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        {location?.mapEmbedUrl && (
          <div className="map-container">
            <iframe
              title={`${property.name} location`}
              src={location.mapEmbedUrl}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
