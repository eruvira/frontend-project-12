import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { closeModal } from '../../store/slices/modalSlice'
import { removeChannel } from '../../store/slices/channelsSlice'
import { setCurrentChannelId } from '../../store/slices/currentChannelSlice'

const RemoveChannelModal = () => {
  const dispatch = useDispatch()
  const { channelId } = useSelector((state) => state.modal)
  const { token } = useSelector((state) => state.auth.user)

  const handleRemove = async () => {
    try {
      await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(removeChannel(channelId))
      dispatch(setCurrentChannelId(1)) 
      dispatch(closeModal())
    } catch (error) {
      console.error('Ошибка удаления канала:', error)
    }
  }

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Вы уверены, что хотите удалить этот канал?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
