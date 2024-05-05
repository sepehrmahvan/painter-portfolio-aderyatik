import React, { useContext, useState } from 'react';
import './EditAbout.scss';
import { MdEmail } from "react-icons/md";
import { MyContext } from '../Context/Context';
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";


export default function EditAbout() {

  const { aboutData, changeAbout } = useContext(MyContext);
  const [Modal, setModal] = useState("none");

  const [aboutText, setAboutText] = useState('');
  const [aboutEmail, setAboutEmail] = useState('');

  const aboutHandler = (e) => {
    e.preventDefault();
    changeAbout(aboutText, aboutEmail);
    setModal("none");
  }

  return (
    <div className='about'>
        <div className="about-text">
            <h2>ABOUT ME</h2>
            <p>{aboutData.aboutText}</p>
            <h3>CONTACT INFORMATION</h3>
            <div className="about-contact">
                <p className="about-contact-icon"><MdEmail /></p>
                <p>{aboutData.aboutEmail}</p>
            </div>
        </div>
        <button onClick={() => setModal("flex")} className="edit edit-about">
        <MdEdit />
      </button>
      <div className="edit-modal" style={{ display: Modal }}>
        <form onSubmit={aboutHandler}>
            <h4>write about yourself</h4>
            <textarea placeholder='about you' onChange={(e) => setAboutText(e.target.value)} className='content'></textarea>
            <h4>write the email you want to show in this section</h4>
            <input placeholder='your email' onChange={(e) => setAboutEmail(e.target.value)} type="email" className="content" />
          <button className="save" type="submit">
            save changes
          </button>
          <span className="close-modal" onClick={() => setModal("none")}>
            <IoCloseSharp />
          </span>
        </form>
      </div>
    </div>
  )
}