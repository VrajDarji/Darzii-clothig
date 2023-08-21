import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Plus, Minus } from "lucide-react";
function Card({ r, v }) {
  const { img, t, p, id, tag, sale } = r;
  const cc = useRef(null);
  const [select, setSelect] = useState("Select");
  const [qt, setQty] = useState(1);
  const [dataS, setDataS] = useState({
    img: img,
    t: t,
    p: p,
    id: id,
    tag: tag,
    sale: sale,
    uid: v,
    size: select,
    qty: qt,
  });
  const [cartU, setCartU] = useState(" ");

  const [showOptions, setShowOptions] = useState(false);
  const sendData = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataS),
    };
    console.log(options.body);
    const url = "http://localhost:5500/api/cart/data";
    const response = await fetch(url, options);
    try {
      if (response.ok) {
        const responseData = await response.json();
        setCartU("Added to Cart");
        cc.current.style.display = "flex";
        console.log(responseData);
      }
    } catch (error) {
      console.error("Error sending data:", error);
      setCartU("failed to add");
      cc.current.style.display = "flex";
    }
  };
  const e = async () => {
    try {
      await sendData();
      console.log(dataS);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setDataS((prev) => ({ ...prev, qty: qt }));
    setDataS((prev) => ({ ...prev, uid: v }));
    setDataS((prev) => ({ ...prev, size: select }));
  }, [dataS]);
  const size = ["small", "medium", "large"];
  return (
    <div className="cardd">
      <div className="navv">
        <div className="start">
          <p>
            Home/Shopa All/ <span>Product</span>
          </p>
        </div>
        <div className="end">
          <button>Prev</button>
          <button>Next</button>
        </div>
      </div>
      <div className="con">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div className="text">
          <h2>{t}</h2>
          <p>{p}</p>
          {/* have to add some dropdown for size*/}
          <p>Size</p>
          <div
            className="dd"
            onClick={() => {
              setShowOptions(true);
            }}
          >
            <input type="text" name="" id="" value={select} readOnly />
            <button>
              <ChevronDown />
            </button>
          </div>
          {showOptions ? (
            <div className="option_box">
              {size.map((e) => {
                return (
                  <input
                    type="text"
                    value={e}
                    readOnly
                    onClick={(e) => {
                      setSelect(e.target.value);
                      setShowOptions(false);
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <></>
          )}
          <p>Quantity</p>
          <div className="qty">
            <button
              onClick={() => {
                setQty(qt - 1 > 1 ? qt - 1 : 1);
              }}
            >
              <Minus />
            </button>
            <input type="text" value={qt} />
            <button
              onClick={() => {
                setQty(qt + 1);
              }}
            >
              <Plus />
            </button>
          </div>
          <div className="bbtn">
            <button onClick={e}>Add to cart</button>
            <button onClick={e}>Buy</button>
          </div>
          <div className="cartPop" ref={cc}>
            <p>{cartU}</p>
            <button
              onClick={() => {
                setCartU("");
                cc.current.style.display = "none";
              }}
            >
              <X />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
