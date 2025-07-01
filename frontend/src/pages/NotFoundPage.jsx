import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import errorImage from '../assets/images/errorImage.png'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <div className="container mt-5">
      <img src={errorImage} alt="error" />
      <h1>{t('notFound.header')}</h1>
      <p>{t('notFound.noExist')}</p>
      <Link to="/" className="btn btn-primary mt-3">
        {t('notFound.goHome')}
      </Link>
    </div>
  )
}

export default NotFoundPage
