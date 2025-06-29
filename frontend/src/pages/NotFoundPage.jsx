import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="container mt-5">
    <h1>404 — Страница не найдена</h1>
    <p>Такой страницы не существует.</p>
    <Link to="/" className="btn btn-primary mt-3">На главную</Link>
  </div>
)

export default NotFoundPage
