import { Link } from "react-router-dom";
import testimg from "../assets/images/print1.png"
 
// We are deconstructing props object directly in the parentheses of the function
function ItemCard ( { title, exhibition, price, _id } ) {
  
  return (
    <div className="item-card">
      <div key={_id}>
            <Link to={`/shop/${_id}`} className="shop-item-title">
              <h3 className="shop-item-title">{title}</h3>
            <img src={testimg} alt="Image" width={250} />
            </Link>
            <p className="shop-item-info link-black">{exhibition} </p>
            <p className="shop-item-info">€ {price}.00 </p>
            </div>
    </div>
  );
}
 
export default ItemCard;

