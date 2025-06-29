import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setChannels } from '../store/slices/channelsSlice'
import { setMessages } from '../store/slices/messagesSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const channels = useSelector((state) => state.channels)
  const messages = useSelector((state) => state.messages)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }

        const [channelsRes, messagesRes] = await Promise.all([
          axios.get('/api/v1/channels', config),
          axios.get('/api/v1/messages', config),
        ])

        dispatch(setChannels(channelsRes.data))
        dispatch(setMessages(messagesRes.data))
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err)
      }
    }

    if (user?.token) {
      fetchData()
    }
  }, [dispatch, user])

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-4">
          <h4>Каналы</h4>
          <ul className="list-group">
            {channels.map((channel) => (
              <li key={channel.id} className="list-group-item">
                {channel.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-8">
          <h4>Сообщения</h4>
          <ul className="list-group">
            {messages.map((msg) => (
              <li key={msg.id} className="list-group-item">
                <strong>{msg.username}:</strong> {msg.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage
