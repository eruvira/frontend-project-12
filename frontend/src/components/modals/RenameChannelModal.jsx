import React, { useEffect, useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { closeModal } from '../../store/slices/modalSlice'
import { renameChannel } from '../../store/slices/channelsSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'

const RenameChannelModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { channelId } = useSelector((state) => state.modal)
  const channels = useSelector((state) => state.channels)
  const channel = channels.find((c) => c.id === channelId)
  const { token } = useSelector((state) => state.auth.user)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  const channelNames = channels.map((c) => c.name)

  const formik = useFormik({
    initialValues: {
      name: channel?.name || '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('modals.requiredError'))
        .min(3, t('modals.lengthError'))
        .max(20, t('modals.lengthError'))
        .notOneOf(channelNames, t('modals.uniqueError')),
    }),
    onSubmit: async ({ name }, { setSubmitting, setErrors }) => {
      try {
        const cleanedName = leoProfanity.clean(name.trim())

        const response = await axios.patch(
          `/api/v1/channels/${channelId}`,
          { name: cleanedName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        dispatch(renameChannel(response.data))
        dispatch(closeModal())
        toast.success(t('toasts.channelRenamed'))
      } catch (err) {
        setErrors({ name: t('modals.renameError') })
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="channelName">
            <Form.Control
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
              ref={inputRef}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            {t('modals.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
          >
            {t('modals.confirm')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RenameChannelModal
