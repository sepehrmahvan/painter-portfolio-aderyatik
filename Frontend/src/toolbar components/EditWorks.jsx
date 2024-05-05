import React, { useContext, useEffect, useState } from "react";
import "./EditWorks.scss";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MyContext } from "../Context/Context";
import { MdEdit } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export default function EditWorks() {
  const rightArrow = <IoIosArrowForward />;
  const leftArrow = <IoIosArrowBack />;

  const { worksData } = useContext(MyContext);

  const items = worksData.map((item) => (
    <div key={item.id} className="work-item">
      <img src={item.image} alt="my-work" />
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    469: { items: 2 },
    580: { items: 3 },
    1024: { items: 4 },
  };

  const [Modal, setModal] = useState("none");

  const [workCards, setWorkCards] = useState(worksData);

  const [name, setName] = useState("");
  const [statement, setStatement] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

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

  const handleCards = () => {
    if (name !== "" && selectedImage?.trim() !== "" && statement !== "" && category !== "" && about !== "" ) {
      setWorkCards([
        ...workCards,
        {
          id: workCards.length + 1,
          image: selectedImage,
          name: name,
          statement: statement,
          category: category,
          about: about
        },
      ]);
      setName("");
      setSelectedImage("");
      setStatement("");
      setCategory("");
      setAbout("");
    } else {
      alert("You need to choose an image and fill inputs");
    }
  };

  const handleDeleteCard = (id) => {
    const updatedCards = workCards.filter((card) => card.id !== id);
    setWorkCards(updatedCards);
  };

  const cardLi = workCards.map((item) => (
    <ul key={item.id}>
      <li>{item.name}</li>
      <span onClick={() => handleDeleteCard(item.id)} className="delete-card">
        delete item
      </span>
    </ul>
  ));

  const { changeWorksData } = useContext(MyContext);

  const worksHandler = (event) => {
    event.preventDefault();
    if(workCards){
        changeWorksData(
          workCards,
        );
        setModal("none");
    } else{
        alert("you dont have any work to post")
    }
  };

  return (
    <div className="some-works">
      <div className="some-works-title">
        <h2>EXPLORE SOME OF MY WORKS</h2>
        <Link to={"/"}>SEE MORE</Link>
      </div>
      <div className="some-works-slider">
        <AliceCarousel
          mouseTracking
          disableDotsControls
          items={items}
          responsive={responsive}
          controlsStrategy="responsive"
          infinite
          renderPrevButton={() => {
            return <button className="previous">{leftArrow}</button>;
          }}
          renderNextButton={() => {
            return <button className="next">{rightArrow}</button>;
          }}
        />
        <button onClick={() => setModal("flex")} className="edit edit-works">
          <MdEdit />
        </button>
        {/* edit works */}
        <div className="edit-modal" style={{ display: Modal }}>
          <form onSubmit={worksHandler}>
            {/* title */}
            <h4>write title of this section</h4>
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              className="content"
            />
            {/* gallery store */}
            <h4>choose images from your gallery</h4>
            {/* <span onClick={handleRefresh} className="refresh-button">
            {refreshing ? "Refreshing..." : "Refresh Gallery"}
          </span> */}
            <div className="gallery-store">{gallerySection}</div>
            {/* text editor */}
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
            <h4>about this work</h4>
            <input
              onChange={(e) => setAbout(e.target.value)}
              type="text"
              placeholder="about this work"
              className="content"
            />
            <span onClick={handleCards} className="add-card-btn">
              add work
            </span>
            {cardLi}
            <button className="save" type="submit">
              save changes
            </button>
            <span className="close-modal" onClick={() => setModal("none")}>
              <IoCloseSharp />
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
