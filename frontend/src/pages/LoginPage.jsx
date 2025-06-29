// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate()
  const [authFailed, setAuthFailed] = useState(false)

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          setAuthFailed(false)
          try {
            const response = await axios.post('/api/v1/login', values)
            const { token, username } = response.data
            localStorage.setItem('user', JSON.stringify({ token, username }))
            navigate('/')
          } catch (err) {
            if (err.response?.status === 401) {
              setAuthFailed(true)
            } else {
              console.error('Unexpected error:', err)
            }
          }
        }}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <Field name="username" id="username" className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field name="password" type="password" id="password" className="form-control" />
            </div>

            {authFailed && (
              <div className="alert alert-danger" role="alert">
                Неверные имя пользователя или пароль
              </div>
            )}

            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage
