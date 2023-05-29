import { NavLink } from 'react-router-dom';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { motion, AnimatePresence } from "framer-motion"

import {ReactComponent as SettingsIcon} from '../../../../assets/settings-icon.svg';

import { NavElementData } from ".";
import SettingsMenu from './SettingsMenu';
import { useTranslation } from 'react-i18next';

interface SmallNavbarProps {
  navData: NavElementData[];
  isSettingsOpen: boolean;
  setIsSettingsOpen: (value: boolean) => void;
  isOpen?: boolean;
}

interface SmallNavElementProps extends NavElementData {
  as?: any;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const SmallNavElement: React.FC<SmallNavElementProps> = ({ Icon, text, to, as = NavLink, className, onClick }) => {
  const As = as;
  return (
    <>
      <As
        to={to}
        className={`flex gap-1 h-full nav-opacity flex-col items-center cursor-pointer basis-[92px] ${className}`}
        onClick={onClick}
      >
        <div>
          <Icon className={`w-[40px] h-[40px] fill-text-inverted-rgba/80`} />
        </div>

        <span className='whitespace-nowrap'>{text}</span>
      </As>
    </>
  )
}

const SmallNavbar: React.FC<SmallNavbarProps> = ({navData, isSettingsOpen, setIsSettingsOpen}) => {
  const { t } = useTranslation()

  const variants = {
    open: {
      height: 'auto', opacity: 1,
    },
    closed: {
      height: 0, opacity: 0,
    }
  }

  return (
    <>
      {isSettingsOpen && (<div  className='w-full h-full absolute  top-0 bottom-0 z-4' onClick={() => setIsSettingsOpen(false)} />)}
      <div className=' absolute bottom-0 right-0 left-0 px-2 pb-2 flex flex-col justify-end z-3'>
      <AnimatePresence>
        {
          isSettingsOpen && (
            <>
              <motion.div 
                className='w-[100%] bg-foreground rounded-md border-2 border-edge mb-2 py-2 text-lg'
                initial={isSettingsOpen ? 'open': 'closed'}
                animate={'open'}
                exit='closed'
                variants={variants}
                transition={{
                  duration: 0.5
                }}
              >
                <div className=' text-center text-text-rgba/60 mb-2'>{t('navigation.settings')}</div>
                <SettingsMenu isOpen={true} invertedTextColor={true}/>
              </motion.div>
            </>
          )
        }
      </AnimatePresence>
    
      <nav className=' bg-dark-blue  rounded-lg w-[100%] flex justify-evenly p-[10px] z-20 text-xs'>
        {navData.map(({Icon, text, to}) => (
          <SmallNavElement Icon={Icon} text={text} to={to} key={text} />
        ))}
        <SmallNavElement 
          Icon={SettingsIcon} 
          text={t('navigation.settings')} 
          to={'settings'} 
          as={'div'} 
          className={isSettingsOpen ? 'active' : ''}
          onClick = {() => setIsSettingsOpen(!isSettingsOpen)}
        />
      </nav>
    </div>
    </>
    
  )
}

export default SmallNavbar;