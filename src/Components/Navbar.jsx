import React from 'react'

function Navbar() {
  return (
    <div style={{ height: "4rem" }} className="w-100 shadow-sm">
    <div className="d-flex justify-content-between container h-100">
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="https://i.postimg.cc/q7LYmJxn/image.png"
          style={{ height: "4rem", width: "4rem" }}
          alt=""
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="https://i.postimg.cc/HxM6qTQB/image.png"
          style={{ height: "4rem", width: "4rem" }}
          alt=""
        />
      </div>
    </div>
  </div>  )
}

export default Navbar