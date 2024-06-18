import React, { useContext, useEffect, useState } from "react";
import "./AuthPage.css";
import { Link, useNavigate } from "react-router-dom";
import logimg from "../../assets/login.png";
import regimg from "../../assets/image-removebg-preview.png";
import { loginApi, registerAPI } from "../../API/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TokenAuthContext } from "../../Context/Authcontext";

function AuthPage({ register }) {
  const {isAuthorised,setIsAuthorised} = useContext(TokenAuthContext)

  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    //console.log(userInputData);
    const { userName, email, password } = user;
    if (!userName || !email || !password) {
      alert("fill form completely..");
    } else {
      try {
        const result = await registerAPI(user);
        console.log(result);
        if (result.status == 200) {
          toast.success(`Welocome ${result.data.userName}...Please login..`);
          setUser({ userName: "", email: "", password: "" });
          //navigate

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          alert(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = async (e) => {
    const { email, password } = user;
    if (!email || !password) {
      toast("please fill the form completely..!");
    } else {
      try {
        const result = await loginApi({ email, password });
        console.log(result);
        if (result.status == 200) {
          setIsAuthorised(true)
          //store token  and usernale in session storage
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem(
            "userDetails",
            JSON.stringify(result.data.existingUser)
          );

          setTimeout(() => {
            setUser({ email: "", password: "" });

            navigate("/home");
          }, 2000);
        } else {
          toast.error(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
          <div className="featured-image mb-3">
            <img
              src={register ? regimg : logimg}
              className=" "
              style={{ width: "300px" }}
            />
          </div>

          {register ? (
            <small className=" text-wrap text-center">
              Join us and be part of something great!
            </small>
          ) : (
            <small className=" text-wrap text-center">
              What you do today can improve all your tomorrows.
            </small>
          )}
        </div>

        <div className="col-md-6 right-box p-5">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Hi there! </h2>
              <p>It's great to have you back with us</p>
            </div>
            {register && (
              <div className="input-group mb-3">
                <input
                  onChange={(e) =>
                    setUser({ ...user, userName: e.target.value })
                  }
                  value={user.userName}
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Enter Username"
                  required
                />
              </div>
            )}

            <div className="input-group mb-3">
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Email address"
                required
                value={user.email}
              />
            </div>
            <div className="input-group mb-1">
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Password"
                required
                value={user.password}
              />
            </div>
            <div className="input-group mb-5 text-center">
              <div className="forgot text-center">
                {!register && (
                  <small className="text-center">
                    <a href="#">Forgot Password?</a>
                  </small>
                )}{" "}
              </div>
            </div>
            {register ? (
              <div>
                <div className="input-group mb-3">
                  <button
                    onClick={handleRegister}
                    className="btn btn-lg btn-primary w-100 fs-6"
                  >
                    Register
                  </button>
                </div>
                <div className="row">
                  <small>
                    Already have an account? <Link to={"/login"}>Sign in</Link>
                  </small>
                </div>
              </div>
            ) : (
              <div>
                <div className="input-group mb-3">
                  <button
                    onClick={handleLogin}
                    className="btn btn-lg btn-primary w-100 fs-6"
                  >
                    Sign in
                  </button>
                </div>
                <div className="row">
                  <small>
                    Don't have account?<Link to={"/"}>Sign Up</Link>
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AuthPage;
