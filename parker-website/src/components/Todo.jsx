import React, { useState, useEffect } from "react";
import logo from "../assets/Bwythn_Preswylfa_Logo_Enhanced.png";
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
import "../css/todo.scss";

const Todo = () => {
  const sections = [
    {
      title: "Tregele and Surrounding Areas",
      images: [tregele, tregele2, tregele3, tregele4, tregele5],
      delay: 7000,
      content: (
        <>
          <p>
            Tregele is a small village with the only shop being the Premier
            which is located in the Dragon Petrol station. This shop has pretty
            much everything you could possibly need but for a larger food
            selection there is a Co-op located in Amlwch, a 15-minute drive
            away.
          </p>
          <p>There are larger supermarkets based in Penrhos and Llangefni.</p>
          <p>The closest village is Cemaes Bay.</p>
          <p>
            There are 2 pubs Stag Inn, which serves food, and Ye Old Vigour Inn.
            The Harbour Hotel Bar is also open to the public.
          </p>
          <p>
            There are 2 cafes in the village, The Bell – Y Goch and Coffee Pot.
          </p>
          <p>
            You can drive or walk to the Anglesey Coastal Path from the house,
            by car this takes a couple of minutes and to walk around 25 minutes.
          </p>
        </>
      ),
    },
    {
      title: "Recommendations",
      images: [food, food2, food3, food4],
      delay: 10000,
      content: (
        <>
          <p>
            The Bay View Restaurant, Cemaes does a lovely Sunday lunch and has
            an outdoor play area. We recommend booking a table in advance.
          </p>
          <p>
            Skye’s Creperie, Amlwch is great for brunch dishes. They do special
            evenings so check their Instagram or Facebook page.
          </p>
        </>
      ),
    },
    {
      title: "Beaches",
      images: [beach, beach2, beach3, beach4, beach5],
      delay: 8000,
      content: (
        <>
          <p>
            Cemaes is home to 2 beaches: Traeth Bach (small beach) and Traeth
            Mawr (big beach). Dogs are not allowed on part of Traeth Mawr
            between 1st May and 30th September but are allowed on Traeth Bach
            year-round.
          </p>
          <p>
            Cemlyn is a nature reserve near Tregele that is home to Tern
            colonies. There is a huge pebble beach, but dogs must be kept on
            leads at all times.
          </p>
          <p>
            Newborough beach is huge and situated at the edge of Newborough
            Forest. It’s a great place to walk or spend summer days.
          </p>
          <p>
            Benllech beach is about a 25-minute drive and has a café and public
            toilets. Restrictions for dogs apply during certain months.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="todo-container">
      <img src={logo} className="logo" />
      <h1>What To Do?</h1>
      {sections.map((section, index) => (
        <AutoTransitionSection
          key={index}
          title={section.title}
          images={section.images}
          content={section.content}
          delay={section.delay}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
};

const AutoTransitionSection = ({ title, images, content, reverse, delay }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`todo-split-container ${reverse ? "reverse" : ""}`}>
      <div className="todo-title-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`todo-background-image ${
              index === currentImageIndex ? "visible" : ""
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        ))}
        <h2>{title}</h2>
      </div>
      <div className="todo-info-container">{content}</div>
    </div>
  );
};

export default Todo;
