import { useState } from 'react';
import { object, string, date } from 'yup';
import { Formik, Form, Field } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import AuthContainer from '../components/auth/AuthContainer';
import AuthMessage from '../components/auth/scense/AuthMessage';

import { createProfileAction, logoutAction} from '../../store/asyncActionCreators';

import FormInput from '../components/formInputs/FormInput';
import Button from '../components/auth/UI/Button';
import { useNavigate } from 'react-router-dom';
import toast  from 'react-hot-toast';

import {ReactComponent as UserIcon} from '../../assets/user-icon.svg'
import FormRadio from '../components/formInputs/FormRadio';
import UserImageInput from '../components/formInputs/UserImageInput';
import DatePickerButton from '../components/formInputs/DatePickerButton';

type FormData = {
  username: string;
  name: string;
  surname: string;
  gender: 'male' | 'female';
  birthDate?: Date;
  image: string;
}
type RequestData = Omit<FormData, 'gender'> & {
  isMale: boolean;
};

interface FormProps {
  onSubmit: (values: RequestData) => void
}


const ProfileForm: React.FC<FormProps> = ({ onSubmit }) => {
  const initialValues: FormData = {
    username: '',
    name: '',
    surname: '',
    gender: 'male',
    image: '',
  };
  const validationSchema = object({
    username: string().required('Field is required').matches(/^.{6,15}$/, 'Username length from 6 to 15 letters'),
    name: string().required('Field is required').max(15, 'Max length is 15 letters'),
    surname: string().required('Field is required').max(15, 'Max length is 15 letters'),
  });
  // const radioClasses = 'inline-felex';


  const handleSubmit = (values: FormData) => {
    const data = {
      username: values.username,
      name: values.name,
      surname: values.surname,
      birthDate: values.birthDate,
      image: values.image,
      isMale: !!(values.gender === 'male')
    }
    console.log('Values: ', data);
    onSubmit(data)
  }


  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    validateOnBlur
    onSubmit={handleSubmit}
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
        className='w-full flex flex-col sm:flex-row justify-center items-center sm:items-start gap-6'
      >
        <UserImageInput name='image' btnText='Choose' />

        <div className='w-[300px]'>
          <FormInput
            name='username'
            value={values.username}
            placeholder='Username'
            error={errors.username}
            touched={touched.username}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          <FormInput
            name='name'
            value={values.name}
            placeholder='Name'
            error={errors.name}
            touched={touched.name}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          <FormInput
            name='surname'
            value={values.surname}
            placeholder='Surname'
            error={errors.surname}
            touched={touched.surname}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          <DatePickerButton />

          <FormRadio
            name='gender'
            options={[
              {id: 'male', value: 'male', text: 'Male'},
              {id: 'female', value: 'female', text: 'Female'}
            ]}
          />
          

        <Button submit text='Create' disabled={!isValid} />
        </div>
        
      </Form>
    )}
  </Formik>
  )
}


const Profile: React.FC = () => {
  const { isProfileCreated } = useAppSelector(state => state.profile)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: RequestData) => {
    try {
      const response: any = await dispatch(createProfileAction(values));
      console.log('Response: ', response)
      const payload = response.payload;
      if (payload.status === 400) {
        toast.error(response.payload.message)
        return;
      }
      if (payload.username) {
        console.log('profile created')
        console.log(response);
        const username = response.meta.arg.username;
        console.log(username)
        // setTimeout(() => navigate(`/profile/${username}`), 5000)
        navigate(`/profile/${username}`)
        return;
      }
    } catch (e) {
    }
  }

  return (
    <AuthContainer>
      <div className='w-full flex flex-col items-center'>
        <h1 className="text-2xl mb-5">Create Profile</h1>

        {(isProfileCreated) ? (
          <AuthMessage message='Your profile is already created' onLogOut={() => dispatch(logoutAction())} />
        ): (
          <ProfileForm onSubmit={handleSubmit} /> 
        )}

      </div>
    </AuthContainer>
  )
  
}
export default Profile;
