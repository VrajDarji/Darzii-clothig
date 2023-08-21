import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { useRef, useState } from "react";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.png";

function Signup() {
  const [err, setError] = useState("");
  const p = useRef();
  const nav = useNavigate();
  const provider = new GoogleAuthProvider();
  const [value, setValues] = useState({ n: "", e: "", p: "" });
  const sub = () => {
    console.log(value);
    createUserWithEmailAndPassword(auth, value.e, value.p)
      .then(async (res) => {
        console.log(res);
        const user = res.user;
        // setUserId(user);
        await updateProfile(user, {
          displayName: value.n,
        });
        sendData(res);
        await emailV(user);
        setError("");
        nav("/verify");
      })
      .catch((err) => {
        console.log(err.message);
        const a = err.message.replace("Firebase:", "");
        setError(a);
      });
    console.log(err);
  };
  const goo = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        const user = res.user;
        console.log(res);
        sendData(res);
        await emailV(user);
        console.log(user);
        nav("/verify");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionCodeSettings = {
    url: "http://localhost:3000/",
    handleCodeInApp: true,
  };
  const emailV = async (user) => {
    // const idToken = await user.getIdToken();
    const email = user?.email;
    console.log(email);
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        console.log("maile send to", email);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sendData = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const url = "http://localhost:5500/api/user/data";
    const resposne = await fetch(url, options);
    try {
      if (resposne.ok) {
        const result = await resposne.json();
        console.log("data sended", result);
      } else {
        console.error("failed to send");
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(value.e);
  return (
    <div className="main">
      <div className="head">
        <img src={logo} alt="" />
      </div>
      <div className="signup">
        <div className="child">
          <div className="ttt">
            <h2>Sign up</h2>
            <input
              type="text"
              placeholder="name"
              onChange={(ev) =>
                setValues((prev) => ({ ...prev, n: ev.target.value }))
              }
            />
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
            <button onClick={sub}>sign up</button>
            <button onClick={goo}>continue with google</button>
            <p>
              Already have account , <Link to={"/login"}> Login</Link>
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
export default Signup;
