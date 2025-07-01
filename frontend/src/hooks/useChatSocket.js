import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { addMessage } from '../store/slices/messagesSlice'
import { addChannel } from '../store/slices/channelsSlice'

const useChatSocket = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = io()

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message))
    })

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel))
    })

    return () => {
      socket.disconnect()
    }
  }, [dispatch])
}

export default useChatSocket
