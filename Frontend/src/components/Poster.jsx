import React, { useContext } from 'react';
import './Poster.scss';
import { MyContext } from '../Context/Context';

export default function Poster() {

  const { posterData } = useContext(MyContext);
  return (
    <div style={{background: `url(http://localhost:5000/${posterData.headerImage})`}} className='poster'>
        <div className="poster-text">
            <h3>{posterData.jobTitle}</h3>
            <h1>{posterData.nameTitle}</h1>
            <h2>{posterData.sloganTitle}</h2>
        </div>
    </div>
  )
}
