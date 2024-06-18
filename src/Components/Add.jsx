import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addTaskApi } from "../API/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Add() {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const handleClick = async () => {
    const { title, description } = input;
    if (!title || !description) {
      alert("please fill the form completely..");
    } else {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        try {
          const response = await addTaskApi(input, reqHeader);
          console.log(response);
          if (response.status == 200) {
            toast.success('Task added succesfully...')
            setInput({title: "",
              description: ""})
              setShow(false)
          } else {
            alert(response);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setInput({ title: "", description: "" });
  };
  const handleShow = () => setShow(true);


  return (
    <div>
      <button
        onClick={handleShow}
        className="btn btn-primary  text-center text-white"
      >
        Add
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput1"
            label="enter title"
            className="mb-3"
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          >
            <Form.Control type="text" placeholder="enter title" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="description"
            className="mb-3"
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          >
            <Form.Control as="textarea" placeholder="enter description" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleClick} variant="primary" size="sm">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </div>
  );
}

export default Add;
