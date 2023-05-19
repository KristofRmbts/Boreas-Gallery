import { Link } from "react-router-dom";

function ItemCard({ title, exhibition, artist, _id, imageUrl }) {
  return (
    <div className="item-card">
      <div key={_id}>
        <Link to={`/shop/${_id}`} className="shop-item-title">
          <h3 className="shop-item-title">{title}</h3>
          <img src={imageUrl} alt="Image" width={250} />
        </Link>
        <p className="shop-item-info link-black">{exhibition} </p>
        <p className="shop-item-info text-s">{artist} </p>
      </div>
    </div>
  );
}

export default ItemCard;
