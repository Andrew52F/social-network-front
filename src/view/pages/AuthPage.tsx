import { Outlet} from 'react-router-dom';

import { useThemeContext } from '../../hooks/useTheme';
import AuthContainer from '../components/auth/AuthContainer';

import logoLight from '../../assets/light-logo.svg';
import logoDark from '../../assets/dark-logo.svg';

import {ReactComponent as Logo} from '../../assets/logo.svg'



const AuthPage: React.FC = () => {
  return (
    <AuthContainer>
      <div className=' flex justify-center items-center gap-2 sm:flex-col sm:mx-6'>
        <Logo className='w-[50px] h-[50px] sm:w-[200px] sm:h-[200px] sm:p-5 fill-accent' />
        {/* <img src={logoDark} alt="logo" className='w-[50px] h-[50px] sm:w-[200px] sm:h-[200px] sm:p-5'/> */}
        <h1 className='text-3xl md:text-4xl  font-semibold'>EchoSphere</h1>
      </div>
      <div className=' mt-[30px] sm:m-0 w-full flex flex-col'>
        <Outlet />
        {/* {children} */}
      </div>
    </AuthContainer>
  )
  
}

export default AuthPage;