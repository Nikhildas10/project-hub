import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/allApi";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Add, AddAPhoto } from "@mui/icons-material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit } from "react-feather";
import { BaseUrl } from "../services/baseUrl";
import AddProject from "./AddProject";
import DisplayProject from "./DisplayProject";
import { Link, useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate=useNavigate()
  const [show, setShow] = useState(false);
  const[update,setUpdate]=useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [token, setToken] = useState("");
  const [uname, setUname] = useState("");
  const [existingImage,setExistingImage]=useState("")
  const [profile, setProfile] = useState({
    user: "",
    image: "",
    github: "",
    linkedin: "",
  });
  const [preview, setPreview] = useState("");

  const setData = (e) => {
    const { value, name } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  // console.log(profile);
  useEffect(() => {
    if (profile.image) {
      setPreview(URL.createObjectURL(profile.image));
    }else{
      setPreview("")
    }
  }, [profile.image]);
  // console.log(preview);
useEffect(()=>{
const userData=(JSON.parse(localStorage.getItem("currentUser")))
if(userData){
  setProfile({
    ...profile,
    user: userData.userName,
    image: "",
    github: userData.github,
    linkedin: userData.linkedin,
  });
  setExistingImage(userData.profile);

}
},[update])
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      setUname((JSON.parse(localStorage.getItem("currentUser"))).userName);
    }
    else{
navigate("/")
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { user, image, github, linkedin } = profile;
   
      if (localStorage.getItem("currentId")) {
        const id = localStorage.getItem("currentId");
        // console.log(id);
        //header
        const reqHeader = {
          "Content-Type": "mutltipart/form-data",
          accesstoken: `Bearer ${token}`,
        };
        console.log(reqHeader);

        //body
        const reqBody = new FormData();
        reqBody.append("userName", user);
        reqBody.append("profile", image?image:existingImage);
        reqBody.append("github", github);
        reqBody.append("linkedin", linkedin);

        // console.log(reqBody);
        const response = await updateProfile(reqBody, reqHeader, id);
        if (response.status == 200) {
          toast.success("profile updated successfully", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // getProfile();
          localStorage.setItem("currentUser",JSON.stringify(response.data));
          // getProfileData();
setUpdate(response.data)
          handleClose();
        } else {
          console.log("profile update failed");
        }
        handleClose();
      }
    
  };

  //get profile data
  const getProfileData = async (id) => {
    if (localStorage.getItem("currentId")) {
      let id = localStorage.getItem("currentId");
      const tokenCopy=sessionStorage.getItem("token")
      const reqHeaders = {
        "accesstoken": `Bearer ${token}`
      };
console.log(reqHeaders);
      const result = await getProfile(id,reqHeaders);
      // console.log(result);
      setProfile({
        ...profile,
        user: result?.data?.userData.userName,
        github: result?.data?.userData.github,
        linkedin: result?.data?.userData.linkedin,
        updatedImage: result?.data?.userData.profile,
      });
    }
  };

  // console.log(profile);
  useEffect(() => {
    // getProfileData();
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Container>
          <Row>
            <Col>
              <AddProject uname={uname}></AddProject>
            </Col>
            <Col>
              <div className="userSection">
                <h1>My Profile</h1>
                {existingImage != "" ? (
                  <img src={`${BaseUrl}/uploads/${existingImage}`} alt="" />
                ) : (
                  <img src="https://i.postimg.cc/hjVs7rGg/profile.png" alt="" />
                )}
                <p className="mt-3 fw-bold">Name</p>
                <hr />
                <p>{profile?.user}</p>
                <p className="mt-2 fw-bold">Github</p>
                <hr />
                <p>{profile?.github}</p>

                <p className="mt-2 fw-bold">Linkedin</p>
                <hr />
                <p>{profile?.linkedin}</p>

                <button onClick={handleShow}>Edit profile</button>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <label
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      htmlFor="img"
                    >
                      {existingImage != "" ? (
                        <img
                          className="preview"
                          src={
                            preview
                              ? preview
                              : `${BaseUrl}/uploads/${existingImage}`
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          className="preview"
                          src={
                            preview
                              ? preview
                              : "https://i.postimg.cc/hjVs7rGg/profile.png"
                          }
                          alt=""
                        />
                      )}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "18rem",
                          right: "10rem",
                          color: "#212121",
                          cursor: "pointer",
                          backgroundColor: "white",
                          padding: "5px",
                          borderRadius: "50%",
                        }}
                      >
                        <AddAPhoto></AddAPhoto>{" "}
                      </div>
                      <input
                        id="img"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            ["image"]: e.target.files[0],
                          })
                        }
                      />
                    </label>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        onChange={(e) => setData(e)}
                        name="user"
                        value={profile?.user}
                        type="email"
                        placeholder=""
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Github</Form.Label>
                      <Form.Control
                        onChange={(e) => setData(e)}
                        name="github"
                        value={profile?.github}
                        type="email"
                        placeholder=""
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Linkedin</Form.Label>
                      <Form.Control
                        onChange={(e) => setData(e)}
                        name="linkedin"
                        type="email"
                        value={profile?.linkedin}
                        placeholder=""
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={(e) => handleUpdate(e)}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop:"1rem" }}>
       <Link to={"/"} style={{textDecoration:"none"}}>
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
    </>
  );
};

export default Profile;
