import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from '../../api/axiosInstance'
import { setCurrentChannelId } from '../../store/slices/currentChannelSlice'
import { closeModal } from '../../store/slices/modalSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'

const AddChannelModal = () => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const channels = useSelector((state) => state.channels)
  const existingNames = channels.map((c) => c.name)
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      setIsSubmitting(true)
      const cleanedName = leoProfanity.clean(values.name.trim())
      const { data } = await axios.post('/channels', { name: cleanedName })
      dispatch(setCurrentChannelId(data.id))
      dispatch(closeModal())
      toast.success(t('toasts.channelCreated'))
    } catch (e) {
      console.error(e)
      toast.error(t('toasts.networkError'))
    } finally {
      setIsSubmitting(false)
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
            <Form>
              <label htmlFor="channelName" for="channelName" className="form-label">
                {t('modals.channelName')}
              </label>
              <Field
                id="channelName"
                name="name"
                innerRef={inputRef}
                className="form-control"
                placeholder={t('modals.channelName')}
                autoComplete="off"
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
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddChannelModal
