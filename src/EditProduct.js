import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find((product) => product.id === parseInt(id));

    if (foundProduct) {
      setTitle(foundProduct.title);
      setDescription(foundProduct.description);
      setImage(foundProduct.image);
    } else {
      setError('Product not found');
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: parseInt(id),
      title,
      description,
      image,
      liked: false,
    };

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = storedProducts.map((product) =>
      product.id === parseInt(id) ? updatedProduct : product
    );

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    alert('Product updated successfully!');
    navigate('/products');
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
