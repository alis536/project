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
      title,
      description,
      image,
      liked: false,
    };

    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Product added successfully!');
        setTitle('');
        setDescription('');
        setImage('');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        alert('Error adding product!');
      });
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
