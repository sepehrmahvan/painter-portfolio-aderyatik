import React, { useContext, useState } from "react";
import "../pages/Toolbar.scss";
import { Link } from "react-router-dom";
import { MyContext } from "../Context/Context";
import { MdEdit, MdUpload } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaPowerOff } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function EditLogo() {
  const { logoData } = useContext(MyContext);
  //   edit logo
  const [Modal, setModal] = useState("none");
  const [uploadModal, setUploadModal] = useState("none");

  // console.log(image)
  const { galleryStore, refreshing, refreshGalleryStore } = useContext(MyContext);

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

  const handleRefresh = () => {
    refreshGalleryStore();
  };

  // ! RAMTIN ADDED token added
  const LogoHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (selectedImage) {
      try {
        const logoData = selectedImage.direction;
        const response = await fetch("https://api.aderyatik.com/api/update-logo", {
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
    } else{
      toast.error("you need to choose one image")
    }
  };
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
        src={`https://api.aderyatik.com/api/${imageUrl?.direction}`}
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

  const [Image, setImage] = useState(null);
  const handleAddToGallery = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token, "token");
    try {
      if (!Image) {
        console.log("No image selected.");
        return;
      }
      const formData = new FormData();
      formData.append("image", Image);
      const response = await fetch("https://api.aderyatik.com/api/upload-image", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      if (response.ok) {
        toast.success("Image uploaded successfully!");
        console.log(response, "response");
        setUploadModal("none");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  // menu

  const [showMenu, setShowMenu] = useState("-100%");

  return (
    <header>
      <button onClick={() => setShowMenu("0")} className="menu-btn">
        <IoMenu />
      </button>
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
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="log-out"
        >
          <FaPowerOff />
        </button>
      </div>
      <div className="logo">
        <img src={`https://api.aderyatik.com/api/${logoData}`} alt="logo" />
      </div>
      {/* menu */}
      <div style={{ left: showMenu }} className="menu">
        <div className="menu-container">
          <Link to={"/"}>HOME</Link>
          <Link to={"/works"}>WORKS</Link>
          <Link to={"/video-arts"}>VIDEO ARTS</Link>
          <a href="#about-me">ABOUT</a>
          <a href="#contact-me">CONTACT</a>
          <span onClick={() => setShowMenu("-100%")} className="close-menu">
            <IoMdClose />
          </span>
        </div>
      </div>
      {/* edit logo */}
      <div className="edit-modal" style={{ display: Modal }}>
        <form>
          {/* gallery store */}
          <h4>choose an image for your logo</h4>
          <span onClick={handleRefresh} className="refresh-button">
              {refreshing ? "Refreshing..." : "Refresh Gallery"}
            </span>

          <div className="gallery-store">{gallerySection}</div>
          <button onClick={LogoHandler}>
            save changes
          </button>
          <span className="close-modal" onClick={() => setModal("none")}>
            <IoCloseSharp />
          </span>
        </form>
      </div>
      {/* upload */}
      <div className="edit-modal" style={{ display: uploadModal }}>
        <form>
          <h4>upload image to your gallery</h4>
          {/* ramtinAdded */}
          <input
            type="file"
            name="image"
            title="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button className="save" onClick={handleAddToGallery}>Add To Gallery</button>
          <span onClick={() => setUploadModal("none")} className="close-modal">
            <IoCloseSharp />
          </span>
        </form>
      </div>
    </header>
  );
}
