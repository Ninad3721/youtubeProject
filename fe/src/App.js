import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./comp/Home.js";
import About from "./comp/About.js"; // Replace with your About component
import Contact from "./comp/Contact.js"; // Replace with your Contact component
import Login from "./comp/Login.js";
import OwnDash from "./comp/OwnDash.js";
import PastVid from "./comp/PastVid.js";
import Upload from "./comp/Upload.js";
import SignUp from "./comp/SignUp.js";
import UserSelector from "./comp/UserSelector.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/owndash" element={<OwnDash />} />
        <Route path="/past-videos" element={<PastVid />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/select" element={<UserSelector />} />
      </Routes>
    </Router>
  );
}

export default App;
