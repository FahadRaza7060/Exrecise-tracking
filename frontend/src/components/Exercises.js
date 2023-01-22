import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


function Exercises() {
  
  const [data, setData] = useState([]);
  
  const getActivities = async () => {
    
    const data = await axios
      .get("http://localhost:8081/getallexercise", {})
      .then(function (response) {
        const data = response.data;
        console.log(data, "data");
        setData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(data);
  useEffect(() => {
    // Update the document title using the browser API
    getActivities();
  }, []);
  return (
    <>
      {data.map((item) => {
        return (
          <>
            <h1>{item.userName}</h1>
            <p>{item.timeDuration + "minutes"}</p>
            <p>{item.description}</p>
          </>
        );
      })}
    </>
  );
}

export default Exercises;
