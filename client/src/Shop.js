import { useEffect, useRef, useState } from "react";
import Products from "./components/Products";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Aside from "./components/Aside";

function Shop({ r }) {
  const pathm = window.location.pathname.replace("/", "");
  const pm = pathm.replace("%20", " ");
  const a = useRef();
  console.log(pathm);
  const [p, setP] = useState([]);
  const fetchData = async () => {
    const url = "http://localhost:5500/api/tdata";
    const response = await fetch(url);
    try {
      if (response.ok) {
        const result = await response.json();
        const s = [...result, ...result, ...result];
        if (pathm === "shop%20all") {
          setP(s);
        } else {
          const a = s.filter((t) => t.tag === r);
          setP(a);
        }
        console.log(p);
      } else {
        throw new Error("Failed to Fetch");
      }
    } catch (err) {
      console.error("Error", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [r]);
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
          <h1>{pm}</h1>
        </div>
        <Products p={p} />
        <Footer />
      </div>
      <Aside />
    </>
  );
}
export default Shop;
