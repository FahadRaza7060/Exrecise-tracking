import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ActivityPage() {
  const [userName, setUserName] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const createActivity = () => {
    axios
      .post("http://localhost:8081/dashboard", {
        userName,
        timeDuration,
        description,
      })
      .then(function (response) {
        console.log(response);
        const data = response.data;
        if (data) {
          toast.success("you have created exercise successfully");
          navigate("/allexercises");
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <h3 className="mt-3 text-center">Exercise Tracker App</h3>
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Username:</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">
            Time Duration (in minutes):
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="number"
            value={timeDuration}
            onChange={(e) => setTimeDuration(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label className="control-label" htmlFor="date">
            Date:
          </label>
          <input
            className="form-control"
            id="date"
            name="date"
            placeholder="MM/DD/YYY"
            type="date"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Exercise Select:</label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Running</option>
            <option>Jumping</option>
            <option>Pushups</option>
            <option>Pull-ups</option>
            <option>Swimming</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description:</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <br />
        <button
          style={{
            marginLeft: 550,
          }}
          type="button"
          className="btn btn-primary"
          onClick={createActivity}
        >
          Create Activity
        </button>
      </form>
    </>
  );
}

export default ActivityPage;
