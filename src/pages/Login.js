import React, { useState } from "react";
import "./login.css";
import { login, register } from "../services/allApi";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Flag } from "@mui/icons-material";

function Login() {
   const [isSignUp, setIsSignUp] = useState(true);
const navigate=useNavigate()
   const toggleForm = () => {
     setIsSignUp((prevIsSignUp) => !prevIsSignUp);
   };
const [userData,setUserdata]=useState({userName:"",email:"",password:""})
const getUserData=(e)=>{
const {name,value}=e.target
if(name=="userName"){
  if(value.match(/^[a-zA-Z ]+$/)){
    setNameValid(false)
  }
  else{
    setNameValid(true)
  }
}
// if(name=="email"){
//   if(value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
//     setEmailValid(true)
//   }
// }
setUserdata({...userData,[name]:value})
}
const handleRegister=async(e)=>{
  e.preventDefault()
const {userName,email,password}=userData
if(!userName || !email || !password){
 toast.warning("please fill all the fields", {
   position: "top-center",
   autoClose: 1200,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
 });

}
else{
 const result=await register(userData)
 if(result.status==200){
  setUserdata({userName:"",email:"",password:""})
  toast.success("user registered successfully", {
    position: "top-center",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  toggleForm()
 }else{
toast.error(result.response.data, {
  position: "top-center",
  autoClose: 1200,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});
 }
 console.log(result);
}
}

const handleLogin = async (e) => {
  e.preventDefault();
  const { email, password } = userData;
  if (!email || !password) {
    toast.warning("please fill all the fields", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    const result = await login(userData);
    if (result.status == 200) {
      localStorage.setItem("token",result.data.token)
localStorage.setItem("currentUser",JSON.stringify(result.data.user));
localStorage.setItem("currentId",result.data.user._id);
      setUserdata({ email: "", password: "" });
      toast.success(`login success`, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/")
    } else {
      toast.error(result.response.data, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log(result);
  }
};

console.log(userData);

//valid

const [nameValid,setNameValid]=useState(false)
const [emailValid,setEmailValid]=useState(false)
  return (
    <div className="login mt-5">
      <div className={`container ${isSignUp ? "active" : ""}`} id="container">
        <div className={`form-container ${isSignUp ? "sign-up" : "sign-in"}`}>
          <form>
            <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span className="email">
              {isSignUp
                ? "or use your email for registration"
                : "or use your email password"}
            </span>
            {isSignUp && (
              <>
                <input
                  name="userName"
                  type="text"
                  value={userData.userName}
                  onChange={(e) => getUserData(e)}
                  placeholder="Name"
                />
{        nameValid&&        <p style={{color:"red",textAlign:"end",margin:"0"}}>include characters only</p>
}              </>
            )}
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) => getUserData(e)}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={(e) => getUserData(e)}
              placeholder="Password"
            />
            {isSignUp && (
              <button onClick={(e) => handleRegister(e)}>Sign Up</button>
            )}
            {!isSignUp && (
              <React.Fragment>
                <a href="#">Forget Your Password?</a>
                <button onClick={(e)=>handleLogin(e)}>log In</button>
              </React.Fragment>
            )}
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div
              className={`toggle-panel ${
                isSignUp ? "toggle-left" : "toggle-right"
              }`}
            >
              <h1>{isSignUp ? "Hello user!" : "Hello User!"}</h1>
              <p>
                {isSignUp
                  ? "Already have an account?"
                  : "Dont have an account?"}
              </p>
              <button
                onClick={toggleForm}
                className="hidden"
                id={isSignUp ? "login" : "register"}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
