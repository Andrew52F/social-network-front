import { Field } from 'formik';

type Option = {
  id: string,
  value: string,
  text: string,
}


interface Props {
  name: string,
  options: Option[]
}

const FormRadio: React.FC<Props> = ({name, options}) => (
  <Field name={name}>
    {({ field }: {field: any}) => (
      <div className='flex rounded-md border-2 border-edge mb-[30px] overflow-hidden'>

        {options.map(({id, value, text}) => (
          <div key={id} className='flex items-center basis-1/2 justify-center'>
            <input
              {...field}
              className="peer hidden"
              id={id}
              value={value}                
              checked={field.value === value}
              name={name}
              type="radio"
            />
            <label 
              htmlFor={id}
              className="block w-full text-center text-[#9ca3af] bg-background-input py-2 transition-color duration-200 peer-checked:bg-accent peer-checked:text-text cursor-pointer"
            >
              {text}
            </label>
        </div>
        ))}

      </div>
    )}
  </Field>

)

export default FormRadio;