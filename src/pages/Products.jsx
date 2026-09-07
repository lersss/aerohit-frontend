import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div>
      <h1>Портативные электростанции и солнечные панели</h1>
      <div className="products-grid">
        {products.map(p => (
          <Link to={`/product/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="product-card">
              {p.imageUrl && (
                <img
                  src={'https://aerohit-backend-skycomposer.amvera.io' + p.imageUrl}
                  alt={p.model}
                  className="product-image"
                />
              )}
              <h3>{p.model}</h3>
              <p className="power">{p.power}</p>
              <p className="price">от {Math.round(Math.min(p.price1, p.price2, p.price3, p.price4))} ₽</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}