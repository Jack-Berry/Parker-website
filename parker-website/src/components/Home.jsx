import React, { Component } from "react";
import ReactBackgroundSlideshow from "react-background-slideshow";
import image1 from "../assets/2.jpg";
import image2 from "../assets/3.jpg";
import image4 from "../assets/53.jpg";
import image3 from "../assets/54.jpg";

const Home = () => {
  return (
    <>
      <ReactBackgroundSlideshow images={[image1, image2, image3, image4]} />
    </>
  );
};

export default Home;
