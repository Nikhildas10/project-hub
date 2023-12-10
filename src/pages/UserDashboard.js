import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import AddProject from '../components/AddProject';
import Header from "../components/Header";
import { Edit } from "react-feather";
import Profile from "../components/Profile";
import "./dash.css";
import DisplayProject from "../components/DisplayProject";
const UserDashboard = () => {
  return (
    <div>
      <Header></Header>
      
      <Profile></Profile>
    </div>
  );
};

export default UserDashboard;
