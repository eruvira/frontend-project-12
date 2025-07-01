import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Messages = () => {
  const messages = useSelector(state => state.messages)
  const currentChannelId = useSelector(state => state.currentChannel)
  const endRef = useRef(null)

  const filteredMessages = messages.filter(m => m.channelId === currentChannelId,)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filteredMessages])

  return (
    <div className="messages overflow-auto">
      {filteredMessages.map(msg => (
        <div key={msg.id} className="text-start text-wrap">
          <b>{msg.username}</b>
          : 
          {msg.body}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  )
}

export default Messages
