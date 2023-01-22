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
        // console.log(data, "data");
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
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Time Duration</th>
            <th>Description</th>
          </tr>
        </thead>

        {data.map((item, index) => {
          return (
            <>
              <tbody>
                <tr key={index}>
                  <td>{item.userName}</td>
                  <td>{item.timeDuration + " minutes"}</td>
                  <td>{item.description}</td>
                </tr>
              </tbody>
            </>
          );
        })
      }

      </table>
    </>
  );
}

export default Exercises;
