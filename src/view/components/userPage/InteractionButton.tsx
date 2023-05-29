
interface Props {
  Icon: any,
  text: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const InteractionButton: React.FC<Props> = ({Icon, text, onClick}) => {
  return (
    <button onClick={onClick} className='flex flex-col gap-2 items-center interaction-btn relative bg-foreground hover:bg-edge rounded-full p-2 transition border-[2px] border-edge'>
      <Icon className='w-[30px] h-[30px] fill-text-rgba/70' />
  {/* <span className="text-edge transition">{text}</span> */}
  <div className=" hidden absolute top-[110%] transition">
    <span className=" text-text-rgba/70">{text}</span>
  </div>
</button>
  )
}

export default InteractionButton;