import { Field } from "formik";
import {ReactComponent as UserIcon} from '../../../assets/user-icon.svg';


interface Props {
  name: string;
  btnText: string
}

const UserImageInput: React.FC<Props> = ({ name, btnText }) => {
  return (
    <Field
      name='image'
    >
      {({field, form, meta}: {field: any, form: any, meta: any}) => {
        const { setFieldValue } = form;
        const { value, name } = field;
        // const { touched, error } = meta;

        const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files?.length) {
            const file = (e.target.files) && e.target.files[0];
            previewFile(file);
          }
        }
        const previewFile = (file: File) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setFieldValue(name, reader.result)
            // setPreviewSource(reader.result)
          }
        }
        return (
          <div className="flex justify-center flex-col sm:px-4 gap-4">
            <div className='rounded-full border-4 border-accent relative'>
              {value ? (
                <img src={value} alt='' className='w-[200px] h-[200px] bg-foreground fill-edge rounded-full object-cover' />
              ) : (
                <UserIcon className='w-[200px] h-[200px] bg-foreground fill-edge p-4 rounded-full'/>
              )}
              <div className="absolute top-0 bottom-0 left-0 right-0 rounded-full flex justify-center items-end">
              </div>
            </div>
            <input
                id="file"
                type="file" 
                name='image' 
                accept="image/png, image/jpeg, image/jpf"
                onChange={handleFileInputChange}  
                className={'hidden'}
              />
            <label
              htmlFor="file"
              className='bg-background-input py-2 px-10 rounded-md border-2 border-edge transition-color duration-200 text-center hover:bg-edge cursor-pointer'
            >
              {btnText}
            </label>
          </div>
          
        )
      }}
    </Field>
  )
}
export default UserImageInput;

