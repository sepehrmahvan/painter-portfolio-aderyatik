import React, { useContext, useState } from "react";
import "./VideosPage.scss";
import { MyContext } from "../Context/Context";
import Header from "../components/Header";

export const VideosPage = () => {
  const { videoArtsData } = useContext(MyContext);

  console.log(videoArtsData, "get videos");

  const [shownCategory, setShownCategory] = useState("all");

  const uniqueCategories = Array.from(
    new Set(videoArtsData.map((item) => item.category))
  );

  const videoSampleCategories = uniqueCategories.map((category, index) => (
    <button
      onClick={() => setShownCategory(category)}
      className="category-btns"
      key={index}
    >
      {category}
    </button>
  ));

  const filteredVideos =
    shownCategory === "all"
      ? videoArtsData
      : videoArtsData.filter((item) => item.category === shownCategory);

  const extractSrcFromIframe = (iframeString) => {
    const srcMatch = iframeString?.match(/src="([^"]*)"/);
    return srcMatch ? srcMatch[1] : "";
  };

  const videoCards = filteredVideos.map((work, index) => (
    <div key={index} className="video-card">
      <div className="video-player">
        <iframe src={extractSrcFromIframe(work.YoutubeURL)}></iframe>
      </div>
      <div className="video-description">
        <h2>
          <strong>{work.title}</strong>
        </h2>
        <h3>{work.category}</h3>
        <p>
          <span>statement:</span> {work.statement}
        </p>
      </div>
    </div>
  ));

  return (
    <div className="video-art-page">
      <Header />
      <div className="video-art-container">
        <div className="video-art-category-buttons">
          <button
            onClick={() => setShownCategory("all")}
            className="video-art-btn"
          >
            All
          </button>
          {videoSampleCategories}
          {}
        </div>
        <div className="video-arts-cards">{videoCards}</div>
      </div>
    </div>
  );
};
