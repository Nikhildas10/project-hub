import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './landing.css'
import SingCard from '../components/SingCard';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getThreeProjectsApi } from '../services/allApi';
function Landing() {
  const [isLogin,setLogin]=useState(false)
  const[project,setProject]=useState([])
  const fetchProjects=async()=>{
const result=await getThreeProjectsApi()
setProject(result.data)
  }
  console.log(project);
  
  useEffect(()=>{
if(localStorage.getItem("currentId")){
  setLogin(true)
}
  },[])

  useEffect(()=>{
    fetchProjects()
  },[])
 console.log(isLogin);
  return (
    <div>
      <Header></Header>
      <Container>
        {/* hero */}
        <section>
          <Row className="hero">
            <Col sm={6}>
              <h1>Your projects Our platform.</h1>
              <h1 className="text-center">
                Quickly add and manage your projects on the go with ease.
                ensuring seamless management.
              </h1>
              {isLogin ? (
                <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
                  <button>
                    Explore
                    <div class="arrow-wrapper">
                      <div class="arrow"></div>
                    </div>
                  </button>
                </Link>
              ) : (
                <Link to={"login"} style={{ textDecoration: "none" }}>
                  <button>
                    Get started
                    <div class="arrow-wrapper">
                      <div class="arrow"></div>
                    </div>
                  </button>
                </Link>
              )}
            </Col>
            <Col sm={6}>
              <img
                className="hero-img"
                src="https://i.postimg.cc/br47VnvD/4401280.jpg"
                alt=""
              />
            </Col>
          </Row>
        </section>
        <section>
          {/* more projects section */}
          <h1
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "600",
              marginBottom: "50px",
            }}
          >
            Explore our projects
          </h1>
          <span style={{textDecorationLine:"underline", marginLeft:"16rem"}}>recent projects</span>
         <div style={{display:"flex",justifyContent:"center",gap:"20px"}}> 
         {project&&project.map(i=>
         <SingCard project={i}></SingCard>
          )}</div>
          <a className="viewMore" href="/view">
           
              <p>
                view more projects
                <ArrowForward sx={{ fontSize: "20px" }}></ArrowForward>
              </p>
           
          </a>{" "}
        </section>
      </Container>
    </div>
  );
}

export default Landing