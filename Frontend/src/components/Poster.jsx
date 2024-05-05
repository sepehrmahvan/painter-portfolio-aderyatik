import React, { useContext } from 'react';
import './Poster.scss';
import { MyContext } from '../Context/Context';

export default function Poster() {

  const { posterData } = useContext(MyContext);
  return (
    <div style={{background: `url(${posterData.posterImage})`}} className='poster'>
        <div className="poster-text">
            <h3>{posterData.job}</h3>
            <h1>{posterData.name}</h1>
            <h2>{posterData.slogan}</h2>
            <a href={posterData.cv}>DOWNLOAD CV</a>
        </div>
    </div>
  )
}
