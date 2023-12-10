import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button } from '@mui/material';
import { GitHub, Instagram, LinkedIn, Mail, WhatsApp } from '@mui/icons-material';

function Footer() {
  return (
    <div>
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted mt-5"
      >
        <section className="pt-1 " style={{ backgroundColor: "rgba(0, 0, 0, 0.05)",boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon  className="me-5" />
                  Project hub
                </h6>
                <p className="text-start">
                  Welcome to ProjectHub, your trusted partner in project
                  management excellence.Discover the power to efficiently manage
                  your projects with confidence at projectHub
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Home
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Login
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Regsiter
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Guides</h6>
                <p>
                  <a href="#!" className="text-reset">
                    React{" "}
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    react bootstrap{" "}
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Routing{" "}
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4 ms-2">Contact us</h6>
                <p>
                  <MDBIcon  className="me-2" />
                  <input
                    placeholder="enter email"
                    type="text"
                    style={{
                      border: "0",
                      borderBottom: "1px solid",
                      outline: "0",
                      backgroundColor: "transparent",
                    }}
                  />
<button style={{marginLeft:"10px",border:"0", backgroundColor:"blue", color:"white", borderRadius:"5px", fontSize:"15px", padding:"5px 10px"}}>submit</button>                </p>
                <p style={{display:"flex" ,gap:"10px"}}>
                  <MDBIcon  className="me-3" />
                  <GitHub ></GitHub> <Instagram></Instagram><LinkedIn></LinkedIn><Mail></Mail><WhatsApp></WhatsApp>
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.09)" }}
        >
          All rights reserved ©
          <a style={{ textDecoration: "none" }} className="text-reset fw-bold">
            Nikhil das
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

export default Footer