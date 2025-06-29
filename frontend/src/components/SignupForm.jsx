import React from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { login } from '../store/slices/authSlice'
import { useTranslation } from 'react-i18next'

const SignupForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t('modals.lengthError'))
        .max(20, t('modals.lengthError'))
        .required(t('modals.requiredError')),
      password: Yup.string()
        .min(6, 'Не менее 6 символов')
        .required(t('modals.requiredError')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .required(t('modals.requiredError')),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username,
          password: values.password,
        })

        const userData = {
          username: response.data.username,
          token: response.data.token,
        }

        dispatch(login(userData)) 
        navigate('/')
      } catch (err) {
        if (err.response?.status === 409) {
          setErrors({ username: t('signup.userExists') })
        } else {
          console.error(err)
          setErrors({ username: 'Произошла ошибка регистрации' })
        }
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FloatingLabel
        controlId="username"
        label={t('signup.username')}
        className="mb-3"
      >
        <Form.Control
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={formik.touched.username && !!formik.errors.username}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel controlId="password" label={t('signup.password')} className="mb-3">
        <Form.Control
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        controlId="confirmPassword"
        label={t('signup.confirmPassword')}
        className="mb-3"
      >
        <Form.Control
          type="password"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          isInvalid={
            formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </FloatingLabel>

      <Button type="submit" className="w-100" disabled={formik.isSubmitting}>
        {t('signup.submit')}
      </Button>
    </Form>
  )
}

export default SignupForm
