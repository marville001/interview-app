import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import WelcomePage from "./pages/WelcomePage";

const App = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
