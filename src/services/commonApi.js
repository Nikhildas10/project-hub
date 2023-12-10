import axios from "axios"

export const commonApi=async(method,url,data,header)=>{
   return await axios({
        method,
        url,
        data,
        headers:header?header:{"Content-Type":"application/json"
    }
    }).then(data=>{
    return data
}).catch(data=>{
    return data
})
}