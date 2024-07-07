import { createContext, useEffect, useState } from "react";
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
  // !ramtin Added
  const [galleryStore, setGalleryStore] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://api.aderyatik.com/api/get-image");
        const result = await response.json();
        setGalleryStore(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function immediately
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const refreshGalleryStore = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("https://api.aderyatik.com/api/get-image");
      const result = await response.json();
      setGalleryStore(result);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // logo
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.aderyatik.com/api/get-logo"
        );
        const result = await response.json();
        console.log(result, "get logo");
        if (result) {
          setLogoData(result.FoundLogo.logoURL);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const [logoData, setLogoData] = useState();
  
  console.log(logoData, "logo data");

  // poster
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.aderyatik.com/api/get-header"
        );
        const result = await response.json();
        console.log(result, "get poster");
        if (result) {
          setPosterData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function immediately
  }, []);
  const [posterData, setPosterData] = useState({
    headerImage: posterImage,
    jobTitle: "",
    nameTitle: "",
    sloganTitle: "",
    cv: "",
  });
  // about
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://api.aderyatik.com/api/get-about");
        const result = await response.json();
        console.log(result, "get about");
        if (result) {
          setAboutdata(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function immediately
  }, []);
  const [aboutData, setAboutdata] = useState({
    aboutText: "",
    aboutEmail: "",
  });
  // works
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://api.aderyatik.com/api/get-work");
        const result = await response.json();
        console.log(result, "get works");
        if (result) {
          setWorksData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function immediately
  }, []);

  const [worksData, setWorksData] = useState([]);
  // video arts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.aderyatik.com/api/get-youtube"
        );
        const result = await response.json();
        console.log(result, "get videos");
        if (result) {
          setVideoArtsData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function immediately
  }, []);
  const [videoArtsData, setVideoArtsData] = useState([
    {
      id: 1,
      link: "",
      name: "",
      statement: "",
      category: "",
    },
    {
      id: 2,
      link: "",
      name: "",
      statement: "",
      category: "",
    },
    {
      id: 3,
      link: "",
      name: "",
      statement: "",
      category: "",
    },
  ]);
  //   contact
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.aderyatik.com/api/get-Socialmedia"
        );
        const result = await response.json();
        console.log(result, "get contacts");
        if (result) {
          setContactData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function immediately
  }, []);
  const [contactData, setContactData] = useState({
    SocialMediaURL: contactsImage,
    SocialMediaEmail: "",
    SocialMediaPintrest: "",
    SocialMediaLinkdin: "",
    SocialMediaYoutube: "",
    SocialMediaInstagram: "",
  });

  // functions -----------------------------------------------------------------------------------------

  // logo
  const changeLogo = (selectedImage) => {
    setLogoData(selectedImage);
  };

  // poster
  const changePoster = (job, name, slogan, selectedImage) => {
    setPosterData({
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
      aboutEmail: aboutEmail,
    });
  };

  // works
  const changeWorksData = (workCards) => {
    setWorksData(workCards);
  };

  // videos
  const changeVideosData = (videoCards) => {
    setVideoArtsData(videoCards);
  };

  // contacts
  const changeContacts = (
    selectedImage,
    email,
    pinterest,
    linkedIn,
    youtube,
    instagram
  ) => {
    setContactData({
      image: selectedImage,
      email: email,
      pinterest: pinterest,
      linkedin: linkedIn,
      youtube: youtube,
      instagram: instagram,
    });
  };

  // context value --------------------------------------------------
  const contextValue = {
    // gallery
    galleryStore,
    refreshing,
    refreshGalleryStore,
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
    setContactData,
    // ramtin added
  };
  return <Provider value={contextValue}>{children}</Provider>;
};

export { MyContext, MyProvider };
