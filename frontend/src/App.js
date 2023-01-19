import { Toaster } from "react-hot-toast";
import Register from "./components/Register";
import "./App.css";
import SignIn from "./components/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Profile from "./components/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import ActivityPage from "./components/ActivityPage";
import Exercises from "./components/Exercises";

function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/exercise" element={<ActivityPage />}></Route>
          <Route path="/allexercises" element={<Exercises />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Register /> */}
    </div>
  );
}

export default App;
