import React, { useState, useEffect, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getPropertyBySlug } from "../config/properties";
import SeoHead from "./SEO/SeoHead";
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "./SEO/schema";
import "../css/todo.scss";

const Todo = () => {
  const { propertySlug } = useParams();
  const property = getPropertyBySlug(propertySlug);

  const gallery = property?.images?.gallery || [];

  // Build sections from config.guide if present; otherwise fall back
  const sections = useMemo(() => {
    if (property.guide?.sections?.length) {
      return property.guide.sections.map((s) => {
        // Choose images either by filter string or an explicit images array (future friendly)
        let images = [];
        if (Array.isArray(s.images) && s.images.length) {
          images = s.images; // explicit URLs provided
        } else if (s.imageFilter) {
          images = gallery.filter((img) =>
            img.toLowerCase().includes(s.imageFilter.toLowerCase())
          );
        }
        if (!images.length) images = gallery.slice(0, 6); // graceful fallback

        return {
          title: s.title,
          images,
          delay: s.delay || 8000,
          paragraphs: s.paragraphs || [],
          bullets: s.bullets || [],
        };
      });
    }

    // If there’s no guide but there ARE attractions, show a generic section for them
    if (
      Array.isArray(property.attractions) &&
      property.attractions.length > 0
    ) {
      return [
        {
          title: "Local Attractions",
          images: gallery.slice(0, 5),
          delay: 8000,
          paragraphs: [],
          bullets: property.attractions,
        },
      ];
    }

    // Final fallback: one generic section
    return [
      {
        title: "Things to Do",
        images: gallery.slice(0, 6),
        delay: 8000,
        paragraphs: [
          "Local attractions and recommendations for this property will appear here soon.",
        ],
        bullets: [],
      },
    ];
  }, [property, gallery]);

  // Validate propertySlug (after all hooks)
  if (!propertySlug || !property) {
    return <Navigate to="/" replace />;
  }

  // SEO content
  const seoTitle = `What to do near ${property.name} | Holiday Homes & Lets`;
  const seoDescription = `Discover things to do near ${property.name} during your stay.`;
  const orgSchema = buildOrganizationSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: property.name, path: `/${propertySlug}` },
    { name: "What to Do", path: `/${propertySlug}/what-to-do` },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [orgSchema, breadcrumbSchema],
  };

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/${propertySlug}/what-to-do`}
        jsonLd={jsonLd}
      />
      <div className="todo-container">
        {property.images?.topbar && (
          <img
            src={property.images.topbar}
            className="topbar"
            alt={`${property.name} top bar`}
          />
        )}

        {sections.map((section, index) => (
        <AutoTransitionSection
          key={index}
          title={section.title}
          images={section.images}
          delay={section.delay}
          reverse={index % 2 !== 0}
        >
          {section.paragraphs.map((p, i) => (
            <p key={`p-${i}`}>{p}</p>
          ))}
          {section.bullets.length > 0 && (
            <ul>
              {section.bullets.map((b, i) => (
                <li key={`b-${i}`}>{b}</li>
              ))}
            </ul>
          )}
        </AutoTransitionSection>
        ))}
      </div>
    </>
  );
};

const AutoTransitionSection = ({
  title,
  images = [],
  delay = 8000,
  reverse,
  children,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, delay);
    return () => clearInterval(interval);
  }, [images, delay]);

  return (
    <div className={`todo-split-container ${reverse ? "reverse" : ""}`}>
      <div className="todo-title-container">
        {images.map((img, index) => (
          <div
            key={index}
            className={`todo-background-image ${
              index === currentImageIndex ? "visible" : ""
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
        <h2>{title}</h2>
      </div>
      <div className="todo-info-container">{children}</div>
    </div>
  );
};

export default Todo;
