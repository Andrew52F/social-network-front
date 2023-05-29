import {useState, useRef} from 'react';
import { object, string } from 'yup';
import { Formik, Form, Field, useField } from 'formik';
import { useTranslation } from 'react-i18next';
import useAutosizeTextArea from '../../../hooks/useAutoresizeTextArea';
import {ReactComponent as SentMessageIcon} from '../../../../assets/sent-message-icon.svg';
import {ReactComponent as CrossIcon} from '../../../assets/cross-icon.svg' 
import FormTextarea from '../formInputs/FormTextarea';
import AddImageInput from '../formInputs/AddImageInput';
import IconSubmitButton from '../formInputs/IconSubmitButton';


const ImagePreview = ({name}: {name: string}) => {
  const [field, meta, helpers] = useField(name);
  const setValue = helpers.setValue;
  return (
      <div className='flex pl-2'>
        <div className='border-2 border-edge rounded-md relative'>
        <img
          src={field.value}
          alt=""
          className='max-h-[150px] object-contain'
        />
        <button 
          type='button' 
          className='absolute top-0 right-0'
          onClick={() => setValue('') }
        >
        <CrossIcon className='h-[30px] w-[30px] fill-text-rgba/30 hover:fill-text-rgba/80 stroke-text-inverted-rgba/10 hover:stroke-text-inverted-rgba/40' />
        </button>
      </div>
      </div>
  )
}




type initialData = {
  text: string,
  image?: string,
};

interface Props {
  onSubmit: (values: initialData) => void,
  hasImage?: boolean,
  textPlaceholder: string,
}


const AddMessageForm: React.FC<Props> = ({onSubmit, hasImage = false, textPlaceholder}) => {
  const { t } = useTranslation();

  const initialValues: initialData = {
    text: '',
  }
  const validationSchema = object({
      text: string().required(t('errors.forms.required').toString())
      .matches(/^(?!\s*$).+/, t('errors.forms.notEmpty').toString()),
    });

  const handleSubmit = (values:initialData, {resetForm}: any) => {
    
    console.log(values)
    onSubmit(values)
    resetForm()
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
          className='bg-foreground border-2 border-edge w-full rounded-lg flex flex-col items-stretch overflow-auto'
        >
          {values.image && (
            <div className='flex pl-2'>
              <ImagePreview name='image' />
            </div>
          )}
          <div className='flex'>
            {
              hasImage && (
                <div className='pt-2'>
                  <AddImageInput name='image' />
                </div>
              )
            }
            <FormTextarea name='text' placeholder={textPlaceholder}/>
            <div className='pt-2'>
              <IconSubmitButton isValid={isValid} />
            </div>
          </div>
        </Form>
      )}
      </Formik>
  )
}

export default AddMessageForm;