import { Link } from 'react-router-dom';
import {s} from './data/data'
function Up() {
  return (
    <div className="upper">
      <div className="text">
        <h3>free shipping</h3>
        <h4>on orders over $50 - use coupon code over50</h4>
      </div>
      <div className="btns">
        {s.map((e) => (
          <Link to={`/${e}`}>
            <button>shop {e}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Up;
