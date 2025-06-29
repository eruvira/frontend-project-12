import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { setCurrentChannelId } from '../../store/slices/currentChannelSlice'
import { closeModal } from '../../store/slices/modalSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'


const AddChannelModal = () => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const channels = useSelector((state) => state.channels)
  const existingNames = channels.map((c) => c.name)
  const { token } = useSelector((state) => state.auth.user)
  const { t } = useTranslation()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .min(3, t('modals.lengthError'))
      .max(20, t('modals.lengthError'))
      .required(t('modals.requiredError'))
      .notOneOf(existingNames, t('modals.uniqueError')),
  })

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        '/api/v1/channels',
        {
          name: values.name.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      const { id } = response.data
      dispatch(setCurrentChannelId(id)) 
      dispatch(closeModal())
      toast.success(t('toasts.channelCreated'))
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h5 className="modal-title mb-3">{t('modals.addChannel')}</h5>
          <Formik
            initialValues={{ name: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="name"
                  innerRef={inputRef}
                  className="form-control mb-2"
                  placeholder={t('modals.channelName')}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger mb-2"
                />
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {t('modals.add')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddChannelModal
