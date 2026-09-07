import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://aerohit-backend-skycomposer.amvera.io';

  useEffect(() => {
    fetch(`${apiUrl}/api/products`)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки товаров');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка товаров...</div>;
  if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Ошибка: {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Наши товары</h1>
      {products.length === 0 ? (
        <p>Товаров пока нет</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {products.map(p => (
            <div key={p.id} style={{ border: '1px solid #ccc', padding: '15px', width: '250px', borderRadius: '8px' }}>
              {p.imageUrl && (
                <img
                  src={apiUrl + p.imageUrl}   // ✅ Полный путь до бэкенда
                  alt={p.model}
                  style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
                />
              )}
              <h3>{p.model}</h3>
              <p><strong>Мощность:</strong> {p.power}</p>
              <p><strong>Цена (≤5 шт):</strong> {p.price1} ₽</p>
              <p><strong>Цена (≤200 шт):</strong> {p.price2} ₽</p>
              <p><strong>Цена (≤500 шт):</strong> {p.price3} ₽</p>
              <p><strong>Цена (≥501 шт):</strong> {p.price4} ₽</p>
              {p.package && <p><strong>Комплектация:</strong> {p.package}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
