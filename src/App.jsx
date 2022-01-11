import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import InvitationInterview from "./pages/InvitationInterview";
import LinkInterview from "./pages/LinkInterview";

const App = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/candidate/invite/:token" element={<InvitationInterview />} />
          <Route exact path="/interview/invite/:token" element={<LinkInterview />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
