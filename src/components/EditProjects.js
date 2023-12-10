import { AddAPhoto } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, ToastContainer } from 'react-bootstrap';
import { Columns, Edit, GitHub } from 'react-feather'
import { BaseUrl } from '../services/baseUrl';
import { updateProjectApi } from '../services/allApi';
import { updateResponseContext } from '../services/ContextShare';
import { toast } from 'react-toastify';

const EditProjects = ({project}) => {
  // console.log(project);
  const{updateProject,setUpdateProject}=useContext(updateResponseContext)
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 const[preview,setPreview]=useState("")
  const [projectData, setProject] = useState({
    title:project.title,
    languages: project.languages,
    overview: project.overview,
    website: project.website,
    github: project.github,
    projectImage: ""
  });
const[input,setInput]=useState("")
     console.log(projectData);


    
    const handleUpdate=async()=>{
      // e.preventDefault()
      const{title,languages,github,website,overview,projectImage}=projectData
      if(!title||!languages||!github||!website||!overview){
        alert("fill all fields")
      }
      else{
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      preview
      ? reqBody.append("projectImage", projectImage)
      : reqBody.append("projectImage",projectData.projectImage);
      // console.log(reqBody);
      const token=localStorage.getItem("token")
      var reqHeader={}
      if(preview){
        var reqHeader={
                "Content-Type":"multipart/form-data",
                "accesstoken":`Bearer ${token}`
              }
            }
            else{
              var reqHeader={
                "Content-Type":"application/json",
                "accesstoken":`Bearer ${token}`
              }
            }
            const projectId=project._id
            const result=await updateProjectApi(reqBody,reqHeader,projectId)
            console.log(result);
             if (result.status == 200) {
         toast.success("Project updated successfully", {
           position: "top-center",
           autoClose: 1000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
             }
             
            handleClose()
            setUpdateProject(!updateProject)
          }
        }
       useEffect(() => {
         if (projectData.projectImage) {
           setPreview(URL.createObjectURL(projectData.projectImage));
         } else if (project.projectImage) {
           setPreview(`${BaseUrl}/uploads/${project.projectImage}`);
         } else {
           setPreview("");
         }
       }, [projectData.projectImage, project.projectImage]);

          // console.log(input);
          return (
    <>
    <ToastContainer></ToastContainer>
      <Edit style={{ cursor: "pointer" }} onClick={handleShow}></Edit>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label htmlFor="img2">
                <input
                  id="img2"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProject({ ...projectData, ["projectImage"]: e.target.files[0] })
                  }
                  type="file"
                />
                <img
                  style={{
                    position: "relative",
                    width: "220px",
                    height: "220px",
                    objectFit: "contain",
                  }}
                  src={
                    preview
                      ? preview
                      : `${BaseUrl}/uploads/${projectData.projectImage}`
                  }
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
                    padding: "8px",
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
                  value={projectData.title}
                  onChange={(e) =>
                    setProject({ ...projectData, ["title"]: e.target.value })
                  }
                  className="mb-2"
                  id="title"
                  type="email"
                  name="title"
                />

                <label className="mb-1" htmlFor="title">
                  Github Link
                </label>

                <Form.Control
                  value={projectData.github}
                  onChange={(e) =>
                    setProject({ ...projectData, ["github"]: e.target.value })
                  }
                  id='github'
                  className="mb-2"
                  name="github"
                  type="email"
                />
                <label className="mb-1" htmlFor="title">
                  Website Link
                </label>

                <Form.Control
                  value={projectData.website}
                  onChange={(e) =>
                    setProject({ ...projectData, ["website"]: e.target.value })
                  }
                  className="mb-2"
                  name="website"
                  type="email"
                />
              </Form>
            </Col>

            {/* <label className="mb-1 mt-1" htmlFor="title">
              Language Used
            </label> */}

            <Form.Control
              value={projectData.languages}
              onChange={(e) =>
                setProject({ ...projectData, ["languages"]: e.target.value })
              }
              className="mb-2 mt-3 text-start"
              name="languages"
              type="email"
              placeholder="Language Used
"
            />
            {/* <label htmlFor="title">Project Overview</label> */}

            <Form.Control
              className="mt-1"
              as="textarea"
              onChange={(e) =>
                setProject({ ...projectData, ["overview"]: e.target.value })
              }
              value={projectData.overview}
              rows={4}
              type="text"
              name="overview"
              placeholder="Project Overview"
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdate} variant="primary">
            update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProjects