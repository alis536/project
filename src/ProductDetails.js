import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find((product) => product.id === parseInt(id));

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError('Product not found');
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="product-details-global">
      <button onClick={() => navigate('/products')} className="back-button">
        ← Back to Products
      </button>
      <div className="product-details">
        {product && (
          <>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="info-product">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
