import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentChannelId } from '../store/slices/currentChannelSlice'

const ChannelList = () => {
  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channels)
  const currentChannelId = useSelector((state) => state.currentChannel)

  const handleClick = (id) => {
    dispatch(setCurrentChannelId(id))
  }

  return (
    <ul className="list-group">
      {channels.map((channel) => (
        <li
          key={channel.id}
          className={`list-group-item list-group-item-action ${
            channel.id === currentChannelId ? 'active' : ''
          }`}
          onClick={() => handleClick(channel.id)}
          role="button"
        >
          {channel.name}
        </li>
      ))}
    </ul>
  )
}

export default ChannelList
