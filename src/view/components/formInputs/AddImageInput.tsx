import { Field } from "formik";
import {ReactComponent as ImageIcon} from '../../../assets/image-icon.svg';



interface Props {
  name: string;
  btnText?: string
}

const AddImageInput: React.FC<Props> = ({ name, btnText }) => {
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
          <div>
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
              // className='bg-background-input py-2 px-10 rounded-md border-2 border-edge transition-color duration-200 text-center hover:bg-edge cursor-pointer'
            >
              <ImageIcon className='fill-text-rgba/40 hover:fill-text-rgba/80' />
            </label>
          </div> 
        )
      }}
    </Field>
  )
}
export default AddImageInput;

