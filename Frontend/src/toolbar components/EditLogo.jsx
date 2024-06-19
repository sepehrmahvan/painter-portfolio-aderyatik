import React, { useContext, useState } from "react";
import "../pages/Toolbar.scss";
import { Link } from "react-router-dom";
import { MyContext } from "../Context/Context";
import { MdEdit, MdUpload } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaPowerOff } from "react-icons/fa";

export default function EditLogo() {
  const { logoData, handleAddToGallery } = useContext(MyContext);
  //   edit logo
  const [Modal, setModal] = useState("none");

  // console.log(image)
  const { galleryStore, refreshing, setImage } = useContext(MyContext);

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

  // ! RAMTIN ADDED token added
  async function LogoHandler(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (selectedImage !== null) {
      try {
        const logoData = selectedImage.direction;
        const response = await fetch("http://localhost:5000/api/update-logo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ logoData }),
        });

        const result = await response.json();
        console.log(result);
        toast.success(result.message);
      } catch (error) {
        console.error("Error updating data:", error);
      }
      setModal("none");
    } else {
      toast.error("you need to choose one picture");
    }
  }
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
        //? ramtin Added
        // ../../../Backend/uploads/
        src={`http://localhost:5000/${imageUrl?.direction}`}
        alt="image"
      />
      {/* {console.log(`http://localhost:5000/${imageUrl?.direction}`,"imageUrl.direction")} */}
      {selectedImage === imageUrl && (
        <div className="clicked-image">
          <IoMdDoneAll />
        </div>
      )}
    </div>
  ));

  const [uploadModal, setUploadModal] = useState("none");

  return (
    <header>
      <nav>
        <Link to={"/"}>HOME</Link>
        <Link to={"/works"}>WORKS</Link>
        <Link to={"/video-arts"}>VIDEO ARTS</Link>
        <a href="#">ABOUT</a>
        <a href="CONTACT">CONTACT</a>
      </nav>
      <div style={{ display: "flex" }} className="edit-logo-buttons">
        <button
          style={{ margin: "0 20px" }}
          onClick={() => setModal("flex")}
          className="edit edit-logo"
        >
          <MdEdit />
        </button>
        <button
          onClick={() => setUploadModal("flex")}
          className="edit edit-logo"
        >
          <MdUpload />
        </button>
        <button onClick={() => {localStorage.removeItem("token")}} className="log-out">
          <FaPowerOff />
        </button>
      </div>
      <div className="logo">
        <img src={`http://localhost:5000/${logoData}`} alt="logo" />
      </div>
      {/* edit logo */}
      <div className="edit-modal" style={{ display: Modal }}>
        <form onSubmit={LogoHandler}>
          {/* gallery store */}
          <h4>choose an image for your logo</h4>
          {/* <span onClick={handleRefresh} className="refresh-button">
              {refreshing ? "Refreshing..." : "Refresh Gallery"}
            </span> */}

          <div className="gallery-store">{gallerySection}</div>
          <button className="save" type="submit">
            save changes
          </button>
          <span className="close-modal" onClick={() => setModal("none")}>
            <IoCloseSharp />
          </span>
        </form>
      </div>
      <div className="edit-modal" style={{ display: uploadModal }}>
        <form onSubmit={LogoHandler}>
          <h4>upload image to your gallery</h4>
          {/* ramtinAdded */}
          <input
            type="file"
            name="image"
            title="image"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ backgroundColor: "red" }}
          />
          <button onClick={() => handleAddToGallery()}>Add To Gallery</button>
          {/* <span onClick={handleRefresh} className="refresh-button">
              {refreshing ? "Refreshing..." : "Refresh Gallery"}
            </span> */}
          <span onClick={() => setUploadModal("none")} className="close-modal">
            <IoCloseSharp />
          </span>
        </form>
      </div>
    </header>
  );
}
