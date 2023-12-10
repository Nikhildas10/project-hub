import React, { useContext, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Add, AddAPhoto, Delete, EditNote, GitHub } from "@mui/icons-material";
import { addProject } from "../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import { Edit, Edit2, Edit3 } from "react-feather";
import DisplayProject from "./DisplayProject";
import { addResponseContext } from "../services/ContextShare";
function AddProject({ uname }) {
  const{addUpdate,setAddUpdate}=useContext(addResponseContext)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [token, setToken] = useState("");
  const handleShow = () => setShow(true);
  const [preview, setPreview] = useState("");
  const [projectData, setProject] = useState({
    title: "",
    languages: "",
    overview: "",
    website: "",
    github: "",
    projectImage: "",
  });

  const getInput = (e) => {
    const { value, name } = e.target;
    setProject({ ...projectData, [name]: value });
  };
  console.log(projectData);
  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage));
    } else {
      setPreview("");
    }
  }, [projectData.projectImage]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);
  const handleClick = async (e) => {
    e.preventDefault();
    const { title, languages, overview, github, website, projectImage } =
      projectData;
      
    if (
      !title ||
      !languages ||
      !overview ||
      !github ||
      !website ||
      !projectImage
    ) {
      alert("please fill all datas");
    } else {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        accesstoken: `Bearer ${token}`,
      };

      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("projectImage", projectImage);

      const result = await addProject(reqBody, reqHeader);
      if (result.status == 200) {
         toast.success("Project added successfully", {
           position: "top-center",
           autoClose: 1000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
         setAddUpdate(!addUpdate);
        setShow(false);
        
      } else {
        console.log("project failed to add");
      }
      console.log(result);
    }
    setProject({
      title: "",
      languages: "",
      overview: "",
      website: "",
      github: "",
      projectImage: "",
    });
    
  };
  return (
    <div>
      {" "}
      <div className="projectSection">
        <h1>welcome {uname} !</h1>
        <hr />
        <div className="addProject" style={{ display: "flex" }}>
          <p>My Projects</p>
          <button onClick={handleShow}>
            Add project <Add></Add>
          </button>
        </div>

        <div className="addedProjects">
         <DisplayProject></DisplayProject>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label htmlFor="img2">
                <input
                  onChange={(e) =>
                    setProject({
                      ...projectData,
                      ["projectImage"]: e.target.files[0],
                    })
                  }
                  id="img2"
                  style={{ display: "none" }}
                  type="file"
                />
                <img
                  style={{
                    position: "relative",
                    width: "220px",
                    height: "220px",
                    objectFit: "contain",
                  }}
                  src={preview ? preview : "https://placehold.co/200x150"}
                  alt=""
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "12rem",
                    right: "17rem",
                    color: "white",
                    cursor: "pointer",
                    backgroundColor: "#212121",
                    padding: "6px",
                    borderRadius: "50%",
                  }}
                >
                  <AddAPhoto></AddAPhoto>{" "}
                </div>
              </label>
            </Col>
            <Col>
              <Form>
                <label className="mb-1" htmlFor="title">
                  Project Name
                </label>
                <Form.Control
                  className="mb-2"
                  id="title"
                  type="email"
                  name="title"
                  onChange={(e) => getInput(e)}
                />

                <label className="mb-1" htmlFor="title">
                  Github Link
                </label>

                <Form.Control
                  className="mb-2"
                  name="github"
                  type="email"
                  onChange={(e) => getInput(e)}
                />
                <label className="mb-1" htmlFor="title">
                  Website Link
                </label>

                <Form.Control
                  className="mb-2"
                  name="website"
                  type="email"
                  onChange={(e) => getInput(e)}
                />
              </Form>
            </Col>

            {/* <label className="mb-1 mt-1" htmlFor="title">
              Language Used
            </label> */}

            <Form.Control
              className="mb-2 mt-3 text-start"
              name="languages"
              type="email"
              onChange={(e) => getInput(e)}
              placeholder="Language Used
"
            />
            {/* <label htmlFor="title">Project Overview</label> */}

            <Form.Control
              className="mt-1"
              as="textarea"
              rows={4}
              type="text"
              name="overview"
              onChange={(e) => getInput(e)}
              placeholder="Project Overview"
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleClick(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default AddProject;
