import React from "react";
import { Container, Navbar } from "react-bootstrap";

import { BsFillDiscFill } from "react-icons/bs";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <BsFillDiscFill /> XYZ Interview
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
