import React, { Component } from "react";
import Nav from "./Nav";
import "../css/about.scss";
import image1 from "../assets/2.jpg";

const About = () => {
  return (
    <div className="about-container">
      <h1>About</h1>
      <div className="about-content">
        <div className="gallery-container">
          <h3>
            Short Blurb - Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Reiciendis alias similique nam maiores sint. Inventore,
            molestiae? Quasi facilis nulla ducimus, quidem, earum inventore
            beatae, quisquam nostrum porro magni soluta facere!
          </h3>
          <img src={image1} alt="img" />
        </div>
        <p>
          Extra info about facilities etc = Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Deserunt ab eum laborum accusamus
          dolorem debitis est, quas eligendi saepe delectus, excepturi natus
          odit in, cupiditate quos nesciunt id harum quae! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Consequuntur consequatur
          dignissimos exercitationem rerum est at quod nihil similique illo
          nostrum sunt perferendis culpa, error ad mollitia consectetur quia
          quos itaque?
        </p>
        <p>
          Extra info about facilities etc = Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Deserunt ab eum laborum accusamus
          dolorem debitis est, quas eligendi saepe delectus, excepturi natus
          odit in, cupiditate quos nesciunt id harum quae! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Consequuntur consequatur
          dignissimos exercitationem rerum est at quod nihil similique illo
          nostrum sunt perferendis culpa, error ad mollitia consectetur quia
          quos itaque?
        </p>
        <p>
          Extra info about facilities etc = Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Deserunt ab eum laborum accusamus
          dolorem debitis est, quas eligendi saepe delectus, excepturi natus
          odit in, cupiditate quos nesciunt id harum quae! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Consequuntur consequatur
          dignissimos exercitationem rerum est at quod nihil similique illo
          nostrum sunt perferendis culpa, error ad mollitia consectetur quia
          quos itaque?
        </p>
      </div>
      <Nav />
    </div>
  );
};

export default About;
