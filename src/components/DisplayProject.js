import React, { useContext, useEffect, useState } from "react";
import { Delete, GitHub } from "@mui/icons-material";
import { Edit } from "react-feather";
import { deleteProjectApi, getUserProjectApi } from "../services/allApi";
import {
  addResponseContext,
  updateResponseContext,
} from "../services/ContextShare";
import EditProjects from "./EditProjects";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DisplayProject = () => {
  const { addUpdate } = useContext(addResponseContext);
  const { updateProject } = useContext(updateResponseContext);
  const [projectData, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    if (localStorage.getItem("currentId")) {
      const id = localStorage.getItem("currentId");
      const token = localStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        accesstoken: `Bearer ${token}`,
      };
      const result = await getUserProjectApi(reqHeader, id);
      setProject(result.data);
      setIsLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      accesstoken: `Bearer ${token}`,
    };
    try {
      await deleteProjectApi(reqHeader, id);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchProjects();
    }, 2000);
  }, [addUpdate, updateProject]);

  return (
    <div>
      {isLoading ? (
        <div style={{ padding: "0" }} className="skeleton">
          <Skeleton width={810} height={55} count={2} />
        </div>
      ) : projectData.length > 0 ? (
        projectData.map((i, index) => (
          <div key={i._id} className="projectSingle">
            <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
              <p>{index + 1}.</p>
              <p>{i.title}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <EditProjects project={i}></EditProjects>
              <a style={{ textDecoration: "none" }} href={i.github}>
                <GitHub />
              </a>
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDelete(e, i._id)}
              >
                <Delete />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found</p>
      )}

    
    </div>
  );
};

export default DisplayProject;
