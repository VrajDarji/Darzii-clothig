import { Search, ShoppingBag, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Cart from "./Cart";
import { useRef, useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
function Nav({ r, u, updateUserID, s }) {
  const c = useRef();
  const i = useRef();
  const n = useNavigate();
  const [input, setInput] = useState("");
  const [se, setSe] = useState([]);
  const [so, setSo] = useState(s);
  const Nav_b = ["shop all", "women", "men", "sale", "about", "contact"];
  const show = () => {
    // c.current.style.display = "flex";
    c.current.style.width = "22rem";
  };

  const [isName, setIsName] = useState("sign up");
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user != null) {
        setIsAuth(true);
        setIsName(user.displayName);
        updateUserID(user.uid);
        console.log(user.uid);
      } else {
        setIsName("sign up");
        setIsAuth(false);
      }
    });
  }, []);
  const signO = () => {
    signOut(auth).then((res) => {
      //   console.log(res);
      n("/");
      window.location.reload();
    });
  };
  const fetchData = async (input) => {
    const url = "http://localhost:5500/api/tdata";
    const response = await fetch(url);
    try {
      if (response.ok) {
        const result = await response.json();
        const a = result.filter((i) => {
          return i.t.toLowerCase().includes(input);
        });
        setSe(a);
        console.log(se);
        // console.log(a);
      } else {
        throw new Error("failed to fetch");
      }
    } catch (err) {
      console.error("Error", err);
    }
  };
  const sI = () => {
    const a = i.current.value;
    setInput(a);
    fetchData(input);
    if (input === "") {
      r.current.style.display = "none";
    } else {
      r.current.style.display = "flex";
    }
  };
  return (
    <>
      <div className="nav">
        <div className="start">
          <Link to={`/`}>
            <img src={logo} alt="" />
          </Link>
          <button disabled>
            <Search size={16} />
          </button>
          <input type="text" placeholder="search..." onChange={sI} ref={i} />
          <div className="sbox" ref={r}>
            {se.map((e) => {
              return (
                <>
                  <Link to={`/product/${e.id}`}>
                    <div className="se">
                      <div className="img">
                        <img src={e.img} alt="" />
                      </div>
                      <div className="tr">
                        <p>{e.t}</p>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
        <div className="end">
          {Nav_b.map((e) => (
            <Link to={`/${e}`}>
              <button>{e}</button>
            </Link>
          ))}
          <div className="login">
            <Link to={isAuth ? `#` : `/sign up`}>
              <button disabled>
                <User2 />
              </button>
              <button
                onClick={() => {
                  isAuth ? setSo(true) : setSo(false);
                  s.current.style.display = "flex";
                }}
              >
                {isName}
              </button>
            </Link>
          </div>
          <button onClick={show}>
            <ShoppingBag />
          </button>
        </div>
      </div>
      <Cart r={c} v={u} />
      {so ? (
        <div className="signout" ref={s}>
          <button onClick={signO}>Sign Out</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default Nav;
