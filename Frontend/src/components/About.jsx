import React, { useContext } from 'react';
import './About.scss';
import { MdEmail } from "react-icons/md";
import { MyContext } from '../Context/Context';


export default function About() {

  const { aboutData } = useContext(MyContext);

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
    </div>
  )
}
