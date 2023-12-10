import React, { createContext, useState } from "react";
export const addResponseContext = createContext();
export const updateResponseContext = createContext();
const ContextShare = ({ children }) => {
  const [addUpdate, setAddUpdate] = useState(false);
  const [updateProject, setUpdateProject] = useState(false);
  return (
    <>
      <addResponseContext.Provider value={{ addUpdate, setAddUpdate }}>
        <updateResponseContext.Provider
          value={{ updateProject, setUpdateProject }}
        >
          {children}
        </updateResponseContext.Provider>
      </addResponseContext.Provider>
    </>
  );
};

export default ContextShare;
