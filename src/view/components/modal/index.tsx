import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actions as modalsActions } from '../../../store/modalsSlice';
import { ReactComponent as CrossIcon } from '../../../assets/cross-icon.svg';
import PostModal from './PostModal';

interface Props {

}

const  Modal: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { state, data} = useAppSelector(state => state.modals)
  const headerState = useState<string>('');
  const handleClose = (e: React.MouseEvent) => {
    dispatch(modalsActions.closeModal())
  }

  let ModelContent;

  switch(state) {
    case 'post': 
      ModelContent = (<PostModal headerState={headerState} data={data} />)
      break;
  }

  return (
    <>
    <div className={`absolute top-0 bottom-0 left-0 right-0 z-10 bg-black bg-opacity-80 transition-color duration-500 pb-20 sm:pb-0 sm:pl-[70px] ${!state && 'hidden'}`}>
    {/* mx-3  pb-20 sm:pb-0 sm:mx-auto max-w-[768px] flex flex-col h-full */}
      <div 
        className={` h-full flex items-center flex-col p-4`}
        onClick={handleClose}
      >
        <div
          className='bg-foreground rounded-md border-2 border-edge flex flex-col w-full h-full sm:max-w-[700px] '
          onClick={(e) => e.stopPropagation()}
        >
          <div className='h-[50px] border-b-2 border-edge flex font-semibold justify-center items-center text-lg relative'>
            <span>{headerState[0]}</span>
            <div className='absolute right-0 top-0 bottom-0 p-2'>
              <button 
                onClick={handleClose}
              >
                <CrossIcon className='fill-edge w-[30px] h-[30px] hover:fill-text' />
              </button>
            </div>
          </div>
          {ModelContent}
        </div>
      
      </div>
    </div>
    </>
  );
}

export default Modal;

