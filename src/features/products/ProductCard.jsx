const ProductCard = ({ title, price, thumbnail }) => {
  return (
    <div className="card">
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p>${price}</p>
    </div>
  );
};

export default ProductCard;
