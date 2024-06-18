import React, { useEffect, useState } from "react";
import Usetask from "../Usertask/Usetask";
import AllTask from "../Alltask/AllTask";
import Navbar from "../../Components/Navbar";

function Home() {
  const [items, setItems] = useState("User-list");
  // console.log(items);
  const handleClick = (value) => {
    setItems(value);
  };

  const pages = () => {
    if (items === "User-list") {
      <Usetask />;
    } else if (items === "All-task") {
      <AllTask />;
    }
  };
  useEffect(() => {
    pages();
  }, []);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  

  return (

    <div>
    
      <Navbar/>
      <i onClick={toggleSidebar} className="fa-solid fa-bars d-md-none m-3"></i>
   
    <div className="d-flex  flex-md-row w-100">
      <div
        className={`sidebar border fs-5 shadow ${
          isSidebarVisible ? '' : 'd-none'
        } d-md-block`}
        style={{ width: "20%", height: "30em" }}
      >
        <div className="sidebar-options pt-3 ps-3 flex-column p-3">
          <p
            onClick={() => handleClick("User-list")}
            className="border p-3"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-plus me-2"></i>
            <span className="d-none d-md-inline">User List</span>
          </p>

          <p
            onClick={() => handleClick("All-task")}
            className="border p-3"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-list me-2"></i>
            <span className="d-none d-md-inline">List Items</span>
          </p>
        </div>
      </div>
      <div className="w-100">
        {items && items === "User-list" ? (
          <Usetask />
        ) : items === "All-task" ? (
          <AllTask />
        ) : (
          ""
        )}
      </div>
    </div>
  </div>
  
  );
}

export default Home;
