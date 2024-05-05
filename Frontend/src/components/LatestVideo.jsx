import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './Latestvideo.scss';
import { MyContext } from "../Context/Context";

export default function LatestVideo() {

  const { videoArtsData } = useContext(MyContext);

  const lastVideoArt = videoArtsData && videoArtsData.length > 0 ? videoArtsData[videoArtsData.length - 1] : null;
  return (
    <div className="latest-video">
      <div className="latest-video-title">
        <h2>MY LATEST VIDEO ART</h2>
        <Link to={"/"}>SEE MORE</Link>
      </div>
      <div className="latest-video-player">
        <iframe
          width="560"
          height="480"
          src={lastVideoArt.link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
