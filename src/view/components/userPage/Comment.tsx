import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { useSocketApi } from "../../../hooks/useSocket";
import { UserSmall } from "../../../models/UserSmall";
import formatDate from "../../../utilities/formatDate";

import { ReactComponent as UserIcon} from '../../../assets/user-icon.svg';

import { ReactComponent as LikeIcon} from '../../../assets/like-icon.svg';
import { ReactComponent as DislikeIcon} from '../../../assets/dislike-icon.svg';

import PostButton from "../auth/UI/PostButton";


interface CommentProps {
  author: UserSmall,
  comment: any
  }
  
  const Comment: React.FC<CommentProps> = ({author, comment}) => {
    const { t } = useTranslation();
    const { rateComment } = useSocketApi();
    const { id} = useAppSelector(state => state.profile);
  
    const handleState = ( type: string ) => (e: React.MouseEvent<HTMLButtonElement>) => {
      rateComment({type, ourId: id, postId: comment.id});
    }
  
    const dateTime = new Date(comment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const date = formatDate(comment.date);
    
    let dateString;
  
    switch (date) {
      case 'today':
      case 'yesterday':
        dateString = t(`day.${date}At`);
        break;
      default:
        dateString = date;
    }
  
  
    return (
      <div className='flex gap-2 text-text-rgba/80'>
                <Link
                  to={`/profile/${author.username}`}
                  className='flex gap-2'
                >
                  <div className="rounded-full w-[34px] h-[34px] overflow-hidden">
                    {author.image ? (
                      <img src={author.image} alt=""/>
                    ) : (
                      <UserIcon className='bg-foreground fill-edge p-4 w-[34px] h-[34px] '/>
                    )}
                    </div>
                </Link>
                  <div className="flex flex-col grow">
                      <Link
                        to={`/profile/${author.username}`}
                        className='hover:text-text transition'
                      >
                      {author.username}
                      </Link>
  
                    <p>
                      {comment.text}
                    </p>
  
  
                  <div className="flex justify-between items-center">
                    <span className="text-text-rgba/40 text-xs">
                      {`${dateString}   ${dateTime}`}
                    </span>
                    <div className="flex flex-col">
                      <div className="flex gap-2 mr-2">
                        <PostButton Icon={LikeIcon} text={comment.likeCount} isActive={comment.rated === 'like'} onClick={handleState('like')} isBackground={false} />
                        <PostButton Icon={DislikeIcon} text={comment.dislikeCount} isActive={comment.rated === 'dislike'} onClick={handleState('dislike')} isBackground={false} />
                      </div>
                    </div>
                  </div>
                  </div>
              </div>
    )
  }

  export default Comment;