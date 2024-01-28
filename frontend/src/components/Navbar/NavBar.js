import { React } from "react";
import { useContext } from "react";
import { userContext } from "../../App";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./app.css"
import { Link } from "react-router-dom";

function NavBar() {
  const { isLoggedIn, setIsLoggedIn, setToken, role, setShow ,setRole,setUserId} =
    useContext(userContext);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to="/dashboard" className="logo" >Easy Knowledge</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn && role === "instructor" ? (
                <>
                  <Nav.Link href="/MyCourses">My Courses</Nav.Link>
                  <Nav.Link href="/MyLectures">MyLectures</Nav.Link>
                  <Nav.Link
                    href="/"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setShow(false)
                      setToken(null);
                      setUserId(null)
                      setRole(null)
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/Enrolled">My Courses</Nav.Link>

                  <Nav.Link
                    href="/"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setShow(false)
                      setToken(null);
                      setUserId(null)
                      setRole(null)
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavBar;
