import { useState, useEffect, useRef } from "react";
import Nav from "./components/Nav";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Products from "./components/Products";
function Sale() {
  const [p, setP] = useState([]);
  const a = useRef();
  const fetchData = async () => {
    const url = "http://localhost:5500/api/tdata";
    const response = await fetch(url);
    try {
      if (response.ok) {
        const result = await response.json();
        const s = [...result, ...result, ...result];
        const a = s.filter((p) => p.sale === true);
        setP(a);
      } else {
        throw new Error("Failed to Fetch");
      }
    } catch (err) {
      console.error("Error", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Nav r={a} />
      <div
        className="main"
        onClick={() => {
          a.current.style.display = "none";
        }}
      >
        <div className="head">
          <h1>sale</h1>
          <p>Flat 20% off</p>
        </div>
        <Products p={p} />
        <Footer />
      </div>
      <Aside />
    </>
  );
}
export default Sale;
