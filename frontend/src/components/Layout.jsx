import React from 'react'
import { Outlet } from 'react-router-dom'
import Modals from './Modals'
import Header from './Header'
import { useTranslation } from 'react-i18next'

const Layout = () => {
  const { t } = useTranslation()
  return (
    <div className="min-vh-100 d-flex flex-column bg-light min-vw-100">
      <Header />

      <main className="container my-4 flex-grow-1">
        <Outlet />
        <Modals />
      </main>

      <footer className="bg-dark text-white text-center p-3 mt-auto">
        <div className="container">
          <small>{t('nav.footer')}</small>
        </div>
      </footer>
    </div>
  )
}

export default Layout
