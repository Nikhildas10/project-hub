import { Logout } from '@mui/icons-material'
import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom/dist'

function Header() {
  const navigate=useNavigate()
  const logout=()=>{
    if(localStorage.getItem("currentUser")){
      localStorage.removeItem("currentUser")
      localStorage.removeItem("currentId")
      localStorage.removeItem("token")
      navigate("/")
    }
  }
  return (
    <div
      style={{
        backgroundColor: "#202120",
        color: "white",
      }}
    >
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between" ,alignItems:"center"}}>
<Link to={"/"} style={{textDecoration:"none", color:"white"}}>
            <p  style={{margin:"0", padding:"15px", fontSize:"20px"}}>Project<span style={{fontWeight:"600"}}>HUB</span></p>
  
</Link>
          <button onClick={logout} style={{border:"0", padding:"5px", borderRadius:"4px", fontSize:"15px"}}>
            Logout
            <Logout></Logout>
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Header