import { useTranslation } from "react-i18next";
import Button from "../UI/Button";

interface MessageProps {
  onLogOut: () => void;
  message: string;
}

const AuthMessage: React.FC<MessageProps> = ({onLogOut, message}) => {
  const { t } = useTranslation();
  return (
    <div className='w-full  flex flex-col items-center gap-10 grow'>
      <div className="flex flex-col justify-center grow">
        <h1 className='text-2xl text-center'>{message}</h1>
      </div>
      <div className='sm:mt-auto'>
        <Button text={t('actions.logout')} onClick={onLogOut}/>
      </div>
    </div>
  )
}

export default AuthMessage;