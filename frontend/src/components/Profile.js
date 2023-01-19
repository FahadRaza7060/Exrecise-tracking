import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:8081/getdata", {
        headers: {
          token: token,
        },
      })
      //.then((res) => console.log(res.data,'wewsdex'))
      .then((res) => setUser(res.data));
  }, [token]);

  // console.log(data, "user data");
  console.log(user, "user");

  const updateData = () => {
    axios.get(
      "http://localhost:8081/updatedata",
      { fname, lname, email, password },
      {
        headers: {
          token: token,
        },
      }
    );
  };

  return (
    <>
      <h1 className="display-3 text-center mb-3 fw-bold">Profile Data</h1>
      <div className="card w-50 m-auto shadow border-0 aa">
        <div className="card-body bb">
          {/* <div className="data">
            <h2>User First Name</h2>
            <h4>{user.user?.firstName}</h4>
          </div>
          <div className="data">
            <h2>User Last Name</h2>
            <h4>{user.user?.lastName}</h4>
          </div>
          <div className="data">
            <h2>Email ID</h2>

            <h4> {user.user?.email}</h4>
          </div>
          <div className="data">
            <h2>User Password</h2>
            <h4>{user.user?.password}</h4>
          </div> */}
          <form>
            <div className="row">
              <div className="col">
                <label htmlFor="First Name" style={{ fontSize: "2vh" }}>
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={user.user?.firstName}
                  onChange={(event) => {
                    setFname(event.target.value);
                  }}
                />
              </div>
              <div className="col">
                <label htmlFor="Last Name" style={{ fontSize: "2vh" }}>
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  value={user.user?.lastName}
                  onChange={(event) => {
                    setLname(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <label htmlFor="User Email" style={{ fontSize: "2vh" }}>
                  Eamil
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={user.user?.email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="col">
                <label htmlFor="User Password" style={{ fontSize: "2vh" }}>
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  value={user.user?.password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col mt-3">
              <center>
                <button
                  className="btn btn-primary"
                  onClick={updateData}
                  type="button"
                >
                  Update profile
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
      <br />
    </>
  );
}

export default Profile;
