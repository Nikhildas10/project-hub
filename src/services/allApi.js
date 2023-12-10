import { BaseUrl } from "./baseUrl"
import { commonApi } from "./commonApi"

//register
export const register=async(body)=>{
    return await commonApi("POST",`${BaseUrl}/user/register`,body,"")
}

//login
export const login=async(body)=>{
    return await commonApi("POST",`${BaseUrl}/user/login`,body,"")
}

//update profile
export const updateProfile=async(body,headers,id)=>{
    return await commonApi("PUT",`${BaseUrl}/user/update-profile/${id}`,body,headers)
}

//get profile
export const getProfile=async(id,headers)=>{
    return await commonApi("GET",`${BaseUrl}/user/getProfile/${id}`,{},headers)
}

//add new project
export const addProject=async(body,headers)=>{
    return await commonApi("POST",`${BaseUrl}/user/add-project`,body,headers)
}

//get user projects
export const getUserProjectApi=async(headers,id)=>{
    return await commonApi("GET",`${BaseUrl}/user/get-user-projects/${id}`,"",headers)
}
export const getAllProjectsApi=async(searchData)=>{
    return await commonApi("GET",`${BaseUrl}/user/get-all-projects?search=${searchData}`,"","")
}
export const getThreeProjectsApi=async()=>{
    return await commonApi("GET",`${BaseUrl}/user/get-three-projects`,"","")
}

//update projects
export const updateProjectApi = async (body,header,id) => {
  return await commonApi("PUT", `${BaseUrl}/user/edit-project/${id}`, body, header);
};

//delete project
export const deleteProjectApi=async(header,id)=>{
    return await commonApi("DELETE",`${BaseUrl}/user/delete-project/${id}`,{},header)
}