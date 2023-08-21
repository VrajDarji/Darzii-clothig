import { f, soci } from "./data/data";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <div className="links">
        {f.map((e) => {
          const { t, l } = e;
          return (
            <Link to={l}>
              <p>{t}</p>
            </Link>
          );
        })}
      </div>
      <div className="socials">
        {soci.map((e) => {
          const { t, l } = e;
          return (
            <Link to={l}>
              <p>{t}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Footer;
