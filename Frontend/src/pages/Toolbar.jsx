import React from 'react'
import EditLogo from '../toolbar components/EditLogo'
import EditPoster from '../toolbar components/EditPoster'
import './Toolbar.scss';
import EditAbout from '../toolbar components/EditAbout';
import EditWorks from '../toolbar components/EditWorks';
import EdittVideos from '../toolbar components/EditVideos';
import EditContacts from '../toolbar components/EditContacts';
import CopyRight from '../components/CopyRight';

export const Toolbar = () => {
  return (
    <div className='toolbar'>
      <EditLogo/>
      <EditPoster/>
      <EditAbout/>
      <EditWorks/>
      <EdittVideos/>
      <EditContacts/>
      <CopyRight/>
    </div>
  )
}
