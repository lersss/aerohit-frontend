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
    await clearCart();
    loadCart();
  };

  if (loading) return <div className="loading">Загрузка...</div>;

  let total = 0;
  cart.forEach(item => {
    const qty = item.quantity;
    const p = item.product;
    let price;
    if (qty <= 5) price = p.price1;
    else if (qty <= 200) price = p.price2;
    else if (qty <= 500) price = p.price3;
    else price = p.price4;
    total += price * qty;
  });

  return (
    <div>
      <h1>Корзина</h1>
      {cart.length === 0 ? (
        <p>Корзина пуста. <Link to="/">Вернуться к товарам</Link></p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <span>{item.product.model} — {item.quantity} шт.</span>
                <button onClick={() => handleRemove(item.id)}>Удалить</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <p><strong>Итого: {Math.round(total)} ₽</strong></p>
            <button className="btn-clear" onClick={handleClear}>Очистить корзину</button>
            <Link to="/checkout"><button className="btn-checkout">Оформить заказ</button></Link>
          </div>
        </>
      )}
    </div>
  );
}