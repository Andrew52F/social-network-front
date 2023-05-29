import { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { actions } from "../../../../store/uiStateSlice";

import {ReactComponent as BurgerIcon} from '../../../../assets/burger-icon.svg';
import {ReactComponent as FeedIcon} from '../../../../assets/feed-icon.svg';
import {ReactComponent as MessagesIcon} from '../../../../assets/messages-icon.svg';
import {ReactComponent as PeopleIcon} from '../../../../assets/user-icon.svg';
import {ReactComponent as NotificationIcon} from '../../../../assets/notification-icon.svg';
// import {ReactComponent as ThemeIcon} from '../../../../assets/theme-icon.svg';
// import {ReactComponent as LanguageIcon} from '../../../../assets/language-icon.svg';
// import {ReactComponent as LogoutIcon} from '../../../../assets/logout-icon.svg';
// import {ReactComponent as SettingsIcon} from '../../../../assets/settings-icon.svg';


import Sidebar from "./Sidebar";
import SmallNavbar from "./SmallNavbar";
import { useTranslation } from "react-i18next";
import useMediaQuery from '../../../../hooks/useMediaQuery';
import getCssVariable from '../../../../utilities/getCssVariable';


export interface NavElementData {
  Icon: any;
  text: string;
  to: string;
}

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation()
  const { username, image } = useAppSelector(store => store.profile);

  const isAboveSmallScreens = useMediaQuery(`(min-width: ${getCssVariable('--sm')})`);
  useEffect(() => {
    if (isAboveSmallScreens !== null) {
      dispatch(actions.setIsBigNavbar(isAboveSmallScreens))
    }
  }, [dispatch, isAboveSmallScreens])


  // const isAboveSmallScreens = useMediaQuery(`(min-width: ${getCssVariable('--sm')})`);
  // console.log('isAboveSmallScreens: ', isAboveSmallScreens);

  const { isBigNavbar, big: {isOpen}, small: {isSettingsOpen} } = useAppSelector(store => store.uiState.navbar);
  const handleOpen = () => dispatch(actions.setIsOpen(!isOpen));
  const setIsSettingsOpen = () => dispatch(actions.setIsSettingsOpen(!isSettingsOpen));
  

  const UserImage = ({className}: any) => (
      <div className={`w-full h-full rounded-full overflow-hidden p-[3px] image ${className}`}>
        <img src={image} alt='' className='rounded-full' />
      </div>
  )

  const navData: NavElementData[] =[
    {Icon: UserImage, text: t('navigation.myPage'), to: `profile/${username}`},
    {Icon: FeedIcon, text: t('navigation.feed'), to: 'feed'},
    {Icon: MessagesIcon, text: t('navigation.messages'), to: 'messages'},
    {Icon: PeopleIcon, text: t('navigation.people'), to: 'people'},
    {Icon: NotificationIcon, text: t('navigation.notifications'), to: 'notifications'}
  ];

  if (isBigNavbar === null) {
    return <></>;
  }

  return (
    <>
    {isBigNavbar ? (
      <Sidebar navData={navData} handleOpen={handleOpen} isOpen={isOpen}/>
    ) : (
      <SmallNavbar navData={navData} isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
    )}
    </>
    
  )
}

export default memo(Navbar);