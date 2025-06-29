import React from 'react'
import { useSelector } from 'react-redux'

const MessageList = () => {
  const messages = useSelector((state) => state.messages)
  const currentChannelId = useSelector((state) => state.currentChannel)

  const filteredMessages = messages.filter(
    (message) => message.channelId === currentChannelId,
  )

  return (
    <div>
      <div className="mb-2">
        <b>{filteredMessages.length}</b> сообщений
      </div>
      <ul className="list-group mb-3">
        {filteredMessages.map((message) => (
          <li key={message.id} className="list-group-item border-0 ps-0">
            <b>{message.username}</b>: {message.body}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MessageList
