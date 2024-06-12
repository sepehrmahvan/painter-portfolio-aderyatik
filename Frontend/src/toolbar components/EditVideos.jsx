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
    videoArtsData && videoArtsData.length > 0
      ? videoArtsData[videoArtsData.length - 1]
      : null;

  const [Modal, setModal] = useState("none");

  const [videoCards, setVideoCards] = useState(videoArtsData);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [statement, setStatement] = useState("");
  const [category, setCategory] = useState("");

  // const handleCards = () => {
  //   if (name !== "" && link !== "" && statement !== "" && category !== "" ) {
  //     setVideoCards([
  //       ...videoCards,
  //       {
  //         id: videoCards.length + 1,
  //         link: link,
  //         name: name,
  //         statement: statement,
  //         category: category,
  //       },
  //     ]);
  //     setName("");
  //     setLink("");
  //     setStatement("");
  //     setCategory("");
  //   } else {
  //     alert("You need to fill inputs");
  //   }
  // };
  // const handleDeleteCard = (id) => {
  //   const updatedCards = videoCards.filter((card) => card.id !== id);
  //   setVideoCards(updatedCards);
  // };

  const cardLi = videoCards.map((item) => (
    <ul key={item.id}>
      <li>{item.name}</li>
      <span onClick={() => handleDeleteCard(item.id)} className="delete-card">
        delete item
      </span>
    </ul>
  ));

  // const { changeVideosData } = useContext(MyContext);

  // const videosHandler = (event) => {
  //   if(videoCards){
  //       event.preventDefault();
  //       changeVideosData(
  //         videoCards,
  //       );
  //       setModal("none");
  //   } else{
  //       alert("you dont have any work to post")
  //   }
  // };

  const videoHandler = async () => {
    const title = name;
    const YoutubeURL = link;
    if (name !== "" && link !== "" && statement !== "") {
      try {
        const logoURL = {
          logoURL: selectedImage.direction,
        };

        const response = await fetch("http://localhost:5000/api/add-youtube", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
          src={`https://www.youtube.com/embed/${lastVideoArt.link}`}
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
