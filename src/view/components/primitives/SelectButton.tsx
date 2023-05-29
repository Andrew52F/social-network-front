import { useState } from 'react';

type Option = {
  text: string,
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  onClick: React.MouseEventHandler<HTMLButtonElement>
};


interface SelectProps {
  options: Option[],
  text?: string,
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>,
}

const SelectButton: React.FC<SelectProps> = ({ options, text, Icon }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {
        isOpen && (
          <div
            className='absolute top-0 bottom-0 left-0 right-0 z-4'
            onClick={() => {
              setIsOpen(false);
            }}
          />
        )
      }


    <button onClick={handleButtonClick} className='relative p-1 rounded-full'>
      {text && <span>{ text}</span>}
      {Icon && <Icon className={`fill-text-rgba/30 hover:fill-text-rgba/60 transitions w-[20px] h-[20px] ${isOpen && 'fill-text-rgba/60'}`} />}
      {isOpen && (
        <ul className='absolute right-[-2px] top-[120%] w-auto border-2 border-edge rounded-md bg-foreground flex flex-col'>
          {options.map((option, index) => (
            <li key={index}>
              <button  onClick={option.onClick} className='flex justify-between w-full px-2 py-1 gap-2 hover:bg-edge transition-color duration-200'>
                <span>{option.text}</span>
                {option.Icon&& <option.Icon className="stroke-text w-[20px] h-[20px]"/>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </button>
    </>
  );
}

export default SelectButton;