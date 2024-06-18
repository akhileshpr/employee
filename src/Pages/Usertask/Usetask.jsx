import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Edit from "../../Components/Edit";
import Add from "../../Components/Add";
import Delete from "../../Components/Delete";
import { getTaskApi } from "../../API/allApi";

function Usetask() {
  const [tasks, setTasks] = useState([]);
  // console.log(tasks);
  const getTasks = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await getTaskApi(reqHeader);
        // console.log(result);
        if (result.status === 200) {
          setTasks(result.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
 
  const formatDateTime = (timestamp) => {
    // console.log("Received timestamp:", timestamp);
    try {
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      // console.log("Formatted date and time:", formattedDate, formattedTime);
      return `${formattedDate} ${formattedTime}`;
    } catch (error) {
      console.error("Error formatting date:", error);
    
    }
  };
  


  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <div className="text-end mt-3">
        <Add />
      </div>

      <div className="table-responsive">
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created</th>
              <th>Updated</th>

              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>

                  <td>{formatDateTime(task.createdAt)}</td>
                  <td>{formatDateTime(task.updatedAt)}</td>
                  <td>
                    <Edit task={task} />
                  </td>
                  <td>
                    <Delete task={task?._id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No tasks available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Usetask;
