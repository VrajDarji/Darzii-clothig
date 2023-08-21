import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Nav from "./components/Nav";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Card from "./components/Card";
function Buy() {
  const { id } = useParams({});
  const a = useRef();
  const i = parseInt(id);
  console.log(i);
  const [p, setP] = useState([]);
  const [userID, setUserID] = useState("");
  const [load, setLoad] = useState(true);
  const fetchData = async () => {
    const url = "http://localhost:5500/api/tdata";
    const response = await fetch(url);
    try {
      if (response.ok) {
        const result = await response.json();
        setP(result);
        setLoad(false);
      } else {
        throw new Error("Failed to Fetch");
      }
    } catch (err) {
      console.error("Error", err);
      setLoad(false);
    }
  };
  const updateUserID = (newUserId) => {
    setUserID(newUserId);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (load) {
    return (
      <>
        <h1>loading</h1>
      </>
    );
  }
  return (
    <>
      <Nav r={a} u={userID} updateUserID={updateUserID} />
      <div
        className="main"
        onClick={() => {
          a.current.style.display = "none";
        }}
      >
        <Card r={p[i]} v={userID} />
        <Footer />
      </div>
      <Aside />
    </>
  );
}
export default Buy;
