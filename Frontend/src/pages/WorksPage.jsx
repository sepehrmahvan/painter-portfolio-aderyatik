import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { MyContext } from "../Context/Context";
import "./WorksPage.scss";

export const WorksPage = () => {
  const { worksData } = useContext(MyContext);

  const [shownCategory, setShownCategory] = useState("all");

  const uniqueCategories = Array.from(
    new Set(worksData.map((item) => item.workSampleCategory))
  );

  const workSampleCategories = uniqueCategories.map((category, index) => (
    <button
      onClick={() => setShownCategory(category)}
      className="category-btns"
      key={index}
    >
      {category}
    </button>
  ));

  const filteredWorks =
    shownCategory === "all"
      ? worksData
      : worksData.filter((item) => item.workSampleCategory === shownCategory);

  const worksCards = filteredWorks.map((work, index) => (
    <div key={index} className="work-card">
      <div className="work-image">
        <img
          src={`https://api.aderyatik.com/${work.workSampleURL}`}
          alt="aderyatik paint"
        />
      </div>
      <div className="work-description">
        <h2><strong>{work.workSampleTitle}</strong></h2>
        <h3>{work.workSampleCategory}</h3>
        <p><span>About this art work:</span> {work.workSampleAbout}</p>
        <p><span>statement:</span> {work.workSampleStatement}</p>
      </div>
    </div>
  ));

  return (
    <div className="works-page">
      <Header />
      <div className="works-container">
        <div className="works-category-buttons">
          <button
            onClick={() => setShownCategory("all")}
            className="category-btns"
          >
            All
          </button>
          {workSampleCategories}
        </div>
        <div className="works-cards">{worksCards}</div>
      </div>
    </div>
  );
};
