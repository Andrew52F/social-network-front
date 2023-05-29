import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

const AuthSwitch: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className='text-2xl flex gap-5 justify-center mb-10'>
      <NavLink to='/login' className='transition duration-200 text-text-muted hover:text-text auth-nav-color'>{t('actions.login')}</NavLink>
      <NavLink to='/registration' className='transition duration-200 text-text-muted hover:text-text auth-nav-color'>{t('actions.registration')}</NavLink>
    </div>
  )
}
export default AuthSwitch