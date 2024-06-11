import React, { useContext, useState } from "react";
import "../pages/Toolbar.scss";
import { Link } from "react-router-dom";
import { MyContext } from "../Context/Context";
import { MdEdit } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import image from "../../../Backend/public/uploads/UtankQDZ1css.png"
export default function EditLogo() {
  const { logoData, changeLogo, setImage, handleAddToGallery , Image } =
    useContext(MyContext);
  //   edit logo
  const [Modal, setModal] = useState("none");

// console.log(image)
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
  // ! RAMTIN ADDED
  console.log(selectedImage,"selectedImage")
  async function LogoHandler(event) {
    event.preventDefault();
    if (selectedImage !== null) {
      try {
        const logoURL = {
          logoURL: selectedImage.direction
        };
      
              const response = await fetch('http://localhost:5000/api/updateuser', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(logoURL)
              });
      
              const result = await response.json();
              console.log(result);
              // setGalleryStore(result);
            } catch (error) {
              console.error('Error updating data:', error);
            }
          
      changeLogo(selectedImage);
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
          {/* ramtinAdded */}
          {console.log(Image,"image")}
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
