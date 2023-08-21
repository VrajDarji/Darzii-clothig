import { Link } from "react-router-dom";
function Products({p,setP}) {
    
  return (
    <div className="products">
      {p.map((e) => {
        const { img, t, p ,id} = e;
        return (
          <>
            <Link to={`/product/${id}`}>
              <div className="card">
                <div className="i">
                  <img src={img} />
                </div>
                <div className="t">
                  <p>{t}</p>
                  <p>{p}</p>
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
}
export default Products