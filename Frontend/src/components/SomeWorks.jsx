import React, { useContext, useState } from "react";
import "./Someworks.scss";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MyContext } from "../Context/Context";

export default function SomeWorks() {
  const rightArrow = <IoIosArrowForward />
  const leftArrow = <IoIosArrowBack />

  const { worksData } = useContext(MyContext);

  const items = worksData.map((item) => (
    <div key={item._id} className="work-item">
      <img src={`https://api.aderyatik.com/api/${item.workSampleURL}`} alt="my-work" />
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    469: { items: 2 },
    768: { items: 3 },
    1024: { items: 4 },
  };
  return (
    <div className="some-works">
      <div className="some-works-title">
        <h2>EXPLORE SOME OF MY WORKS</h2>
        <Link to={"/works"}>SEE MORE</Link>
      </div>
      <div className="some-works-slider">
      <AliceCarousel
        mouseTracking
        disableDotsControls
        items={items}
        responsive={responsive}
        controlsStrategy="responsive"
        infinite
        renderPrevButton={() => {
          return <button className="previous">{leftArrow}</button>;
        }}
        renderNextButton={() => {
          return <button className="next">{rightArrow}</button>;
        }}
      />
      </div>
    </div>
  );
}
