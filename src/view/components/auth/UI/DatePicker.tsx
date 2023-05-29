
import React from 'react';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Button from './Button';


interface Props {
  handleChange: (name: string, value: any) => void;
  show: boolean;
  setShow: (value: boolean) => void;
  name: string;
}

const  DatePicker: React.FC<Props> = ({ handleChange, show, setShow, name }) => {
  const [selected, setSelected] = React.useState<Date>();
  const handleButtonClick = () => {
    console.log('Selected: ', selected)
    handleChange(name, selected);
    setShow(false)
  }



  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
  return (
    <>
      <div 
        className={`absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center flex-col bg-black bg-opacity-50 transition-color duration-500 z-50 ${!show && 'hidden'}`}
        onClick={() => {
          setShow(false);
        }}
      >
        <div
          className='bg-foreground rounded-md border-2 border-edge flex flex-col justify-center p-3'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={footer}
          />
          <Button text='Choose'  onClick={handleButtonClick}/>
        </div>
      </div>
    </>
  );
}

export default DatePicker;

