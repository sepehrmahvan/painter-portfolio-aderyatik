import { createContext, useState } from "react";
import logoImage from "../images/logo.png";
import posterImage from "../images/poster.webp";
import work1 from "../images/work1.webp";
import work2 from "../images/work2.webp";
import work3 from "../images/work3.webp";
import contactsImage from "../images/contacts.webp";

const MyContext = createContext(null);
const { Provider } = MyContext;

const MyProvider = ({ children }) => {
  // gallery store
  const [galleryStore, setGalleryStore] = useState([
    "https://thema-yoga.s3.amazonaws.com/src/images/logo.png",
    "https://thema-yoga.s3.amazonaws.com/src/images/poster.webp",
  ]);
  const [refreshing, setRefreshing] = useState(false);
  // logo
  const [logoData, setLogoData] = useState(logoImage);
  // poster
  const [posterData, setPosterData] = useState({
    posterImage: posterImage,
    job: "Im a painter / artist",
    name: "HI, IM ADERYATIK",
    slogan: "My name is Fatemeh Hosseini",
    cv: "#",
  });
  // about
  const [aboutData, setAboutdata] = useState({
    aboutText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    aboutEmail: "example@example.com",
  });
  // works
  const [worksData, setWorksData] = useState([
    {
      id: 1,
      image: work1,
      name: "test",
      statement: "about the art",
      category: "impressionism",
      about: "oils paint",
    },
    {
      id: 2,
      image: work2,
      name: "test",
      statement: "about the art",
      category: "impressionism",
      about: "oils paint",
    },
    {
      id: 3,
      image: work3,
      name: "test",
      statement: "about the art",
      category: "impressionism",
      about: "oils paint",
    },
  ]);
  // video arts
  const [videoArtsData, setVideoArtsData] = useState([
    {
      id: 1,
      link: "D0x2Tga9aQw?si=11nBBZ6h-MxwSKzx",
      name: "test",
      statement: "about the art",
      category: "expressionism",
    },
    {
      id: 2,
      link: "D0x2Tga9aQw?si=11nBBZ6h-MxwSKzx",
      name: "test",
      statement: "about the art",
      category: "expressionism",
    },
    {
      id: 3,
      link: "D0x2Tga9aQw?si=11nBBZ6h-MxwSKzx",
      name: "test",
      statement: "about the art",
      category: "expressionism",
    },
  ]);
  //   contact
  const [contactData, setContactData] = useState({
    image: contactsImage,
    email: 'example@example.com',
    pinterest: 'pinterest.com/aderyatic',
    linkedin: 'linkedin.com/aderyatic',
    youtube: 'youtube.com/aderyatic',
    instagram: 'instagram.com/aderyatic'
  })

  // functions -----------------------------------------------------------------------------------------

  // logo
  const changeLogo = (selectedImage) => {
    setLogoData(selectedImage);
  };

  // poster
  const changePoster = (
    job,
    name,
    slogan,
    selectedImage,
  ) => {
    setPosterData(
      {
        job: job,
        name: name,
        slogan: slogan,
        posterImage: selectedImage,
      });
  };

  // about me
  const changeAbout = (aboutText, aboutEmail) => {
    setAboutdata({
      aboutText: aboutText,
      aboutEmail: aboutEmail
    })
  }

  // works
  const changeWorksData = (
    workCards,
  ) => {
    setWorksData(workCards);
  };

  // videos
  const changeVideosData = (videoCards) => {
    setVideoArtsData(videoCards)
  }

  // contacts
  const changeContacts = (selectedImage, email, pinterest, linkedIn, youtube, instagram) => {
    setContactData({
      image: selectedImage,
      email: email,
      pinterest: pinterest,
      linkedin: linkedIn,
      youtube: youtube,
      instagram: instagram
    })
  }


  // context value --------------------------------------------------
  const contextValue = {
    // gallery
    galleryStore,
    refreshing,
    // logo
    logoData,
    changeLogo,
    setLogoData,
    // poster
    posterData,
    setPosterData,
    changePoster,
    // about
    aboutData,
    setAboutdata,
    changeAbout,
    // works
    worksData,
    changeWorksData,
    setWorksData,
    // video arts
    videoArtsData,
    changeVideosData,
    setVideoArtsData,
    // contact
    contactData,
    changeContacts,
    setContactData
  };
  return <Provider value={contextValue}>{children}</Provider>;
};

export { MyContext, MyProvider };
