import { object, string, ref } from 'yup';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { registrationAction, logoutAction} from '../../../../store/asyncActionCreators';

import FormInput from '../../formInputs/FormInput';
import Button from '../UI/Button';
import AuthMessage from './AuthMessage';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';


type RequestData = {
  email: string;
  password: string;
}

type FormData = RequestData & {
  passwordConfirmation: string;
};

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void;
}

const initialValues: FormData = {
  email: '',
  password: '',
  passwordConfirmation: ''
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({onSubmit}) => {
  const { t } = useTranslation();

  const validationSchema = object({
    email: string().required(t('errors.forms.required').toString()).email(t('errors.forms.isEmail').toString()),
    password: string().required(t('errors.forms.required').toString()).matches(/^.{4,30}$/, t('errors.forms.lengthPassword').toString()),
    passwordConfirmation: string().required(t('errors.forms.required').toString()).oneOf([ref('password'), null], t('errors.forms.asPassword').toString())
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
        <FormInput
          name='passwordConfirmation'
          value={values.passwordConfirmation}
          placeholder={t('passwordConfirmation') || ''}
          error={errors.passwordConfirmation}
          touched={touched.passwordConfirmation}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <div className='sm:mt-auto'>
          <Button submit text={t('actions.signup')} disabled={!isValid} />
        </div>
      </Form>
    )}
  </Formik>
  )
}

const Registration: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, isAuth, authUser} = useAppSelector(state => state.auth)

  const loggedIn = 'You are already logged in';
  const verifyEmail = 'Verify your email'

  const handleSubmit = async (values: FormData) => {
    try {
      const response: any = await dispatch(registrationAction(values));

      if (response.payload.status === 400) {
        const errors = response.payload.errors;
        if (errors.includes('usedEmail')) {
          toast.error(t('errors.auth.usedEmail'))
        }
      }
      if (response.payload.status === 500) {
        toast.error(t('errors.auth.server'))
      }
      
      // toast.error(response.payload.message)

    } catch (e) {}
  };

  return (
    <>
    {(isAuth) ? (
        <AuthMessage onLogOut={() => dispatch(logoutAction())} message={(authUser?.isActivated) ? loggedIn : verifyEmail} />
      ): (
        <RegistrationForm  onSubmit={handleSubmit}/>
      )}
    </>
  )
}


export default Registration;