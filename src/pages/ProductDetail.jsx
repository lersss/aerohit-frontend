import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart } from '../api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const getPrice = (qty) => {
    if (!product) return 0;
    if (qty <= 5) return product.price1;
    if (qty <= 200) return product.price2;
    if (qty <= 500) return product.price3;
    return product.price4;
  };

  const handleAdd = async () => {
    await addToCart(product.id, quantity);
    navigate('/cart');
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error || !product) return <div className="error">Товар не найден</div>;

  const price = getPrice(quantity);
  const total = price * quantity;

  return (
    <div className="product-detail">
      {product.imageUrl && (
        <img
          src={import.meta.env.VITE_API_URL + product.imageUrl}
          alt={product.model}
          className="detail-image"
        />
      )}
      <div className="detail-info">
        <h1>{product.model}</h1>
        <p><strong>Мощность:</strong> {product.power}</p>
        <p><strong>Характеристики:</strong> {product.description}</p>
        <p><strong>Комплектация:</strong> {product.package || '—'}</p>
        <div className="quantity">
          <label>Количество:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <p className="price">Цена за шт: {price.toFixed(2)} ₽</p>
        <p className="total">Итого: {total.toFixed(2)} ₽</p>
        <button className="btn-add" onClick={handleAdd}>Добавить в корзину</button>
      </div>
    </div>
  );
}