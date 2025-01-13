import React, { useState } from 'react';
import './CreateProduct.css';

const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert('Please fill in all fields!');
      return;
    }

    const newProduct = {
      id: Date.now(),
      title,
      description,
      image,
      liked: false,
    };

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    const updatedProducts = [...storedProducts, newProduct];

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    alert('Product added successfully!');
    setTitle('');
    setDescription('');
    setImage('');
  };

  return (
    <div className="create-product">
      <h2>Create a New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            placeholder="Enter product image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
