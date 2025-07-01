import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from '../api/axiosInstance'
import { setChannels } from '../store/slices/channelsSlice'
import { setMessages } from '../store/slices/messagesSlice'
import ChannelList from '../components/ChannelList'
import MessageForm from '../components/MessageForm'
import useChatSocket from '../hooks/useChatSocket'
import MessageList from '../components/MessageList'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const HomePage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useChatSocket()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [channelsRes, messagesRes] = await Promise.all([
          axios.get('/channels'),
          axios.get('/messages'),
        ])

        dispatch(setChannels(channelsRes.data))
        dispatch(setMessages(messagesRes.data))
      }
      catch (err) {
        console.error('Ошибка при загрузке каналов и сообщений:', err)
        toast.error(t('toasts.networkError'))
      }
    }

    fetchData()
  }, [dispatch, t])

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4">
          <ChannelList />
        </div>
        <div className="col-8">
          <h4>
            {t('chat.messages')}
          </h4>
          <MessageList />
          <MessageForm />
        </div>
      </div>
    </div>
  )
}

export default HomePage
