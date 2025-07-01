import { useEffect, useRef, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from '../../api/axiosInstance'
import { closeModal } from '../../store/slices/modalSlice'
import { renameChannel } from '../../store/slices/channelsSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'

const RenameChannelModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { channelId } = useSelector(state => state.modal)
  const channels = useSelector(state => state.channels)
  const channel = channels.find(c => c.id === channelId)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  const channelNames = channels.map(c => c.name)

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
    onSubmit: async ({ name }, { setErrors }) => {
      setIsSubmitting(true)
      try {
        const cleanedName = leoProfanity.clean(name.trim())
        const response = await axios.patch(`/channels/${channelId}`, {
          name: cleanedName,
        })
        dispatch(renameChannel(response.data))
        dispatch(closeModal())
        toast.success(t('toasts.channelRenamed'))
      }
      catch (error) {
        console.log(error)
        toast.error(t('toasts.networkError'))
        setErrors({ name: t('modals.renameError') })
      }
      finally {
        setIsSubmitting(false)
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
              autoComplete="off"
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">
              Имя канала
            </label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(closeModal())}
            disabled={isSubmitting}
          >
            {t('modals.cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {t('modals.confirm')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RenameChannelModal
