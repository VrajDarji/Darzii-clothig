import {Instagram,Twitter,Facebook} from 'lucide-react'
import {Link} from 'react-router-dom'
function Aside() {
    const a=[
        {t:<Instagram/>,l:"https://inatagram.com"},
        {t:<Twitter/>,l:"https://twitter.com"},
        {t:<Facebook/>,l:"https://facebook.com"},
    ]
  return (
    <div className="aside">
      <div className="icons">
        {a.map((e) => {
          return <Link to={e.l}>{e.t}</Link>;
        })}
      </div>
    </div>
  );
}
export default Aside