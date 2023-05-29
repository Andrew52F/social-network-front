import { useAppSelector } from "../../../hooks/redux";
import {ReactComponent as UserIcon} from '../../../assets/user-icon.svg'

const ProfileDisplay: React.FC = () => {
  const { username, name, surname, isMale, image, birthDate } = useAppSelector(state => state.userProfile.profile);
  const date = birthDate ? new Date(birthDate) : undefined;
  return (
    <div className='flex flex-col items-center sm:flex-row   gap-4'>
      <div className='rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px]  border-2 border-accent overflow-hidden' >
        {image? (
          <img src={image} alt="" className=''/>
        ) : (
          <UserIcon className='bg-foreground fill-edge p-4 rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px] '/>
        )}
      </div>
      <div className='flex flex-col items-center sm:items-start gap-1'>
        <span className='text-3xl font-semibold drop-shadow-md'>{username}</span>
        <span className='font-semibold drop-shadow-md'>{`${name} ${surname}`}</span>
        {date && (<span className='drop-shadow-sm'>{date.toLocaleDateString()}</span>)}
        
        {/* <span>{`${date.toLocaleDateString()} ${isMale ? t('gender.male') : t('gender.female')}`}</span> */}
      </div>
     
    </div>
  )
}
export default ProfileDisplay;