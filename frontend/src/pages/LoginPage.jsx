import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { login } from '../store/slices/authSlice'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [authFailed, setAuthFailed] = useState(false)

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{t('login.header')}</h1>
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
              toast.error(t('toasts.networkError'))
              console.error('Login error:', err)
            }
          }
        }}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                {t('login.username')}
              </label>
              <Field
                name="username"
                id="username"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                {t('login.password')}
              </label>
              <Field
                name="password"
                type="password"
                id="password"
                className="form-control"
                required
              />
            </div>

            {authFailed && (
              <div className="alert alert-danger" role="alert">
               {t('login.authFailed')}
              </div>
            )}

            <button type="submit" className="btn btn-primary">
               {t('login.submit')}
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-center mt-3">
        <span> {t('login.signupPrompt')}</span>
        <Link to="/signup">{t('login.signUp')}</Link>
      </div>
    </div>
  )
}

export default LoginPage
