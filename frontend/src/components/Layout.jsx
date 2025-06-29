import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => (
  <div className="min-vh-100 d-flex flex-column bg-light">
    <header className="bg-dark text-white p-3">
      <div className="container">
        <h1 className="h4 m-0">Hexlet Chat</h1>
      </div>
    </header>

    <main className="container my-4 flex-grow-1">
      <Outlet />
    </main>

    <footer className="bg-dark text-white text-center p-3 mt-auto">
      <div className="container">
        <small>© 2025 Hexlet Chat</small>
      </div>
    </footer>
  </div>
)

export default Layout
