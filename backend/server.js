const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const ExerciseInform = require("./models/tracking.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/exercise", function (err, db) {
  if (err) throw err;
  console.log("Database created seccessfully!");
});

const server = express();
server.use(express.urlencoded());
server.use(express.json());
server.use(cors({ origin: "*" }));

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: "3d",
  });
};

// data post/ registration
server.post("/posts", async (req, res) => {
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
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  // const accessToken = jwt.sign({ id: user._id }, "fahad", {
  //   expiresIn: "7d",
  // });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.json("Invalid Data");
  }

  //   res.send({
  //     status: true,
  //     message: "User created successfully!",
  //     user,
  //   });
});

// check user created or not
server.post("/create", async (req, res) => {
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

// login/signin
server.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            firstName: user.firstName,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    if (!user) {
        return res.status(400).json({ msg: 'Email or password incorrect' })
    } else {
        res.json("You are not verified")
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Email or password incorrect' });
    }
    next();
} catch (error) {
    console.log(error);
}
});

// get data
server.get("/getdata", async (req, res) => {
  // const id = req.user.id;
  // console.log(id)

  try {
    const token = req.query.token;
    console.log("token", token);

    if (token) {
      res.json("Valid Data");
    } else {
      res.json("Invalid Data");
    }
  } catch (error) {
    console.log(error);
  }
});

// server.put("/update-profile",  async (req, res) => {
//   const { firstName, lastName } = req.body;
//   const filter = { firstName, lastName };
//   const userUpdate = await User.findByIdAndUpdate(user._id, filter, {
//     new: true,
//   }).catch((err) => {
//     return res.status(500).send(err);
//   });
//   return res.status(200).json({
//     message: "Update User",
//     data: userUpdate,
//   });
// });

server.post("/dashboard", async (req, res) => {
  const { userName, timeDuration, description } = req.body;

  const exercise = await ExerciseInform.create({
    userName,
    timeDuration,
    description,
  });

  if (exercise) {
    res.status(201).json({
      _id: exercise.id,
      userName: exercise.userName,
      timeDuration: exercise.timeDuration,
      description: exercise.description,
    });
  } else {
    res.json("Invalid Data");
  }
});

server.listen(8081, () => {
  console.log(`server listening on port https://localhost:8081`);
});
