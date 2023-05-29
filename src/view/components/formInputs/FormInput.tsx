interface FormInputProps {
  name: string;
  value: string;
  placeholder?: string;
  error?: string | undefined;
  field?: object;
  touched: boolean | undefined;
  onClick?: (e: any) => void; 
  handleBlur?: (e: React.FocusEvent<any>) => void;
  handleChange?: (e: React.ChangeEvent<any>) => void;
}

const FormInput: React.FC<FormInputProps> = ({value, handleBlur, handleChange, error, touched, name, placeholder, field, onClick}) => {
  return (
    <div className='relative mb-[30px] w-full'>
      <input
        className={`bg-background-input text-text border-2 ${(error && touched) ? 'border-red-500' : 'border-edge'} rounded-md w-full h-11 p-3 transition-colors duration-200`}
        type={name === 'passwordConfirmation' ? 'password' : name}
        name={name}
        {...field}
        placeholder={placeholder}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        onClick={onClick}
      />
  
      <div className={`absolute bottom-[-1.5rem] ${(error && touched) ?  'text-red-500' : 'text-text'}  text-sm transition-colors duration-200`}>
        {touched && error}
      </div>

    </div>
  )
}

export default FormInput;