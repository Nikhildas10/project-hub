import React, { useEffect, useState } from "react";
import { getAllProjectsApi } from "../services/allApi";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BaseUrl } from "../services/baseUrl";
import { GitHub, InsertLink } from "@mui/icons-material";
// import { Link } from "@mui/material";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const ViewMoreProjects = () => {
  const [project, setProject] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false); // Use a separate state for the modal

  const [selectedProject, setSelectedProject] = useState(null); // Store the selected project for the modal

  const handleClose = () => setShowModal(false);
  const handleShow = (selectedProject) => {
    setSelectedProject(selectedProject);
    setShowModal(true);
  };

  const fetchProject = async () => {
    const result = await getAllProjectsApi(search);
    setProject(result.data);
    setIsLoader(false)
  };
const [isLoader,setIsLoader]=useState(true)
  useEffect(() => {
    fetchProject();
  }, [search]);
console.log(project);
  return (
    <div>
      <Header></Header>

      <h1
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "600",
          marginTop: "25px",
        }}
      >
        EXPLORE MORE PROJECTS
      </h1>
      <Container>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div class="group">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
              {/* SVG content */}
            </svg>
            <input
              onChange={(e) => setSearch(e.target.value)}
              class="input"
              type="search"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="moreProject">
          {isLoader?
           <div className="mainCard mb-5 mt-3" style={{display:"flex", justifyContent:"center", gap:"50px"}}>
             <Skeleton height={250} width={250}></Skeleton>
             <Skeleton height={250} width={250}></Skeleton>
             <Skeleton height={250} width={250}></Skeleton>
             <Skeleton height={250} width={250}></Skeleton>
            </div>:
          project.map((i) => (
            <div className="mainCard mb-5 mt-3" key={i.id}>
              <div class="card">
                <div class="card-details">
                  <img
                    src={BaseUrl ? `${BaseUrl}/uploads/${i.projectImage}` : ""}
                    alt=""
                  />
                  <p class="text-title">{i.title}</p>
                </div>

                <button class="card-button" onClick={() => handleShow(i)}>
                  More info
                </button>
              </div>
            </div>
            
           
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <button className="back">
              <svg
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 1024 1024"
              >
                <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
              </svg>
              <span>Back</span>
            </button>
          </Link>
        </div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Project Overview</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textTransform: "capitalize" }}>
            <img
              style={{ height: "260px", objectFit:"contain", width:"465px" }}
              src={
                BaseUrl
                  ? `${BaseUrl}/uploads/${selectedProject?.projectImage}`
                  : ""
              }
              alt=""
            />
            <h5
              style={{
                fontWeight: "700",
                marginTop: "20px",
                textDecorationLine: "underline",
              }}
            >
              {selectedProject?.title}
            </h5>
            <p style={{ margin: "10px" }}>{selectedProject?.overview}</p>
            <p style={{ fontSize: "12px", fontWeight: "600" }}>
              languages used-{selectedProject?.languages}
            </p>
            <a href={selectedProject?.github}>
              <GitHub style={{ marginRight: "10px" }}></GitHub>
            </a>{" "}
            <a href={selectedProject?.website}>
              {" "}
              <InsertLink></InsertLink>
            </a>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ViewMoreProjects;
