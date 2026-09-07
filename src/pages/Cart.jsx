import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart, clearCart } from '../api';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = () => {
    getCart()
      .then(res => {
        setCart(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    loadCart();
  };

  const handleClear = async () => {
    if (window.confirm('Очистить корзину?')) {
      await clearCart();
      loadCart();
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;

  let total = 0;
  const itemsWithPrice = cart.map(item => {
    const qty = item.quantity;
    const p = item.product;
    let price;
    if (qty <= 5) price = p.price1;
    else if (qty <= 200) price = p.price2;
    else if (qty <= 500) price = p.price3;
    else price = p.price4;
    const sum = price * qty;
    total += sum;
    return { ...item, price, sum };
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Корзина</h1>
        {cart.length > 0 && (
          <button onClick={handleClear} className="btn-clear-text">
            <i className="fas fa-trash-alt"></i> очистить
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p>Корзина пуста. <Link to="/">Вернуться к товарам</Link></p>
      ) : (
        <>
          <div className="cart-items">
            {itemsWithPrice.map(item => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-image">
                  {item.product.imageUrl && (
                    <img
                      src={'https://aerohit-backend-skycomposer.amvera.io' + item.product.imageUrl}
                      alt={item.product.model}
                    />
                  )}
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-model">{item.product.model}</div>
                  <div className="cart-item-power">{item.product.power}</div>
                  <div className="cart-item-price">{Math.round(item.price)} ₽ × {item.quantity} шт.</div>
                </div>
                <div className="cart-item-sum">{Math.round(item.sum)} ₽</div>
                <button className="cart-item-remove" onClick={() => handleRemove(item.id)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <div className="cart-total-row">
              <span className="cart-total-label">Итого:</span>
              <span className="cart-total-amount">{Math.round(total)} ₽</span>
            </div>
            <Link to="/checkout">
              <button className="btn-checkout">Оформить заказ</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}