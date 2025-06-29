import React from 'react'
import { useSelector } from 'react-redux'

const Messages = () => {
  const messages = useSelector((state) => state.messages)
  const currentChannelId = useSelector((state) => state.currentChannel)

  const filteredMessages = messages.filter(
    (m) => m.channelId === currentChannelId
  )

  return (
    <div className="messages">
      {filteredMessages.map((msg) => (
        <div key={msg.id}>
          <b>{msg.username}</b>: {msg.body}
        </div>
      ))}
    </div>
  )
}

export default Messages
