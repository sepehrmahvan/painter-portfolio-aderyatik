import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./EditVideos.scss";
import { MyContext } from "../Context/Context";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";

export default function EdittVideos() {
  const { videoArtsData } = useContext(MyContext);

  const lastVideoArt =
    videoArtsData
      ? videoArtsData[videoArtsData.length - 1]
      : null;

  const [Modal, setModal] = useState("none");

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [statement, setStatement] = useState("");
  const [category, setCategory] = useState("");

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/delete-youtube", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({id}),
      });

      const result = await response.json();
      if(result){
        toast.success("video art has been removed succesfully");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  const cardLi = videoArtsData && videoArtsData.map((item, index) => (
    <ul key={index}>
      <li>{item.title}</li>
      <span onClick={() => handleDelete(item._id)} className="delete-card">
        delete item
      </span>
    </ul>
  ));

  const videoHandler = async () => {
    const title = name;
    const YoutubeURL = link;
    const token = localStorage.getItem("token");
    if (name !== "" && link !== "" && statement !== "") {
      try {
        const response = await fetch("http://localhost:5000/api/add-youtube", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({title, YoutubeURL, statement, category}),
        });

        const result = await response.json();
        console.log(result);
        if(result){
          toast.success("video art has been added succesfully");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      toast.error("you need to fill the empty inputs");
    }
  }

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
        <Link to={"/"}>SEE MORE</Link>
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
      <button onClick={() => setModal("flex")} className="edit edit-videos">
        <MdEdit />
      </button>
      {/* edit videos */}
      <div className="edit-modal" style={{ display: Modal }}>
        <form>
          <h4>write title of the video</h4>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className="content"
          />
          <h4>youtube ID of the video</h4>
          <input
            onChange={(e) => setLink(e.target.value)}
            placeholder="youtube video ID"
            type="text"
            className="content"
          />
          <h4>statement</h4>
          <textarea
            onChange={(e) => setStatement(e.target.value)}
            placeholder="statement"
            className="content"
          ></textarea>
          <h4>category</h4>
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            placeholder="category"
            className="content"
          />
          <span onClick={videoHandler} className="add-card-btn">
            add work
          </span>
          {cardLi}
          <button onClick={() => setModal("none")} className="save">
            close
          </button>
          <span className="close-modal" onClick={() => setModal("none")}>
            <IoCloseSharp />
          </span>
        </form>
      </div>
    </div>
  );
}
