import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../api/axiosInstance'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import { toast } from 'react-toastify'

const MessageForm = () => {
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentChannelId = useSelector(state => state.currentChannel)
  const { username } = useSelector(state => state.auth.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    const cleanedBody = leoProfanity.clean(body)

    const newMessage = {
      body: cleanedBody,
      channelId: currentChannelId,
      username,
    }

    try {
      await axios.post('/messages', newMessage)
      setBody('')
    } 
    catch (err) {
      console.error(err)
      toast.error(t('toasts.networkError'))
      setError(t('chat.sendError'))
    } 
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mt-4">
        <input
          className="form-control"
          type="text"
          placeholder={t('chat.placeholder')}
          value={body}
          onChange={e => setBody(e.target.value)}
          required
          autoComplete="off"
          aria-label="Новое сообщение"
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {t('chat.send')}
        </button>
      </div>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  )
}

export default MessageForm
