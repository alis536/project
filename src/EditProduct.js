import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://server-hh.onrender.com/products/${id}`);

      if (response.status === 200) {
        const product = response.data;
        console.log('Fetched product:', product); // Проверяем, что приходит с сервера
        setTitle(product.title);
        setDescription(product.description);
        setImage(product.image);
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Product not found');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Создаём объект с обновлёнными данными
    const updatedProduct = {
      title,
      description,
      image,
    };
  
    try {
      const response = await axios.put(
        `https://server-hh.onrender.com/products/${id}`,
        updatedProduct,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.status === 200) {
        alert('Продукт обновлён успешно!');
        navigate('/products'); // Перенаправляем на страницу со списком продуктов
      }
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error);
      alert('Не удалось обновить продукт');
    }
  };
  


  if (error) return <p>{error}</p>;

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Product Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <button type="submit" className="btn-submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
