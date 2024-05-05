import React, { useContext, useState } from "react";
import "./EditContacts.scss";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPinterestP } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MyContext } from "../Context/Context";
import { MdEdit } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export default function EditContacts() {
  const { contactData } = useContext(MyContext);

  const [Modal, setModal] = useState("none");

  const [email, setEmail] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");

  //   gallery store

  const { galleryStore } = useContext(MyContext);

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

  const { changeContacts } = useContext(MyContext)

  const contactsHandler = (e) => {
    e.preventDefault();
    if(email !== "" && selectedImage !== ""){
        changeContacts(selectedImage, email, pinterest, linkedIn, youtube, instagram)
        setModal('none');
    } else{
        alert('you need to fill at least email input and choose an image')
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    alert("Email copied to clipboard!");
  };

  return (
    <div className="contact">
      <div className="contact-description">
        <h2>CONTACT ME</h2>
        <div className="contacts-container">
          <div className="contact-info">
            <p className="contact-icon">
              <MdOutlineMailOutline />
            </p>
            <p onClick={handleCopyEmail} className="contact-text">{contactData.email}</p>
          </div>
          <div className="contact-info">
            <p className="contact-icon">
              <FaPinterestP />
            </p>
            <a href={contactData.pinterest} className="contact-text">
              Pinterest
            </a>
          </div>
          <div className="contact-info">
            <p className="contact-icon">
              <TiSocialLinkedin />
            </p>
            <a href={contactData.linkedin} className="contact-text">
              LinkedIn
            </a>
          </div>
          <div className="contact-info">
            <p className="contact-icon">
              <FaYoutube />
            </p>
            <a href={contactData.youtube} className="contact-text">
              Youtube
            </a>
          </div>
          <div className="contact-info">
            <p className="contact-icon">
              <FaInstagram />
            </p>
            <a href={contactData.instagram} className="contact-text">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="contact-image">
        <img src={contactData.image} alt="" />
      </div>
      <button onClick={() => setModal("flex")} className="edit edit-contacts">
        <MdEdit />
      </button>
      {/* edit videos */}
      <div className="edit-modal" style={{ display: Modal }}>
        <form onSubmit={contactsHandler}>
          {/* gallery store */}
          <h4>choose images from your gallery</h4>
          {/* <span onClick={handleRefresh} className="refresh-button">
            {refreshing ? "Refreshing..." : "Refresh Gallery"}
          </span> */}
          <div className="gallery-store">{gallerySection}</div>
          <h4>email</h4>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="content"
          />
          <h4>pinterest link</h4>
          <input
            onChange={(e) => setPinterest(e.target.value)}
            placeholder="pinterest link"
            type="text"
            className="content"
          />
          <h4>linkedIn link</h4>
          <input
            onChange={(e) => setLinkedIn(e.target.value)}
            type="text"
            placeholder="linkedin link"
            className="content"
          ></input>
          <h4>youtube</h4>
          <input
            onChange={(e) => setYoutube(e.target.value)}
            type="text"
            placeholder="youtube link"
            className="content"
          />
          <h4>instagram</h4>
          <input
            onChange={(e) => setInstagram(e.target.value)}
            type="text"
            placeholder="instagram link"
            className="content"
          />
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
