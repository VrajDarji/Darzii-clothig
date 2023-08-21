import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Dimg from "./Dimg";
import Products from "./Products";
import Footer from "./Footer";
import Nav from "./Nav";
import Up from "./Up";
function Main() {
  const [userId, setUserID] = useState("");
  const [p, setP] = useState([]);
  const a = useRef();
  const b = useRef();
  const fetchData = async () => {
    const url = "http://localhost:5500/api/tdata";
    const response = await fetch(url);
    try {
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setP(result);
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (err) {
      console.error("Error", err);
    }
  };
  const updateUserID = (newUserId) => {
    setUserID(newUserId);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Nav r={a} v={userId} updateUserID={updateUserID} s={b} />
      <div
        className="main"
        onClick={() => {
          a.current.style.display = "none";
          b.current.style.display = "none";
        }}
      >
        <Up />
        <Dimg />
        <div className="head">
          <h1>new arrivals</h1>
        </div>
        <Products p={p} />
        <div className="all">
          <Link to={"/shop all"}>
            <button>Shop All</button>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Main;
