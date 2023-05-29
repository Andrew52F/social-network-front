
interface PostButtonProps {
  Icon: any,
  text?: string | number,
  isActive?: boolean,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  isBackground?: boolean,
}

const PostButton: React.FC<PostButtonProps> = ({Icon, text, isActive, onClick, isBackground = true}) => {
  return (
    <button className={`flex items-center rounded-xl gap-1 text-sm text-text-rgba/60 ${isBackground && 'bg-text-rgba/10 p-2'}`} onClick={onClick}>
      <Icon className={`w-[20px] h-[20px] ${isActive ? 'fill-accent stroke-text-rgba/80' : 'fill-none stroke-text-rgba/60'} transition`} />
    {text && (<span>{text}</span>)}
  </button>
  )
}

export default PostButton;