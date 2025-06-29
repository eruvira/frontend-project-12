// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { login } from '../store/slices/authSlice'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [authFailed, setAuthFailed] = useState(false)

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Login</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          setAuthFailed(false)
          try {
            const response = await axios.post('/api/v1/login', values)
            const { token, username } = response.data

            dispatch(login({ token, username }))
            navigate('/')
          } catch (err) {
            if (err.response?.status === 401) {
              setAuthFailed(true)
            } else {
              console.error('Login error:', err)
            }
          }
        }}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <Field name="username" id="username" className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field name="password" type="password" id="password" className="form-control" required />
            </div>

            {authFailed && (
              <div className="alert alert-danger" role="alert">
                Неверные имя пользователя или пароль
              </div>
            )}

            <button type="submit" className="btn btn-primary">Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage
