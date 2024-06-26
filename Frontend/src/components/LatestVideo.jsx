import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Latestvideo.scss";
import { MyContext } from "../Context/Context";

export default function LatestVideo() {
  const { videoArtsData } = useContext(MyContext);

  const lastVideoArt =
    videoArtsData
      ? videoArtsData[videoArtsData.length - 1]
      : null;

      const getYouTubeEmbedUrl = (url) => {
        if(lastVideoArt.YoutubeURL){
          const match = url.match(/embed\/([^\?]*)/);
          return match ? match[1] : "";
        }
      };
  return (
    <div className="latest-video">
      <div className="latest-video-title">
        <h2>MY LATEST VIDEO ART</h2>
        <Link to={"/video-arts"}>SEE MORE</Link>
      </div>
      <div className="latest-video-player">
        <iframe
          width="560"
          height="480"
          src={videoArtsData[0] ? `https://www.youtube.com/embed/${getYouTubeEmbedUrl(lastVideoArt.YoutubeURL)}` : ""}
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
