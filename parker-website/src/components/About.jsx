import React, { useState, useEffect } from "react";
import "../css/about.scss";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Lightbox from "react-image-lightbox"; // For full-screen view
import "react-image-lightbox/style.css";
import image1 from "../assets/2.jpg";
import image2 from "../assets/3.jpg";
import image3 from "../assets/54.jpg";
import image4 from "../assets/20240324_170910.jpg";
import image5 from "../assets/20240908_141632.jpg";
import image6 from "../assets/IMG-20240520-WA0009.jpg";
import image7 from "../assets/IMG-20240528-WA0000.jpg";
import image8 from "../assets/SmartSelect_20240225_201528_Airbnb.jpg";
import image9 from "../assets/SmartSelect_20240225_201536_Airbnb.jpg";
import beach from "../assets/beach.jpg";
import beach2 from "../assets/beach2.jpg";
import beach3 from "../assets/beach3.jpg";
import beach4 from "../assets/beach4.jpg";
import beach5 from "../assets/beach5.jpg";
import food from "../assets/food.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import food4 from "../assets/food4.jpg";
import tregele from "../assets/tregele.jpg";
import tregele2 from "../assets/tregele2.jpg";
import tregele3 from "../assets/tregele3.jpg";
import tregele4 from "../assets/tregele4.jpg";
import tregele5 from "../assets/tregele5.jpg";
import welcometo from "../assets/welcome.png";
import topbar from "../assets/Topbar.png";

const About = () => {
  const [view, setView] = useState("grid"); // Options: "carousel", "grid", "fullscreen"
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = [
    { original: image1, thumbnail: image1 },
    { original: image2, thumbnail: image2 },
    { original: image3, thumbnail: image3 },
    { original: image4, thumbnail: image4 },
    { original: image5, thumbnail: image5 },
    { original: image6, thumbnail: image6 },
    { original: image7, thumbnail: image7 },
    { original: image8, thumbnail: image8 },
    { original: image9, thumbnail: image9 },
    { original: tregele, thumbnail: tregele },
    { original: tregele2, thumbnail: tregele2 },
    { original: tregele3, thumbnail: tregele3 },
    { original: tregele4, thumbnail: tregele4 },
    { original: tregele5, thumbnail: tregele5 },
    { original: food, thumbnail: food },
    { original: food2, thumbnail: food2 },
    { original: food3, thumbnail: food3 },
    { original: food4, thumbnail: food4 },
    { original: beach, thumbnail: beach },
    { original: beach2, thumbnail: beach2 },
    { original: beach3, thumbnail: beach3 },
    { original: beach4, thumbnail: beach4 },
    { original: beach5, thumbnail: beach5 },
  ];

  useEffect(() => {
    const preloadImages = (imageArray) => {
      imageArray.forEach(({ original }) => {
        const img = new Image();
        img.src = original;
      });
    };

    preloadImages(images);
  }, [images]);

  // Dynamically set view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 850) {
        setView("carousel"); // Force "carousel" view on mobile
      } else {
        setView("grid"); // Default to "grid" on desktop
      }
    };

    // Initial check
    handleResize();

    // Add event listener for resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render the current view
  const renderView = () => {
    if (view === "carousel") {
      return (
        <ImageGallery
          items={images}
          showThumbnails={true}
          showPlayButton={false}
          thumbnailPosition="bottom"
          onSlide={(index) => setLightboxIndex(index)} // Track active index
          onClick={() => setIsLightboxOpen(true)} // Open Lightbox when image is clicked
        />
      );
    } else if (view === "grid") {
      return (
        <div className="gallery-grid">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => {
                setLightboxIndex(index);
                setIsLightboxOpen(true);
              }}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="about-container">
      {/* <img src={logo} className="logo" /> */}
      {/* <h1>About</h1> */}
      <img src={topbar} className="topbar" />
      <div className="about-content">
        <div className="feature-container">
          <div className="split-container">
            <div className="title-container">
              <img src={welcometo} className="welcome-to" />
            </div>
            <div className="info-container main-title">
              <h3>
                Hello! We’re Jonny, Lucy, Oscar, and Bertie — soon to be a
                family of five this year. Welcome to Bwythn Preswylfa, our cosy
                little holiday cottage.
              </h3>
              <h3>
                Anglesey has held a special place in our hearts for many years;
                it’s where we’ve made so many cherished family memories. Nestled
                in a peaceful spot near the coastal path and the lovely village
                of Cemaes, our cottage is the perfect retreat for relaxation and
                adventure alike.
              </h3>
              <h3>
                With Mum just down the road in Amlwch, it feels like home here,
                surrounded by friendly faces, stunning beaches, and the natural
                beauty of the island.
              </h3>
              <h3>
                We can’t wait to share this little slice of Anglesey with you.
              </h3>
            </div>
          </div>

          <div className="gallery-container">
            {renderView()}{" "}
            <div className="view-options">
              <button onClick={() => setView("carousel")}>Carousel View</button>
              <button onClick={() => setView("grid")}>Gallery View</button>
            </div>
          </div>

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
          <div className="split-container" id="about-space">
            <div className="title-container">
              <h2>About Our Cottage</h2>
            </div>
            <div className="info-container">
              <p>
                Sleeps 4 + 2 (sofa bed)
                <br />
                Discover tranquility in this 2 king-size bed terraced cottage
                situated in a small village just outside Cemaes village, with
                the Anglesey coastal path and beaches in walking distance. Our
                pet-friendly haven with spacious rooms and just steps away from
                walking routes, beaches, and a golf course. Your escape to
                serenity awaits in our garden oasis in a quiet location.
              </p>
            </div>
          </div>

          <div className="split-container" id="about-space">
            <div className="title-container">
              <h2>Living Spaces</h2>
            </div>
            <div className="info-container">
              <p>
                <strong>Lounge:</strong> There are 2 lounges. The small lounge
                has a sofa with a log burner and small TV. The large lounge has
                a larger seating area with TV, a room divider, and a sofa bed
                available.
              </p>
              <p>
                <strong>Kitchen/Dining Area:</strong> Large kitchen with all
                major appliances and a large dining table. Boot room leading
                from the kitchen to the garden.
              </p>
              <p>
                <strong>Bedroom 1:</strong> Large king-sized bed, chest of
                drawers, and chair.
              </p>
              <p>
                <strong>Bedroom 2:</strong> Two single beds or one super
                king-sized bed, chair, and wardrobe.
              </p>
              <p>
                <em>
                  ***Guests 5 and 6 will sleep on a sofa bed in the lounge. A
                  privacy screen/room divider is available. Please add extra
                  guests to the booking form.***
                </em>
              </p>
              <p>
                <strong>Bathroom:</strong> Bath with electric shower.
              </p>
              <p>
                <strong>Outside:</strong> Split-level garden with table and
                chairs.
              </p>
            </div>
          </div>

          <div className="split-container" id="about-space">
            <div className="title-container">
              <h2>Good To Know</h2>
            </div>
            <div className="info-container">
              <ul>
                <li>Log burner in lounge</li>
                <li>Towels and linen included</li>
                <li>Private parking</li>
                <li>Internet access</li>
                <li>
                  Travel cot and high chair (please ask for these to be left out
                  if required)
                </li>
                <li>Central Heating</li>
                <li>BBQ</li>
                <li>Dogs allowed</li>
              </ul>
            </div>
          </div>

          <div className="split-container" id="about-space">
            <div className="title-container">
              <h2>Accessibility</h2>
            </div>
            <div className="info-container">
              <p>
                While the entire property is available for use to guests, the
                cottage is unfortunately unsuitable for wheelchair access.
              </p>
            </div>
          </div>
        </div>
        <div className="map-container">
          <iframe
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d372.44411929445744!2d-4.473623768851724!3d53.40460114605375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTPCsDI0JzE2LjciTiA0wrAyOCcyNC45Ilc!5e0!3m2!1sen!2suk!4v1733407752336!5m2!1sen!2suk"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
