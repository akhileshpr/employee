import { commonAPI } from "./commonApi"
import SERVER_URL from './serverUrl'

//register
export const registerAPI=async(user)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}
//login
export const loginApi=async(user)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

//add-task
export const addTaskApi=async(user,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-task`,user,reqHeader)
}
//get task
export const getTaskApi=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-task`,"",reqHeader)
}
//edit task
export const editTaskApi=async(id,user,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-task/${id}`,user,reqHeader)
}
//delete
export const deleteApi=async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/delete-task/${id}`,{},reqHeader)
}