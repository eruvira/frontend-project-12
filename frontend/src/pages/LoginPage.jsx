import React from 'react'
import { Formik, Form, Field } from 'formik'

const LoginPage = () => (
  <div className="container mt-5">
    <h1>Login</h1>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {
        console.log('Login attempt (пока без отправки)', values)
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

          <button type="submit" className="btn btn-primary">Login</button>
        </Form>
      )}
    </Formik>
  </div>
)

export default LoginPage
