import React from 'react';
import Modal from '../modal';



interface Props {
  children: React.ReactNode;
}

const MainContainer: React.FC<Props> = ({ children }) => (
  <>
  <Modal />
  <div className='min-h-full flex sm:ml-[84px] p-2 '>
    <div className='w-full'>
      <div className='mx-3  pb-20 sm:pb-0 sm:mx-auto max-w-[768px] flex flex-col h-full'>
        { children }
      </div>
    </div>
  </div>
  </>
);

export default MainContainer;
