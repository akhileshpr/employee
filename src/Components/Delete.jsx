import React from "react";
import { deleteApi } from "../API/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Delete({ task }) {
  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await deleteApi(task,reqHeader);
        console.log(result);
        if (result.status === 200) {
          toast.warning('task deleted succesfully..')
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <button onClick={handleDelete} className="btn text-white">
        <i className="fa-solid fa-trash text-danger"></i>
      </button>
      <ToastContainer/>
    </div>
  );
}

export default Delete;
