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
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://server-hh.onrender.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="product-details-global">
      <button onClick={() => navigate('/products')} className="back-button">
        ← Back to Products
      </button>
      <div className="product-details">
        {product && (
          <>
            <img src={product.image} alt={product.title} className="product-image" />
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
