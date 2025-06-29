import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { addMessage } from '../store/slices/messagesSlice'

const useChatSocket = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = io()

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message))
    })

    return () => {
      socket.disconnect()
    }
  }, [dispatch])
}

export default useChatSocket
