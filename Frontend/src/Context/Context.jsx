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
        const response = await fetch("http://localhost:5000/api/get-image");
        const result = await response.json();
        console.log(result);
        setGalleryStore(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function immediately
  }, []);
  // !ramtin Added set logo data
  // useEffect(() => {
  //   async function update() {
  //     try {
  //       const dataToUpdate = { /* your data here */ };

  //       const response = await fetch('http://localhost:5000/api/updateuser', {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(dataToUpdate)
  //       });

  //       const result = await response.json();
  //       console.log(result);
  //       // setGalleryStore(result);
  //     } catch (error) {
  //       console.error('Error updating data:', error);
  //     }
  //   }

  //   update(); // Call the async function immediately
  // }, []);
  const [refreshing, setRefreshing] = useState(false);
  // logo
  const [logoData, setLogoData] = useState();
  console.log(logoData, "logoData");
  // !ramtin Added set logo data
  // !IMPORTANT مقدار داره به صورت ارایه میاد
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/get-data");
        const result = await response.json();
        console.log(result[0].logo, "getdata");
        setLogoData(`${result[0].logo}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function immediately
  }, []);
  // !ramtin Added set logo data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/get-header");
        const result = await response.json();
        console.log(result, "getdata");
        // setPosterData({
        //   ...posterData,
        //   posterImage: result.headerImage,

        //   job: result.jobTitle,
        //   name: result.nameTitle,
        //   slogan: result.sloganTitle,
        // });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function immediately
  }, []);
  // poster
  const [posterData, setPosterData] = useState({
    posterImage: posterImage,
    job: "",
    name: "",
    slogan: "",
    cv: "",
  });

  // about
  const [aboutData, setAboutdata] = useState({
    aboutText: "",
    aboutEmail: "",
  });
  // works
  const [worksData, setWorksData] = useState([
    {
      id: 1,
      image: work1,
      name: "",
      statement: "",
      category: "",
      about: "",
    },
    {
      id: 2,
      image: work2,
      name: "",
      statement: "",
      category: "",
      about: "",
    },
    {
      id: 3,
      image: work3,
      name: "",
      statement: "",
      category: "",
      about: "",
    },
  ]);
  // video arts
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
  const [contactData, setContactData] = useState({
    image: contactsImage,
    email: "",
    pinterest: "",
    linkedin: "",
    youtube: "",
    instagram: "",
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

  // ?RamtinAdded
  const [Image, setImage] = useState(null);
  const handleAddToGallery = async () => {
    try {
      if (!Image) {
        console.log("No image selected.");
        return;
      }

      const formData = new FormData();
      formData.append("image", Image);

      const response = await fetch("http://localhost:5000/api/upload-image", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Image uploaded successfully!");
        // Optionally, you can do something after successful upload
      } else {
        console.error("Failed to upload image.");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };
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
    setContactData,
    // ramtin added
    setImage,
    Image,
    handleAddToGallery,
  };
  return <Provider value={contextValue}>{children}</Provider>;
};

export { MyContext, MyProvider };
