import { useMemo } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { userFriendsSelectors } from "../../../store/userProfileSlice";
import { friendsSelectors } from "../../../store/profileSlice";
import {ReactComponent as UserIcon} from '../../../assets/user-icon.svg'
import {ReactComponent as CrossIcon} from '../../../assets/cross-icon.svg'
import {ReactComponent as PlusIcon} from '../../../assets/plus-icon.svg'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  onAdd: (e: MouseEvent) => void,
  onRemove: (name: string) => void,
  onCreate?: (e: MouseEvent) => void,
  to: string,
  heading: string,
  ourData: any[],
  data: any[],
  ourId: string;
}

const List: React.FC<Props> = ({onAdd, onRemove, to, heading, data, ourData, ourId}) => {
  const { t } = useTranslation();
  const ourIds = ourData.map(entity => entity.id);
  const intersection = useMemo(() => data.filter(entity => ourIds.includes(entity.id)).map(entity => entity.id), [data, ourIds])
  const handleAdd = (e: any) => {
    e.stopPropagation();
    console.log('Add')
  }
  const handleRemove = (id: string) => (e: any) => {
    e.stopPropagation();
    console.log('Remove')
    onRemove(id);
  }
  return (
    <div 
      className="w-full border-2 border-edge bg-foreground rounded-md"
    >
      <div className="p-2">
        <h3>{heading}</h3>
      </div>
      <div className="flex flex-col items-stretch border-t-2 border-edge">
        {
          data.length === 0? (
            <span className="p-2 mx-auto">{t('emptyList')}</span>
          ): (
            data.map(entity => (
              <div key={entity.id} className='flex p-2'>
                <Link 
                className="flex items-center text-text-rgba/60 hover:text-text-rgba transition gap-2 justify-start"
                to={`${to}/${entity.username || entity.name}`}
              >
                <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                  {entity.image ? (
                    <img src={entity.image} alt=""/>
                  ) : (
                    <UserIcon className='bg-foreground fill-edge p-4 w-[48px] h-[48px] '/>
                  )}
                </div>
                <span>{entity.username}</span>
              </Link>
              <div className="ml-auto flex items-center">
                { entity.id !== ourId && (
                  intersection.includes(entity.id)? (
                    <button 
                      onClick={handleRemove((entity.id))}
                    >
                      <CrossIcon
                        className="w-[25px] h-[25px] fill-edge hover:fill-text transition"
                      />
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={handleAdd}
                      >
                        <PlusIcon
                          className="w-[25px] h-[25px] fill-edge hover:fill-text transition"
                        />
                      </button>
                    </>
                  )
                )}
              </div>
              </div>  
          ))
          )
        }
      </div>
    </div>
  )
}

export default List;