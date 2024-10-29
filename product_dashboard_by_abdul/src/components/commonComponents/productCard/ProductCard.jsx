import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
