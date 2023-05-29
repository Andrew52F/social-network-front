import { NavLink } from 'react-router-dom';
import { ReactElement, ReactNode, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from 'react-i18next';
import {ReactComponent as BurgerIcon} from '../../../../assets/burger-icon.svg';
import SettingsMenu from './SettingsMenu';

import { NavElementData } from './index';


interface NavElementProps extends NavElementData {
  isOpen: boolean;
}

const NavElement: React.FC<NavElementProps> = ({ Icon, text, to, isOpen}) => {
  const elementVariants = {
    open: {
      height: 'auto', opacity: 1,
    },
    closed: {
      height: 0, opacity: 0,
    }
  }
  return (
    <NavLink
      to={to}
      className='flex gap-4 h-[40px] nav-opacity items-center'
    >
      <div>
        <Icon className={`w-[40px] h-[40px] `} />
      </div>
    <AnimatePresence >
    {isOpen && (
    <motion.div
      className={` text-lg grow overflow-hidden whitespace-nowrap`}
      initial={!isOpen ? 'closed': 'open'}
      animate='open'
      exit='closed'
      variants={elementVariants}
      transition={{
        duration: 0.3
      }}
    >
      {text}
    </motion.div>
  )}
  </AnimatePresence>
    </NavLink>
  )
}





interface SidebarProps {
  handleOpen: () => void;
  isOpen: boolean;
  navData: NavElementData[];
}

const Sidebar: React.FC<SidebarProps> = ({handleOpen, isOpen, navData}) => {
  const containerVariants = {
    closed: {
      width: 74,
      transition: {type: 'tween', duration: 0.5, ease: 'easeInOut',}
    },
    open: {
      width: 220,
      transition: {type: 'tween', duration: 0.5, ease: 'easeInOut'}
    },
  }
  return (
    <motion.aside 
      initial={!isOpen ? 'closed' : 'open'}
      animate={isOpen ? 'open' : 'closed'}
      variants={containerVariants}
      className={`flex items-stretch flex-col justify-between rounded-lg p-[15px] bg-dark-blue  transition-width duration-200 absolute top-0 bottom-0 left-0 m-2 z-20`}
    >
      <button
      onClick={handleOpen}
      >
        <BurgerIcon className={`w-[40px] h-[40px] icon-stroke-color ${isOpen && 'opacity-50'} transition-opacity duration-200`} />
      </button>
      <nav className='flex basis-[300px] flex-col gap-5'>
        {navData.map(({Icon, text, to}) => (
          <NavElement Icon={Icon} text={text} to={to} isOpen={isOpen} key={text} />
        ))}
      </nav>
      <div className='border-t-2 border-text-inverted-rgba/10'>
        <SettingsMenu isOpen={isOpen} />
      </div>
    </motion.aside>
  )
}

export default Sidebar;