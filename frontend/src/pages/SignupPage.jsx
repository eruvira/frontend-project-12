import SignupForm from '../components/SignupForm'
import { useTranslation } from 'react-i18next'

const SignupPage = () => {
  const { t } = useTranslation()
  return (
    <div className="container py-5">
      <h1 className="mb-4">
        {t('signup.header')}
      </h1>
      <SignupForm />
    </div>
  )
}

export default SignupPage
