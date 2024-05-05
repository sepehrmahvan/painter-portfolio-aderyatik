import React, { useContext, useState } from "react";
import "../pages/Toolbar.scss";
import { Link } from "react-router-dom";
import { MyContext } from "../Context/Context";
import { MdEdit } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export default function EditLogo() {
  const { logoData, changeLogo } = useContext(MyContext);
  //   edit logo
  const [Modal, setModal] = useState("none");

  function LogoHandler(event) {
    event.preventDefault();
    if (selectedImage !== null) {
      changeLogo(selectedImage);
      setModal("none");
    } else {
      toast.error("you need to choose one picture");
    }
  }

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
        src={imageUrl}
        alt="image"
      />
      {selectedImage === imageUrl && (
        <div className="clicked-image">
          <IoMdDoneAll />
        </div>
      )}
    </div>
  ));

  return (
    <header>
      <nav>
        <Link to={"/"}>HOME</Link>
        <Link to={"/works"}>WORKS</Link>
        <Link to={"/video-arts"}>VIDEO ARTS</Link>
        <a href="#">ABOUT</a>
        <a href="CONTACT">CONTACT</a>
      </nav>
      <button onClick={() => setModal("flex")} className="edit edit-logo">
        <MdEdit />
      </button>
      <div className="logo">
        <img src={logoData} alt="" />
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
    </header>
  );
}
