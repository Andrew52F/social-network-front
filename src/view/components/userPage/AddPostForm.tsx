import {useState, useRef, useEffect} from 'react';
import { object, string } from 'yup';
import { Formik, Form, Field, useField } from 'formik';
import { useTranslation } from 'react-i18next';
import useAutosizeTextArea from '../../../hooks/useAutoresizeTextArea';
import {ReactComponent as SentMessageIcon} from '../../../../assets/sent-message-icon.svg';
import {ReactComponent as CrossIcon} from '../../../assets/cross-icon.svg' 
import FormTextarea from '../formInputs/FormTextarea';
import AddImageInput from '../formInputs/AddImageInput';
import IconSubmitButton from '../formInputs/IconSubmitButton';
import { useAppSelector } from '../../../hooks/redux';
import { postsSelectors } from '../../../store/postsSlice';
import {scrollToCoordinates} from '../../../utilities/scroll';



const ImagePreview = ({name}: {name: string}) => {
  const [field, meta, helpers] = useField(name);
  const setValue = helpers.setValue;
  return (
      <div className='flex pl-2'>
        <div className='border-2 border-edge rounded-md relative overflow-hidden'>
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
  onAdd: (values: initialData) => void;
  onClear?: () => void;
  onUpdate?: ( postId: string, values: initialData) => void;
}


const AddPostForm: React.FC<Props> = ({onAdd, onClear, onUpdate}) => {
  const postFormPostId =  useAppSelector(state => state.posts.postFormPostId);
  const postFormPostData = useAppSelector( state => postFormPostId ? postsSelectors.selectById(state, postFormPostId) : null)
  const { t } = useTranslation();

  console.log(`POST FORM POST DATA ${JSON.stringify(postFormPostData)}`)

  useEffect(() => {
    if (postFormPostId) {
      console.log('SCROLL!!')
      document.querySelector('#postForm')?.scrollIntoView({behavior: 'smooth'})
    }
  })

  const initialValues: initialData = postFormPostData ? (
    {
      text: postFormPostData.text,
      image: postFormPostData.image,
    }
  ): (
    {
      text: '',
    }
  );

  console.log(`InitialValues: ${JSON.stringify(initialValues)}`)

  const validationSchema = object({
      text: string().required(t('errors.forms.required').toString())
      .matches(/^(?!\s*$).+/, t('errors.forms.notEmpty').toString()),
    });

  const handleSubmit = (values:initialData, {resetForm}: any) => {
    
    console.log(values)
    if (postFormPostId  && onUpdate) {
      onUpdate(postFormPostId, values)
    } else {
      onAdd(values)
    }
    resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
      }) => {
        return (
          <Form
            id='postForm'
            className='bg-foreground border-2 border-edge w-full min-h-[60px] rounded-lg flex flex-col items-stretch overflow-auto'
          >
            <FormTextarea name='text' placeholder={t('whatsNew').toString()}/>
            {values.image && (
              <div className='flex pl-2 mb-2'>
                <ImagePreview name='image' />
              </div>
            )}
        <div className='flex justify-between border-t-2 border-edge p-1 border-opacity-10' >
          <div className='flex flex-row items-center'>
            {postFormPostId && (
              <button
              className=' justify-self-start bg-foreground rounded-lg p-1 flex flex-row items-center gap-1 hover:bg-edge group'
              onClick={() => {if (onClear) {onClear()}}}
            >
              <span className="text-text-rgba/60 group-hover:text-text text-xs">
                {t('actions.stop-edit')}
              </span>
              <CrossIcon className='w-[15px] h-[15px] fill-text-rgba/60 group-hover:fill-text ' />
            </button>
            )}
          </div>
          <div className='flex flex-row gap-3'>
            <AddImageInput name='image' />
            <IconSubmitButton isValid={isValid} />
          </div>
        </div>
          </Form>
        )

      }}
      </Formik>

  )
}

export default AddPostForm;
