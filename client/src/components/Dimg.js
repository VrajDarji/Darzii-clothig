import { i } from "./data/data";
function Dimg() {
  return (
    <div className="imgs">
      {i.map((e, index) => (
        <div className="ii" key={index}>
          <img src={e} />
        </div>
      ))}
    </div>
  );
}
export default Dimg;
