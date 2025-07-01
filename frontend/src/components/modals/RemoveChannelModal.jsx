import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../api/axiosInstance'
import { closeModal } from '../../store/slices/modalSlice'
import { removeChannel } from '../../store/slices/channelsSlice'
import { setCurrentChannelId } from '../../store/slices/currentChannelSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const RemoveChannelModal = () => {
  const dispatch = useDispatch()
  const { channelId } = useSelector(state => state.modal)
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRemove = async () => {
    setIsSubmitting(true)
    try {
      await axios.delete(`/channels/${channelId}`)
      dispatch(removeChannel(channelId))
      dispatch(setCurrentChannelId(1))
      dispatch(closeModal())
      toast.success(t('toasts.channelRemoved'))
    }
    catch (error) {
      toast.error(t('toasts.networkError'))
      console.error('Ошибка удаления канала:', error)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modals.sureToDelete')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => dispatch(closeModal())}
          disabled={isSubmitting}
        >
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove} disabled={isSubmitting}>
          {t('modals.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
