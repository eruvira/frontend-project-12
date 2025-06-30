import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { closeModal } from '../../store/slices/modalSlice'
import { removeChannel } from '../../store/slices/channelsSlice'
import { setCurrentChannelId } from '../../store/slices/currentChannelSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'


const RemoveChannelModal = () => {
  const dispatch = useDispatch()
  const { channelId } = useSelector((state) => state.modal)
  const { token } = useSelector((state) => state.auth.user)
  const { t } = useTranslation()

  const handleRemove = async () => {
    try {
      await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(removeChannel(channelId))
      dispatch(setCurrentChannelId(1))
      dispatch(closeModal())
       toast.success(t('toasts.channelRemoved'))
    } catch (error) {
      toast.error(t('toasts.networkError'))
      console.error('Ошибка удаления канала:', error)
    }
  }

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('chat.sureToDelete')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          {t('chat.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove}>
           {t('chat.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
