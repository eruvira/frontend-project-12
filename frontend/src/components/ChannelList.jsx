import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'
import { setCurrentChannelId } from '../store/slices/currentChannelSlice'
import { setModal } from '../store/slices/modalSlice'
import { useTranslation } from 'react-i18next'

const ChannelList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const channels = useSelector((state) => state.channels)
  const currentChannelId = useSelector((state) => state.currentChannel)

  const handleSelectChannel = (id) => {
    dispatch(setCurrentChannelId(id))
  }

  const handleAddChannel = () => {
    dispatch(setModal({ type: 'add' }))
  }

  const handleRenameChannel = (channelId) => {
    dispatch(setModal({ type: 'rename', channelId }))
  }

  const handleRemoveChannel = (channelId) => {
    dispatch(setModal({ type: 'remove', channelId }))
  }

  return (
    <div className="p-3 border-end h-100 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">{t('chat.channels')}</h5>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleAddChannel}
        >
          + Добавить
        </Button>
      </div>

      <ul className="list-group overflow-auto">
        {channels.map((channel) => {
          const isActive = channel.id === currentChannelId
          const variant = isActive ? 'primary' : 'light'

          return (
            <li key={channel.id} className="list-group-item p-0 border-0">
              <div className="d-flex align-items-center justify-content-between">
                <Button
                  variant={variant}
                  className="w-100 text-start rounded-start"
                  onClick={() => handleSelectChannel(channel.id)}
                >
                  # {channel.name}
                </Button>

                {channel.removable && (
                  <Dropdown as={ButtonGroup} >
                    <Dropdown.Toggle
                      split
                      variant={variant}
                      id={`dropdown-${channel.id}`}
                      className="rounded-end"
                    />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleRenameChannel(channel.id)}
                      >
                        {t('chat.rename')}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleRemoveChannel(channel.id)}
                      >
                        {t('modals.delete')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ChannelList
