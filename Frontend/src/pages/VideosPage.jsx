import React, { useContext } from "react";
import "./VideosPage.scss";
import { MyContext } from "../Context/Context";
import Header from "../components/Header";
import CopyRight from "../components/CopyRight";

export const VideosPage = () => {
  const { videoArtsData } = useContext(MyContext);

  const extractSrcFromIframe = (iframeString) => {
    const srcMatch = iframeString?.match(/src="([^"]*)"/);
    return srcMatch ? srcMatch[1] : "";
  };

  const videoCards = videoArtsData.map((work, index) => (
    <div key={index} className="video-card">
      <div className="video-player">
        <iframe src={extractSrcFromIframe(work.YoutubeURL)}></iframe>
      </div>
      <div className="video-description">
        <h2>
          <strong>{work.title}</strong>
        </h2>
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
        <div className="video-arts-cards">{videoCards}</div>
      </div>
      <CopyRight/>
    </div>
  );
};
