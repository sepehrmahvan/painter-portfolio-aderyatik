import React, { useContext, useState } from "react";
import { MyContext } from "../Context/Context";
import { MdEdit } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import "./EditPoster.scss";
import { toast } from "react-toastify";

export default function EditPoster() {
  const { posterData } = useContext(MyContext);

  const [job, setJob] = useState("");
  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");

  const [Modal, setModal] = useState("none");

  const { galleryStore, refreshing } = useContext(MyContext);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    if (selectedImage === imageUrl) {
      // Deselect the image if it's already selected
      setSelectedImage(null);
    } else {
      // Select the clicked image
      setSelectedImage(imageUrl);
    }
  };

  //   const handleRefresh = () => {
  //     refreshGalleryStore();
  //   };

  const gallerySection = galleryStore.map((imageUrl, index) => (
    <div
      className="gallery-store-container"
      key={index}
      style={{ position: "relative", display: "inline-block" }}
    >
      <img
        onClick={() => handleImageClick(imageUrl)}
        style={{
          border: selectedImage === imageUrl ? "2px solid blue" : "none",
        }}
        src={`http://localhost:5000/${imageUrl?.direction}`}
        alt="image"
      />
      {selectedImage === imageUrl && (
        <div className="clicked-image">
          <IoMdDoneAll />
        </div>
      )}
    </div>
  ));

  async function posterHandler(event) {
    event.preventDefault();
// ! ramtin added
    const token = localStorage.getItem("token");
    if (selectedImage !== null) {
      try {
        const Poster = {
          sloganTitle: slogan,
          headerImage: selectedImage.direction,
          nameTitle: name,
          jobTitle: job,
        };
        const response = await fetch(
          "http://localhost:5000/api/update-header",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(Poster),
          }
        );

        const result = await response.json();
        console.log(result.message);
        toast.success(result.message);
      } catch (error) {
        console.error("Error updating data:", error);
      }

      changePoster(
        job,
        name,
        slogan,
        selectedImage === null ? poster : selectedImage
      );
      setModal("none");
    } else {
      toast.error("you need to choose one picture");
    }
  }

  return (
    <div
      style={{ background: `url(http://localhost:5000/${posterData.headerImage})` }}
      className="poster"
    >
      <div className="poster-text">
        <h3>{posterData.jobTitle}</h3>
        <h1>{posterData.nameTitle}</h1>
        <h2>{posterData.sloganTitle}</h2>
        <a href={posterData.cv}>DOWNLOAD CV</a>
      </div>
      <button onClick={() => setModal("flex")} className="edit edit-poster">
        <MdEdit />
      </button>
      {/* poster content */}
      <div className="edit-modal" style={{ display: Modal }}>
        <form onSubmit={posterHandler}>
          {/* gallery store */}
          <h4>choose image from your gallery</h4>
          {/* <span onClick={handleRefresh} className="refresh-button">
            {refreshing ? "Refreshing..." : "Refresh Gallery"}
          </span> */}
          <div className="gallery-store">{gallerySection}</div>
          {/* job editor */}
          <h4>edit your job title text</h4>
          <input
            className="content"
            onChange={(e) => setJob(e.target.value)}
            type="text"
            placeholder="write what you do"
            value={job}
          />
          {/* name editor */}
          <h4>edit your name text</h4>
          <input
            className="content"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name of your bussiness"
            value={name}
          />
          {/* slogan edittor */}
          <h4>edit your slogan text</h4>
          <input
            className="content"
            onChange={(e) => setSlogan(e.target.value)}
            type="text"
            placeholder="slogan"
            value={slogan}
          />
          <h4>upload pdf file of your resume</h4>
          <input type="file" />
          <span className="upload-cv">Upload Cv</span>
          <button className="save" type="submit">
            save changes
          </button>
          <span className="close-modal" onClick={() => setModal("none")}>
            <IoCloseSharp />
          </span>
        </form>
      </div>
    </div>
  );
}
