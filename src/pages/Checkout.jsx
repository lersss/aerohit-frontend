import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api';

export default function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createOrder(form);
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      console.error(err);
      setError('Ошибка оформления заказа. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h2>✅ Заказ оформлен!</h2>
        <p>Скоро мы свяжемся с вами.</p>
        <p>Перенаправление на главную...</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>Оформление заказа</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Как к вам обращаться *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Телефон *</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Комментарий</label>
          <textarea name="comment" value={form.comment} onChange={handleChange} rows="3"></textarea>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </form>
    </div>
  );
}