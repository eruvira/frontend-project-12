import React from 'react'
import { Outlet } from 'react-router-dom'
import Modals from './Modals'
import Header from './Header'

const Layout = () => (
  <div className="min-vh-100 d-flex flex-column bg-light">
    <Header />

    <main className="container my-4 flex-grow-1">
      <Outlet />
      <Modals />
    </main>

    <footer className="bg-dark text-white text-center p-3 mt-auto">
      <div className="container">
        <small>© 2025 Hexlet Chat</small>
      </div>
    </footer>
  </div>
)

export default Layout
