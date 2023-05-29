import cn from 'classnames';

interface Props {
  text: string;
  disabled?: boolean;
  submit?: boolean;
  onClick?: (e: React.MouseEvent) => void
}

const Button: React.FC<Props> = ({text, disabled = false, submit = false, onClick}) => {
  return (
    <button
      className={cn('bg-background-input py-2 px-10 rounded-md border-2 border-edge transition-color duration-200', {
        'text-edge cursor-default': disabled,
        'hover:bg-edge': !disabled
      })}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {text}
    </button>
  )
}

export default Button;