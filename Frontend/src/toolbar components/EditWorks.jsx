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
import { toast } from "react-toastify";

export default function EditWorks() {
  const rightArrow = <IoIosArrowForward />;
  const leftArrow = <IoIosArrowBack />;

  const { worksData } = useContext(MyContext);

  const items = worksData.map((item) => (
    <div key={item._id} className="work-item">
      <img src={`https://api.aderyatik.com/${item.workSampleURL}`} alt="my-work" />
    </div>
  ));

  const responsive = {
    0: { items: 1 },
    469: { items: 2 },
    580: { items: 3 },
    1024: { items: 4 },
  };

  const [Modal, setModal] = useState("none");

  const [name, setName] = useState("");
  const [statement, setStatement] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  //   gallery store

  const { galleryStore, refreshGalleryStore, refreshing } = useContext(MyContext);

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

  const gallerySection = galleryStore.map((imageUrl, index) => (
    <div
      className="gallery-store-container"
      key={index}
      style={{ position: "relative", display: "inline-block" }}
    >
      <img
        onClick={() => handleImageClick(imageUrl.direction)}
        style={{
          border:
            selectedImage === imageUrl.direction ? "2px solid blue" : "none",
        }}
        src={`https://api.aderyatik.com/${imageUrl.direction}`}
        alt="image"
      />
      {selectedImage === imageUrl.direction && (
        <div className="clicked-image">
          <IoMdDoneAll />
        </div>
      )}
    </div>
  ));

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://api.aderyatik.com/api/delete-work", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({id}),
      });

      const result = await response.json();
      if(result){
        toast.success("you work has been removed succesfully");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  const cardLi = worksData.map((item) => (
    <ul key={item._id}>
      <li>{item.workSampleTitle}</li>
      <span onClick={() => handleDelete(item._id)} className="delete-card">
        delete item
      </span>
    </ul>
  ));

  const worksHandler = async (e) => {
    e.preventDefault();
    // ! ramtin added
    const workSampleURL = selectedImage;
    const workSampleTitle = name;
    const workSampleCategory = category;
    const workSampleAbout = about;
    const workSampleStatement = statement;
    const token = localStorage.getItem("token");
    if (
      selectedImage !== "" &&
      name !== "" &&
      category !== "" &&
      about !== "" &&
      statement !== ""
    ) {
      try {
        const response = await fetch("https://api.aderyatik.com/api/add-work", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            workSampleURL,
            workSampleTitle,
            workSampleCategory,
            workSampleAbout,
            workSampleStatement,
          }),
        });

        const result = await response.json();
        console.log(response);
        console.log(result.message);
        toast.success(result.message);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("you need to fill the empty inputs");
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
          <form>
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
            <span onClick={handleRefresh} className="refresh-button">
            {refreshing ? "Refreshing..." : "Refresh Gallery"}
          </span>
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
            <span onClick={worksHandler} className="add-card-btn">
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
    </div>
  );
}
