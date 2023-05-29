
interface Props {
  children: React.ReactElement[] | React.ReactElement;
  classNames?: string;
};

const AuthContainer: React.FC<Props> = ({ children, classNames}) => {
  return (
    <div className='h-full sm:flex justify-center items-center bg-background font-opensans p-4'>
      <div className={`w-full sm:max-w-[800px] sm:min-w-[680px] sm:min-h-[450px] sm:w-4/5 bg-foreground sm:flex rounded-md border-2 border-edge p-8 sm:p-11 gap-10 ${classNames}`}>
        {children}
      </div>
    </div>
  )
}
export default AuthContainer;