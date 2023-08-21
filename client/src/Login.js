import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.png";

function Login() {
  const nav = useNavigate();
  const [value, setValues] = useState({ e: "", p: "" });
  const [err, setError] = useState("");
  const sub = () => {
    console.log(value);
    signInWithEmailAndPassword(auth, value.e, value.p)
      .then(async (res) => {
        console.log(res);
        setError("");
        nav("/");
      })
      .catch((err) => {
        console.log(err);
        const a = err.message.replace("Firebase:", "");
        setError(a);
      });
  };
  return (
    <div className="main">
      <div className="head">
        <img src={logo} alt="" />
      </div>
      <div className="signup">
        <div className="child">
          <div className="ttt">
            <h2>Log In</h2>
            <input
              type="email"
              name=""
              id=""
              placeholder="email"
              onChange={(ev) =>
                setValues((prev) => ({ ...prev, e: ev.target.value }))
              }
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="password"
              onChange={(ev) =>
                setValues((prev) => ({ ...prev, p: ev.target.value }))
              }
            />
            <p style={{ color: "red", fontWeight: "900" }}>{err}</p>
            <button onClick={sub}>log in</button>
            <p>
              Don't have acoount , <Link to={"/sign up"}> Register</Link>
            </p>
          </div>

          <div className="image">
            <img
              src="https://images.unsplash.com/photo-1625698311031-f0dd15be5144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
