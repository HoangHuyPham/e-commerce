import React, { Component } from "react";
import slide1 from "../assets/images/slideshow1.png";
import slide2 from "../assets/images/slideshow2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from 'react-bootstrap/Carousel';

class SlideShow extends Component {
  render() {
    return (
    <Carousel className="SlideShow" variant="dark" interval={2000}>
      <Carousel.Item className="SlideShowItem">
        <img className="w-100" src={slide1} alt="slide1"/>
      </Carousel.Item>
      <Carousel.Item className="SlideShowItem">
        <img className="w-100" src={slide2} alt="slide2"/>
      </Carousel.Item>
      
    </Carousel>
    )
      
  }
}

export default SlideShow;
