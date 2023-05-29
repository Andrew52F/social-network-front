import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { notificationsSelectors, sortedNotificationsSelector } from "../../store/profileSlice";
import { ReactComponent as  UserIcon} from "../../assets/user-icon.svg";
import { ReactComponent as  CrossIcon} from "../../assets/cross-icon.svg";
import { ReactComponent as  CheckMarkIcon} from "../../assets/check-mark-icon.svg";
import { ReactComponent as  CrossMarkIcon} from "../../assets/cross-mark-icon.svg";
import { useSocketApi } from "../../hooks/useSocket";
import { acceptFriendAction, declineFriendAction } from "../../store/asyncActionCreators";


const NotificationsPage: React.FC = () => {
  const {removeNotification,  acceptFriend, declineFriend} = useSocketApi();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { id: ourId} = useAppSelector(state => state.profile);
  const notifications = useAppSelector(sortedNotificationsSelector);

  console.log('Notifications: ', notifications);

  const Tag: React.FC<{to: string, text: string}> = ({to, text}) => <Link to={to} className='text-accent font-semibold transition hover:text-text '>{text}</Link>;

  return (
    <>
      <div className="bg-foreground border-2 border-edge rounded-md text-text-rgba/80 my-2 p-4 grow flex flex-col overflow-hidden">
        <h1 className="text-3xl mt-3 text-center">{t('navigation.notifications')}</h1>
        <div className="w-full h-full flex flex-col mt-6 gap-2  overflow-x-hidden overflow-y-scroll transparent-scrollbar">
          {notifications.length ? (
            notifications.map(notification => {
              const code = notification.data.code;
              const username = notification.sender?.username || '';
              const userId =  notification.sender?.id;
              const notificationId = notification.id;
              const to = `/profile/${notification.sender?.username}`;
              const translation = t(`notifications.${code}`, {someone: 'someone'});
              const parts = translation.split('someone');
              return (
                <div key={notification.id} className='flex items-center'>
                  {(translation.startsWith('someone')) ? (
                    <span><Tag text={username} to={to} /> {translation.replace('someone', '')}</span>
                  ) : (
                    <span>
                      {parts[0]} 
                      <Tag text={username} to={to} />
                      {parts[1]}
                    </span>

                  )}
                  <div className="ml-auto flex gap-2 self-start">
                    {notification.type === 'invite' && (
                      <>
                        <button
                          onClick={() => (userId && acceptFriend({ourId, userId, notificationId}))}
                        >
                          <CheckMarkIcon className=" w-[30px] h-[30px] stroke-edge fill-none hover:stroke-green-400 transition" />
                        </button>
                        <button
                          onClick={() => (userId && declineFriend({ourId, userId, notificationId}))}
                        >
                          <CrossMarkIcon className=" w-[30px] h-[30px] stroke-edge fill-none hover:stroke-red-500 transition" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => removeNotification(notification.id)}
                    >
                      <CrossIcon className="fill-edge hover:fill-text-rgba/80 w-[30px] h-[30px] transition" />
                    </button>
                  </div>

                </div>
              )
            }) 
          ) : (
            <h1 className="text-2xl flex self-center mt-6 text-edge" >{t('notifications.noNotifications')}</h1>
          )}
        </div>
      </div>
    </>
  )
}

export default NotificationsPage;
