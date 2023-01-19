const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const ExerciseInform = require("./models/tracking.model");
const jwt = require("jsonwebtoken");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/exercise", function (err, db) {
  if (err) throw err;
  console.log("Database created seccessfully!");
});

const server = express();
server.use(express.urlencoded());
server.use(express.json());
server.use(cors({ origin: "*" }));

// data post
server.post("/posts", async (req, res) => {
  // validation apply
  //   console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .send({ status: false, message: "Please submit all required fields!" });
  }
  if (password.length < 8) {
    return res.status(400).send({
      status: false,
      message: "Password should be at least 8 characters!",
    });
  }
  if (!validateEmail(email)) {
    return res
      .status(400)
      .send({ status: false, message: "Please enter valid email" });
  }

  let user = await User.create({ firstName, lastName, email, password });

  const accessToken = jwt.sign({ id: user._id }, "fahad", {
    expiresIn: "7d",
  });
  res.send({
    status: true,
    message: "User created successfully!",
    user,
    accessToken,
  });
});

const middleware = async (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, "fahad", (err, user) => {
    if (err) {
      res.send(err.message);
    } else {
      req.user = user;
      next();
      //   res.send(verifiedJwt)
    }
  });
};

// check user created or not
server.post("/create", middleware, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !email || !password) {
    return res
      .status(400)
      .send({ status: false, message: "Please submit all required fields!" });
  }

  if (password.length < 8) {
    return res.status(400).send({
      status: false,
      message: "Password should be at least 8 characters!",
    });
  }
  if (!validateEmail(email)) {
    return res
      .status(400)
      .send({ status: false, message: "Please enter valid email" });
  }
  let user = await User.create({ firstName, lastName, email, password });
  res.send({ status: true, message: "User created successfully!", user });
});

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// login
server.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  const accessToken = jwt.sign({ id: user._id }, "fahad", {
    expiresIn: "2d",
  });

  if (!user) {
    res.send("user does not exist");
  }

  const userPassword = req.body.password;
  if (userPassword !== user.password) {
    res.send("password is not correct");
  } else {
    // console.log(user);
    res.status(200).json({ accessToken, user });
  }
});

// get data
server.get("/getdata", middleware, async (req, res) => {
  // const id = req.user.id;
  // console.log(id)
  try {
    const user = await User.findById(req.user.id);
    res.send({ user });
  } catch (error) {
    console.log(error);
  }
});

server.put("/update-profile", middleware, async (req, res) => {
  const { firstName, lastName } = req.body;
  const filter = { firstName, lastName };
  const userUpdate = await User.findByIdAndUpdate(req.user.id, filter, {
    new: true,
  }).catch((err) => {
    return res.status(500).send(err);
  });

  // if (userUpdate) {
  //   window.location.reload(true);
  // }

  return res.status(200).json({
    message: "Update User",
    data: userUpdate,
  });
});

server.listen(8081, () => {
  console.log(`server listening on port https://localhost:8081`);
});
