import { ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
function Cart({ r, v }) {
  const [p, setP] = useState([]);
  const [price, setPrice] = useState(0);
  const hide = () => {
    r.current.style.width = 0;
  };
  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "http://localhost:5500/api/cart/data";
    const response = await fetch(url, options);
    try {
      if (response.ok) {
        const result = await response.json();
        const a = await result.filter((d) => d.uid === v);
        setP(a);
      } else {
        console.error("failed to fetch");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteData = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `http://localhost:5500/api/cart/data/${id}`;
    const response = await fetch(url, options);
    try {
      if (response.ok) {
        const result = await response.json();
        console.log("deleted", result);
        fetchData();
      } else {
        console.error("failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
    var i=0;
    p.map((e) => {
      i += e.qty * e.p;
    });
    setPrice(i);
  }, [p]);

  return (
    <div className="cart" ref={r}>
      <div className="up">
        <button onClick={hide}>
          <ChevronRight />
        </button>
        <h1>Cart</h1>
      </div>
      <div className="low">
        {p.length > 0 ? (
          <>
            {p.map((e) => {
              const { img, t, p, _id, qty } = e;
              return (
                <div className="cart_flex">
                  <img src={img} alt="" />
                  <div className="text">
                    <h2>{t}</h2>
                    <p>{p}</p>
                    <p>Quantity : {qty}</p>
                  </div>
                  <button
                    onClick={() => {
                      deleteData(_id);
                    }}
                  >
                    <X size={24} />
                  </button>
                </div>
              );
            })}
            <div className="Sub_Total">
              <p>SubTotal:{price}</p>
            </div>
          </>
        ) : (
          <p>Cart is Empty</p>
        )}
      </div>
    </div>
  );
}
export default Cart;
