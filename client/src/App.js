import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";
import Buy from "./Buy";
import Sale from "./Sale";
import About from "./About";
import Login from "./Login";
import Signup from "./Signup";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop all" element={<Shop r={"shopall"} />} />
      <Route path="/women" element={<Shop r={"women"} />} />
      <Route path="/men" element={<Shop r={"men"} />} />
      <Route path="/product/:id" element={<Buy />} />
      <Route path="/sale" element={<Sale />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign up" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/verify"
        element={
          <>
            <h1>
              Please Verify yorself &nbsp;
              <Link to="https://mail.google.com/">Open Mail</Link>
            </h1>
          </>
        }
      />
    </Routes>
  );
}

export default App;
