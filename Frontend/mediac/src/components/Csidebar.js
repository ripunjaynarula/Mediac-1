import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList } from "react-icons/fa";
import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiArrowRight,
  FiArrowLeft,
  FiAlignJustify,
} from "react-icons/fi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";

const Csidebar = () => {
  const arr = [
    { link: "/login", text: "Login" },
    { link: "/Signup", text: "Signup" },
  ];
  // const menuIconClick = () => {
  //   //condition checking to change state from true to false and vice versa
  //   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  // };
  const [flag, setFlag] = useState(false);
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const [name, setName] = useState("");

  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      setFlag(false);

      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      setFlag(true);
      return;
    }
    setFlag(false);
  }, [currentUser, setFlag]);

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(true);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div>
        <div id="header">
          <ProSidebar collapsed={menuCollapse}>
            {/* <div className="closemenu" id="pcarrow" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div> */}
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem icon={<FaList />}>Category</MenuItem>
                <MenuItem icon={<FaList />}>Category</MenuItem>
                <MenuItem icon={<FaList />}>Category</MenuItem>
                <MenuItem icon={<FaList />}>Category</MenuItem>
                <MenuItem icon={<FaList />}>Category</MenuItem>
              </Menu>
            </SidebarContent>
          </ProSidebar>
          {/* <div className="closemenu" id="phonearrow" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div> */}
        </div>
      </div>
      <div
        className="Navbar"
        style={{ position: "fixed", zIndex: "2", width: "100%" }}
      >
        <ReactBootStrap.Navbar collapseOnSelect expand="xl" className="bc">
          <div className="closemenu" onClick={menuIconClick}>
            {/* changing menu collapse icon on click */}
            {menuCollapse ? (
              <FiAlignJustify id="arrow" />
            ) : (
              <FiAlignJustify id="arrow" />
            )}
          </div>
          <ReactBootStrap.Navbar.Brand
            style={{ color: "black" }}
            id="brand"
            href="/"
          >
            LOGO
          </ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootStrap.Nav className="mr-auto">
              <ReactBootStrap.Nav.Link className="navlink" href="/about">
                About
              </ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink" href="/add-blog">
                Blog
              </ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink" href="/conditions">
                Conditions
              </ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink" href="/treatments">
                Treatments
              </ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link className="navlink" href="/videos">
                Tube
              </ReactBootStrap.Nav.Link>
              {/* <ReactBootStrap.NavDropdown className="navlink" title="Dropdown" id="basic-nav-dropdown"   show={show}
   onMouseEnter={showDropdown}  
   onMouseLeave={hideDropdown}  >
                    <ReactBootStrap.NavDropdown.Item href="#action/3.1">Action</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item href="#action/3.2">Another action</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Item href="#action/3.3">Something</ReactBootStrap.NavDropdown.Item>
                    <ReactBootStrap.NavDropdown.Divider />
                    <ReactBootStrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBootStrap.NavDropdown.Item>
                </ReactBootStrap.NavDropdown> */}

              <ReactBootStrap.Nav.Link className="navlink" href="/contact">
                Contact
              </ReactBootStrap.Nav.Link>
              {!flag ? (
                <ReactBootStrap.Nav.Link
                  className="navlink"
                  href="/DoctorLogin"
                >
                  Doctor Login
                </ReactBootStrap.Nav.Link>
              ) : (
                <div></div>
              )}
            </ReactBootStrap.Nav>

            <ReactBootStrap.Nav className="form-inline">
              {flag ? (
                <div>
                  <ReactBootStrap.Dropdown>
                    <ReactBootStrap.Dropdown.Toggle
                      variant="primary"
                      style={{
                        backgroundColor: "white",
                        color: "#737373",
                        border: "none",
                        borderInlineColor: "white",
                      }}
                    >
                      {currentUser == null
                        ? ""
                        : currentUser.displayName == null
                        ? ""
                        : currentUser.displayName}
                    </ReactBootStrap.Dropdown.Toggle>

                    <ReactBootStrap.Dropdown.Menu
                      style={{
                        border: "none",
                        boxShadow: "0px 0px 13px 1px #e2d9d9",
                      }}
                    >
                      <ReactBootStrap.Dropdown.Item
                        href="/update-profile"
                        style={{ fontFamily: "work sans" }}
                      >
                        Edit Profile
                      </ReactBootStrap.Dropdown.Item>

                      <ReactBootStrap.Dropdown.Item
                        href="#/action-2"
                        style={{ fontFamily: "work sans" }}
                      >
                        My Consultations
                      </ReactBootStrap.Dropdown.Item>
                      <ReactBootStrap.Dropdown.Item
                        href="#/action-2"
                        style={{ fontFamily: "work sans" }}
                      >
                        My Medical Records
                      </ReactBootStrap.Dropdown.Item>
                      <ReactBootStrap.Dropdown.Item
                        href="#/action-2"
                        style={{ fontFamily: "work sans" }}
                      >
                        Need Help
                      </ReactBootStrap.Dropdown.Item>

                      <ReactBootStrap.Dropdown.Item
                        href="/change-password"
                        style={{ fontFamily: "work sans" }}
                      >
                        Change Password
                      </ReactBootStrap.Dropdown.Item>

                      <ReactBootStrap.Dropdown.Divider />

                      <ReactBootStrap.Dropdown.Item
                        variant="link"
                        style={{ fontFamily: "work sans" }}
                        onClick={handleLogout}
                      >
                        Log Out
                      </ReactBootStrap.Dropdown.Item>
                    </ReactBootStrap.Dropdown.Menu>
                  </ReactBootStrap.Dropdown>
                </div>
              ) : (
                arr.map((elem) => (
                  <ReactBootStrap.Nav.Link
                    className="navlink"
                    href={elem.link}
                    style={{ fontFamily: "work sans" }}
                    key={elem["link"]}
                  >
                    {elem["text"]}
                  </ReactBootStrap.Nav.Link>
                ))
              )}
            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
      </div>
    </>
  );
};

export default Csidebar;
