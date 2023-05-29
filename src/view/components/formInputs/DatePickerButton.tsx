import { useState } from 'react';
import { Field } from "formik";
import DatePicker from '../auth/UI/DatePicker';
import FormInput from './FormInput';
import {ReactComponent as CalendarIcon} from '../../../assets/calendar.svg';


const DatePickerButton = () => {
  const [show, setShow] = useState(false);
  return (
    <Field
            name='birthDate'
          >
            {({field, form, meta}: {field: any, form: any, meta: any}) => {
              const { setFieldValue, handleChange } = form;
              const { value, name } = field;
              const { touched, error } = meta;

              const formatted = (value instanceof Date ? value.toLocaleDateString() : value)

              return (
                <>
                  <DatePicker show={show} setShow={setShow} handleChange={setFieldValue} name={name} />
                  <div className='flex w-[300px] justify-between gap-2'>
                    <FormInput
                        name={name}
                        touched={touched}
                        field={field}
                        value={formatted}
                        error={error}
                        placeholder='Birth day'
                        handleChange={handleChange}
                      />
                    <button
                      onClick={() => setShow(true)}
                      type='button'
                      className='bg-background-input text-text border-2 rounded-md h-11 p-2 transition-colors duration-200 border-edge flex justify-center items-center'
                    >
                      <CalendarIcon className='w-6 h-6 fill-text' />
                    </button>
                  </div>
                </>
              )
            }}
          </Field>
  )
}

export default DatePickerButton;