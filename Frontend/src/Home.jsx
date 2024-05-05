import React from 'react'
import Header from './components/Header'
import Poster from './components/Poster'
import About from './components/About'
import SomeWorks from './components/SomeWorks'
import LatestVideo from './components/LatestVideo'
import Contact from './components/Contact'
import CopyRight from './components/CopyRight'

export default function Home() {
  return (
    <>
      <Header/>
      <Poster/>
      <About/>
      <SomeWorks/>
      <LatestVideo/>
      <Contact/>
      <CopyRight/>
    </>
  )
}
