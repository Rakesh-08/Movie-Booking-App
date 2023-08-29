import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInCall,signUpCall } from "../apiCalls/authApi";

let initForm = {
    name: "",
    email: "",
    address: "",
    userType: "CUSTOMER",
    userId: "",
    password:""
}

export default function AuthComponent() {
    let [showSignup, setShowSignup] = useState(false);
  let [togglePassword, setTogglePassword] = useState("password");
  let [showSpinner, setShowSpinner] = useState(false);
    let [message, setMessage] = useState({ color: "text-success", msg: "" })
    let [authInfo, setAuthInfo] = useState(initForm)
    let NavigateTo = useNavigate();
    
    let setPasswordVisibility = (e) => {
        if (e.target.checked) {
            setTogglePassword("text")
        } else {
            setTogglePassword("password");
        }
    }

    let signupFn = (e) => {
      e.preventDefault();
      setShowSpinner(true)
      
      signUpCall(authInfo).then((response) => {
         setShowSpinner(false)
         setMessage({ ...message, msg: "Sign up successfully!" });
        setTimeout(() => {
          setMessage({ ...message, msg: "" });
        },10000)
        
        setAuthInfo(initForm)
       
      }).catch((err) => {
        console.log(err)
        localStorage.setItem("ErrMsg", err.response.data.message);
        localStorage.setItem("ErrCode",err.response.status)
        NavigateTo("/Error")
      })
        
     };
    
    let LoginFn = (e) => {
      e.preventDefault();
      setShowSpinner(true)

      let loginCredential = {
        userId: authInfo.userId,
        password:authInfo.password
      }
       
      signInCall(loginCredential)
        .then((response) => {
          localStorage.setItem("Name", response.data.name)
          localStorage.setItem("userType", response.data.userType);
          localStorage.setItem("mba_token", response.data.accessToken)
          NavigateTo("/")
        })
        .catch((err) => {
          console.log(err)
          localStorage.setItem("ErrMsg", err.response.data.message);
           localStorage.setItem("ErrCode", err.response.status);
          NavigateTo("/Error");
        });
     };

  return (
    <div className=" vh-100 bg-dark  border border-2 border-warning  ">
      <div className="text-warning  text-uppercase  display-4 mx-5 p-4  ">
        filmy duniyah
      </div>
      <div
        style={{ height: "80%" }}
        className=" d-flex    justify-content-center align-items-center  "
      >
        <div className=" authBox w-25  p-4 border border-warning ">
          <h3 className="text-center mb-3 text-light lead">
            {showSignup ? "Sign Up" : "Login"}
          </h3>
          <form onSubmit={showSignup ? signupFn : LoginFn}>
            {showSignup && (
              <>
                <div className="form-floating text-dark m-1">
                  <input
                    required
                    className="form-control authInput"
                    type="text"
                    placeholder="Name"
                    value={authInfo.name}
                    onChange={(e) =>
                      setAuthInfo({ ...authInfo, name: e.target.value })
                    }
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating text-dark m-1">
                  <input
                    required
                    className="form-control authInput"
                    type="email"
                    placeholder="Email"
                    value={authInfo.email}
                    onChange={(e) =>
                      setAuthInfo({ ...authInfo, email: e.target.value })
                    }
                  />
                  <label>Email</label>
                </div>
                <div className="form-floating text-dark m-1">
                  <input
                    required
                    className="form-control authInput"
                    placeholder="address"
                    value={authInfo.address}
                    onChange={(e) =>
                      setAuthInfo({ ...authInfo, address: e.target.value })
                    }
                  />
                  <label>Address</label>
                </div>
                <div className="form-floating text-dark m-1">
                  <select
                    value={authInfo.userType}
                    onChange={(e) =>
                      setAuthInfo({ ...authInfo, userType: e.target.value })
                    }
                    className="form-control authInput"
                  >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="CLIENT">CLIENT</option>
                  </select>
                  <label>User Type</label>
                </div>
              </>
            )}
            <div className="form-floating m-1 text-dark">
              <input
                className="form-control authInput "
                type="text"
                placeholder="userId"
                value={authInfo.userId}
                onChange={(e) =>
                  setAuthInfo({ ...authInfo, userId: e.target.value })
                }
                required
              />
              <label>UserId</label>
            </div>
            <div className="d-flex m-1">
              <div className="form-floating authInput text-dark ">
                <input
                  required
                  id="floatingPassword"
                  type={togglePassword}
                  className="form-control  "
                  placeholder="password"
                  value={authInfo.password}
                  onChange={(e) =>
                    setAuthInfo({ ...authInfo, password: e.target.value })
                  }
                />{" "}
                <label>Password</label>
              </div>
              <div>
                <input
                  onClick={setPasswordVisibility}
                  style={{ height: "2em" }}
                  className=" m-2 "
                  type="checkbox"
                />
              </div>
            </div>

            <div>
              <input
                value={showSignup ? "sign up" : "login"}
                className=" form-control  btn btn-warning m-2 "
                style={{ width: "87%" }}
                type="submit"
              />

              {showSpinner && (
                <div className="mt-2 spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </form>
          <div className="text-light my-1">
            {showSignup
              ? " Already have an account?"
              : " Don't have an account?"}
            <span
              className="authToggle"
              onClick={() => {
                setShowSignup(!showSignup);
                setAuthInfo(initForm);
                if (message.msg) {
                  setMessage({ ...message, msg: "" });
                }
              }}
            >
              {showSignup ? "login" : " signup"}
            </span>

            <div className={`${message.color} text-center`}>{message.msg}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
