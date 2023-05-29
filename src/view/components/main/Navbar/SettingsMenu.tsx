import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useThemeContext } from "../../../../hooks/useTheme";
import { useTranslation } from "react-i18next";
import { logoutAction } from "../../../../store/asyncActionCreators"; 

import {ReactComponent as LightThemeIcon} from '../../../../assets/light-theme-icon.svg';
import {ReactComponent as ThemeIcon} from '../../../../assets/theme-icon.svg';
import {ReactComponent as SystemThemeIcon} from '../../../../assets/system-theme-icon.svg';
import {ReactComponent as LanguageIcon} from '../../../../assets/language-icon.svg';
import {ReactComponent as RuLanguageIcon} from '../../../../assets/ru-language-icon.svg';
import {ReactComponent as EnLanguageIcon} from '../../../../assets/en-language-icon.svg';
import {ReactComponent as LogoutIcon} from '../../../../assets/logout-icon.svg';


interface SettingsProps {
  isOpen: boolean;
  invertedTextColor?: boolean;
  noLogout?: boolean
}

const SettingsMenu: React.FC<SettingsProps> = ({isOpen, invertedTextColor, noLogout = false}) => {
  const { themes, theme, setTheme } = useThemeContext()
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const themesObject = themes.reduce((acc: any, theme: any) => {
    acc[theme] = t(`theme.${theme}`)
    return acc;
  }, {})

  const languageActive: any = i18n.resolvedLanguage;
  const languageText: any = {
    ru: 'Русский',
    en: 'English'
  };
  const themeIcons = {
    light: LightThemeIcon,
    dark: ThemeIcon,
    system: SystemThemeIcon
  }
  const languageIcon: any = {
    ru: RuLanguageIcon,
    en: EnLanguageIcon
  }

  interface NavElementProps {
    Icon:  any;
    children: React.ReactElement | string;
    onClick?: () => void;
    isOpen?: boolean;
    className?: string;
  }

  const NavElement: React.FC<NavElementProps> = ({ Icon, onClick, children, className }) => {
    
    return (
      <div 
        className={`flex gap-4 items-center cursor-pointer transition-opacity duration-200 opacity-50 hover:opacity-80  overflow-hidden ${className}`}
        onClick={onClick}
      >
        <div className="flex justify-center items-center p-[5px]">
          <Icon className={`w-[30px] h-[30px] ${invertedTextColor ? 'fill-text-rgba/80' : 'fill-text-inverted-rgba/80'}`} />
        </div>
        <div className={`${!isOpen && 'hidden'} ${invertedTextColor ? 'text-text-rgba/80' : 'text-text-inverted-rgba/80'}`}>
          {children}
        </div>
      </div>
    )
  }

  interface NavButtonProps {
    Icon: any;
    text: string;
    variants?: any;
    active?: string;
    onClick: (value?: any) => void;
  }

  const NavButton: React.FC<NavButtonProps> = ({Icon, text, onClick}) => {
    return (
        <NavElement Icon={Icon} onClick ={onClick} isOpen={isOpen} >
          {text}
      </NavElement>
    )
  }
  const NavSelector: React.FC<NavButtonProps> = ({Icon, text, variants, active, onClick}) => {
    const [isOpenSelector, setIsOpenSelector] = useState<boolean>();
    const handleClickOpen = () => {
      setIsOpenSelector(!isOpenSelector)
    }
    const vars = Object.keys(variants);
    const handleClickClosed = () => {
      if (active) {
        const activeIndex = vars.indexOf(active)
        if (activeIndex === vars.length-1) {
          onClick(vars[0])
          return;
        }
        onClick(vars[activeIndex+1])
      }
    }
    const handleClick = isOpen ? handleClickOpen : handleClickClosed;
    return (
      <>
        {
          isOpenSelector && (
            <div
              className='absolute top-0 bottom-0 left-0 right-0 z-4'
              onClick={() => {
                setIsOpenSelector(false);
              }}
            />
          )
        }
        <div className='relative'>
          <NavElement Icon={Icon} onClick={handleClick} className={isOpenSelector ? 'opacity-80' : ''}>
            <>
              <div>
                {text}
              </div>
              {isOpenSelector && (
                <div className='absolute  bottom-[100%] left-0 right-0 bg-foreground border-2 border-edge rounded-md flex flex-col items-center gap-1 p-1 z-5 text-text'>
                  {Object.entries(variants).map(([key, value]: any) => (
                    <div 
                      key={key} 
                      className='w-full rounded-md py-1 px-2 hover:bg-edge transition-color duration-200'
                      onClick={() => onClick(key)}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              )}
            </>
        </NavElement>
        </div>
      </>
    )
  }

  return (
    <div className="w-full">
      <NavSelector Icon={languageIcon[languageActive]} text={languageText[languageActive]} variants={languageText} active={languageActive} onClick={(lng: string) => i18n.changeLanguage(lng)} />
      <NavSelector Icon={themeIcons[theme]} text={t(`theme.${theme}`)} variants={themesObject} active={theme} onClick={(nextTheme) => setTheme(nextTheme)} />
      {
        !noLogout && (
          <NavButton Icon={LogoutIcon} text={t('actions.logout')} onClick={() => dispatch(logoutAction())} />
        )
      }
    </div>
  )
}

export default SettingsMenu;