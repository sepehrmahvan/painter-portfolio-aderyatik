import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [Data, setData] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/get-data");
      setData(data)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []);
  return <div>{console.log(Data)}</div>;
};

export default App;
