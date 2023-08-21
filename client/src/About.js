import Nav from "./components/Nav";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import { useRef } from "react";
function About() {
  const a = useRef();
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
          <h1>our story</h1>
          <div className="abox">
            <div className="tt">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
                recusandae unde iusto obcaecati sequi animi? Atque facilis vel
                pariatur eum at officiis harum amet velit aut expedita! Velit
                rem aspernatur voluptates impedit earum maiores aliquid, itaque
                rerum quisquam, voluptate delectus?
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
                recusandae unde iusto obcaecati sequi animi? Atque facilis vel
                pariatur eum at officiis harum amet velit aut expedita! Velit
                rem aspernatur voluptates impedit earum maiores aliquid, itaque
                rerum quisquam, voluptate delectus?
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
                recusandae unde iusto obcaecati sequi animi? Atque facilis vel
                pariatur eum at officiis harum amet velit aut expedita! Velit
                rem aspernatur voluptates impedit earum maiores aliquid, itaque
                rerum quisquam, voluptate delectus?
              </p>
            </div>
            <div className="img">
              <img
                src="https://static.wixstatic.com/media/ea71bb_56ae485732e642a892265765e678a8fa~mv2_d_3103_2695_s_4_2.jpg/v1/fill/w_840,h_925,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ea71bb_56ae485732e642a892265765e678a8fa~mv2_d_3103_2695_s_4_2.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Aside />
    </>
  );
}
export default About;
