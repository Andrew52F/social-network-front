import {ReactComponent as SentMessageIcon} from '../../../assets/sent-message-icon.svg';

interface Props {
  isValid: boolean;
}

const IconSubmitButton: React.FC<Props> = ({isValid}) => {
  return (
    <button 
      type='submit'
      className={`${!isValid && ('cursor-default')}`}
    >
      <SentMessageIcon className={`h-[25px] w-[25px]  ${isValid? ('fill-accent') : ('fill-text-rgba/40')}`} />
    </button>
  )
}

export default IconSubmitButton;