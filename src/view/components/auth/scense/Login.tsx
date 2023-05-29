import { object, string } from 'yup';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { loginAction, logoutAction} from '../../../../store/asyncActionCreators';

import FormInput from '../../formInputs/FormInput';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import AuthMessage from './AuthMessage';
import toast  from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

type FormData = {
  email: string;
  password: string;
};

export interface LoginFormProps {
  onSubmit: (data: FormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit }) => {
  const { t } = useTranslation();

  const initialValues: FormData = {
    email: '',
    password: '',
  };
  const validationSchema = object({
    email: string().required(t('errors.forms.required').toString()).email(t('errors.forms.isEmail').toString()),
    password: string().required(t('errors.forms.required').toString()),
  });
  
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    validateOnBlur
    onSubmit={onSubmit}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      isValid,
    }) => (
      <Form
        className='w-full flex flex-col items-center grow'
      >
        <FormInput
          name='email'
          value={values.email}
          placeholder={t('email') || ''}
          error={errors.email}
          touched={touched.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <FormInput
          name='password'
          value={values.password}
          placeholder={t('password') || ''}
          error={errors.password}
          touched={touched.password}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        
        <div className='sm:mt-auto'>
          <Button submit text={t('actions.login')} disabled={!isValid} />
        </div>
      </Form>
    )}
  </Formik>
  )
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuth, authUser } = useAppSelector(state => state.auth)


  const handleSubmit = async (values: FormData) => {
    try {
      const response: any = await dispatch(loginAction(values));
      console.log(response)
      if (response.payload.status === 400) {
        const errors = response.payload.errors;
        if (errors.includes('nfEmail')) {
          const email = response.meta.arg.email;
          toast.error(t('errors.auth.userNotFound', {email}))
        }
        // toast.error(response.payload.message)
        return;
      }
      if (response.payload.authUser && response.payload.authUser.isActivated ) {
        console.log('logged in')
        navigate('/');
        return;
      }
    } catch (e) {
    }
  };

  return (
    <>
      {(isAuth) ? (
        <AuthMessage onLogOut={() => dispatch(logoutAction())} message={(authUser?.isActivated) ? t('messages.loggedIn') : t('messages.verifyEmail')} />
      ): (
        <LoginForm  onSubmit={handleSubmit} />
      )}
    </>
  )
}


export default Login;