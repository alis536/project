import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://server-hh.onrender.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleLike = async (id) => {
    try {
      const product = products.find((p) => p.id === id);
      const updatedProduct = { ...product, liked: !product.liked };

      const response = await fetch(`https://server-hh.onrender.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error('Failed to update like status');

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://server-hh.onrender.com/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isLiked = filter === 'liked' ? product.liked : true;
    return matchesSearchQuery && isLiked;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="products-page">
      <h1 className="page-title">Product List</h1>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by title"
          className="filter-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'liked' ? 'active' : ''}`}
          onClick={() => setFilter('liked')}
        >
          Liked
        </button>
      </div>

      <div className="product-list">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="card-link"
                onClick={(e) => {
                  if (e.target.closest('.like-button, .delete-button')) {
                    e.preventDefault();
                  }
                }}
              >
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-content">
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                </div>
              </Link>
              <div className="product-actions">
                <button
                  className={`like-button ${product.liked ? 'liked' : ''}`}
                  onClick={() => toggleLike(product.id)}
                >
                  <i className={`fa ${product.liked ? 'fa-heart' : 'fa-heart-o'}`}></i>
                </button>
                <button className="delete-button" onClick={() => deleteProduct(product.id)}>
                  <i className="bi bi-trash-fill"></i>
                </button>
                <Link to={`/edit-product/${product.id}`} className="edit-link">
                  <i className="bi bi-gear-wide-connected"></i>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products-message">No products to display</p>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
