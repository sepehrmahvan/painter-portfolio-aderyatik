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

  return (
    <div className="contact">
      <div className="contact-description">
        <h2>CONTACT ME</h2>
        <div className="contacts-container">
          <div className="contact-info">
            <p className="contact-icon"><MdOutlineMailOutline /></p>
            <p className="contact-text">{contactData.email}</p>
          </div>
          <div className="contact-info">
            <p className="contact-icon"><FaPinterestP /></p>
            <a href={contactData.pinterest} className="contact-text">Pinterest</a>
          </div>
          <div className="contact-info">
            <p className="contact-icon"><TiSocialLinkedin /></p>
            <a href={contactData.linkedin} className="contact-text">LinkedIn</a>
          </div>
          <div className="contact-info">
            <p className="contact-icon"><FaYoutube /></p>
            <a href={contactData.youtube} className="contact-text">Youtube</a>
          </div>
          <div className="contact-info">
            <p className="contact-icon"><FaInstagram /></p>
            <a href={contactData.instagram} className="contact-text">Instagram</a>
          </div>
        </div>
      </div>
      <div className="contact-image">
        <img src={contactData.image} alt="" />
      </div>
    </div>
  );
}
