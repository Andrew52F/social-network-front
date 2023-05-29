import { Field, useField } from "formik";
import { useRef, useState } from "react";
import useAutosizeTextArea from "../../../hooks/useAutoresizeTextArea";

interface Props {
  name: string;
  placeholder?: string;
}

const FormTextarea: React.FC<Props> = ({name, placeholder}) => {

  const [field, meta, helpers] = useField(name);
  const setValue = helpers.setValue;
  const { value, onChange, onBlur } = field;
  const textareaRef = useAutosizeTextArea(40)
  // const textareaRef = useAutosizeTextArea(40);

  
  return (
    <textarea 
      ref={textareaRef}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      name={name}
      className='h-full grow p-2 flex-wrap-wrap resize-none bg-foreground' 
      placeholder={placeholder || ''}
      value={value}
      onBlur={onBlur}
    /> 
  )
}

export default FormTextarea;