import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setChannels } from '../store/slices/channelsSlice'
import { setMessages } from '../store/slices/messagesSlice'
import ChannelList from '../components/ChannelList'
import MessageForm from '../components/MessageForm'
import useChatSocket from '../hooks/useChatSocket'
import MessageList from '../components/MessageList'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { token } = useSelector((state) => state.auth.user)

  useChatSocket()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsResponse = await axios.get('/api/v1/channels', {
          headers: { Authorization: `Bearer ${token}` },
        })
        dispatch(setChannels(channelsResponse.data))

        const messagesResponse = await axios.get('/api/v1/messages', {
          headers: { Authorization: `Bearer ${token}` },
        })
        dispatch(setMessages(messagesResponse.data))
      } catch (err) {
        console.error('Ошибка при загрузке каналов и сообщений:', err)
      }
    }

    fetchData()
  }, [dispatch, token])

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4">
          <ChannelList />
        </div>
        <div className="col-8">
          <h4> {t('chat.messages')}</h4>
          <MessageList />
          <MessageForm />
        </div>
      </div>
    </div>
  )
}

export default HomePage
