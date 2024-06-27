import React, { useContext, useState } from "react";
import "./EditAbout.scss";
import { MdEmail } from "react-icons/md";
import { MyContext } from "../Context/Context";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";

export default function EditAbout() {
  const { aboutData } = useContext(MyContext);
  const [Modal, setModal] = useState("none");

  const [aboutText, setAboutText] = useState("");
  const [aboutEmail, setAboutEmail] = useState("");

  const aboutHandler = async (e) => {
    e.preventDefault();
    // ! ramtin added
    const title = aboutText;
    const email = aboutEmail;
    const token = localStorage.getItem("token");
    if (aboutText !== "" && aboutEmail !== "") {
      try {
        const About = {
          about: aboutData.aboutText,
        };
        const response = await fetch("https://api.aderyatik.com/api/update-about", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({title, email}),
        });

        const result = await response.json();
        console.log(result.message);
        toast.success(result.message);
        setModal("none");
        // setGalleryStore(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("you need to fill the empty inputs");
    }
  };

  return (
    <div className="about">
      <div className="about-text">
        <h2>ABOUT ME</h2>
        <p>{aboutData.aboutTitle}</p>
        <h3>CONTACT INFORMATION</h3>
        <div className="about-contact">
          <p className="about-contact-icon">
            <MdEmail />
          </p>
          <p>{aboutData.aboutEmail}</p>
        </div>
      </div>
      <button onClick={() => setModal("flex")} className="edit edit-about">
        <MdEdit />
      </button>
      <div className="edit-modal" style={{ display: Modal }}>
        <form onSubmit={aboutHandler}>
          <h4>write about yourself</h4>
          <textarea
            placeholder="about you"
            onChange={(e) => setAboutText(e.target.value)}
            className="content"
          ></textarea>
          <h4>write the email you want to show in this section</h4>
          <input
            placeholder="your email"
            onChange={(e) => setAboutEmail(e.target.value)}
            type="email"
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
