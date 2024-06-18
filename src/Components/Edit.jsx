import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { editTaskApi } from "../API/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit({ task }) {
  // console.log(task);
  const [input, setInput] = useState({
    title: task?.title,
    description: task?.description,
    completed: task?.completed,
    id:task?._id
  });
  // console.log(input);
  const [show, setShow] = useState(false);

  const handleClose = () =>{
    setShow(false);
    setInput({ title: task?.title,
      description: task?.description})
  } 

const handleUpdate= async()=>{

  const{title,description,completed,id} = input
  
  if(!title || !description){
    alert('please fill the form completely..')
  }else{
    const token=sessionStorage.getItem("token");
    if(token){
    const reqHeader={
         "Content-Type":"application/json",
    "Authorization" :`Bearer ${token}`
      }
      try{
       
        const result =await editTaskApi(id,input,reqHeader)
        console.log(result);
        if(result.status === 200){
          toast.success('task updated succesfully..')
          handleClose()

        }


      }catch(err){
     console.log(err);
      }
    }
  }
}


  const handleShow = () => setShow(true);
  return (
    <div>
      <button onClick={handleShow} size="sm" className=" btn  text-center">
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput1"
            label="title"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) => setInput({ ...input, title: e.target.value })}
              type="text"
              placeholder="title"
              value={input?.title}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput2"
            label="description"
            className="mb-3"
          >
            <Form.Control
            as="textarea"
              value={input?.description}
              onChange={(e) => setInput({ ...input, description: e.target.value })}
              type="text"
              placeholder="description"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="primary" size="sm" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </div>
  );
}

export default Edit;
