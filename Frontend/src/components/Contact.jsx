import React, { useContext, useState } from "react";
import "./Contact.scss";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPinterestP } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MyContext } from "../Context/Context";


export default function Contact() {

  const { contactData } = useContext(MyContext);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.SocialMediaEmail);
    alert("Email copied to clipboard!");
  };

  return (
    <div id="contact-me" className="contact">
      <div className="contact-description">
        <h2>CONTACT ME</h2>
        <div className="contacts-container">
          <div className="contact-info">
            <p className="contact-icon"><MdOutlineMailOutline /></p>
            <p onClick={handleCopyEmail} className="contact-text">{contactData.SocialMediaEmail}</p>
          </div>
          <div className="contact-info">
            <p className="contact-icon"><FaPinterestP /></p>
            <a href={contactData.SocialMediaPintrest} className="contact-text">Pinterest</a>
          </div>
          <div className="contact-info">
            <p className="contact-icon"><TiSocialLinkedin /></p>
            <a href={contactData.SocialMediaLinkdin} className="contact-text">LinkedIn</a>
          </div>
          <div className="contact-info">
            <p className="contact-icon"><FaYoutube /></p>
            <a href={contactData.SocialMediaYoutube} className="contact-text">Youtube</a>
          </div>
          <div className="contact-info">
            <p className="contact-icon"><FaInstagram /></p>
            <a href={contactData.SocialMediaInstagram} className="contact-text">Instagram</a>
          </div>
        </div>
      </div>
      <div className="contact-image">
        <img src={`https://api.aderyatik.com/${contactData.SocialMediaURL}`} alt="" />
      </div>
    </div>
  );
}
