import { IPost } from "../../../models/IPost"
import { UserSmall } from "../../../models/UserSmall";
import { ReactComponent as UserIcon} from '../../../assets/user-icon.svg';

import { ReactComponent as LikeIcon} from '../../../assets/like-icon.svg';
import { ReactComponent as DislikeIcon} from '../../../assets/dislike-icon.svg';

import { ReactComponent as CommentIcon} from '../../../assets/comment-icon.svg';
import { ReactComponent as DotsOptionsIcon} from '../../../assets/dots-options.svg';

import { ReactComponent as EditIcon} from '../../../assets/edit-icon.svg';
import { ReactComponent as DeleteIcon} from '../../../assets/delete-icon.svg';


import modalsSlice, { actions as modalsActions } from '../../../store/modalsSlice';

import { Link } from "react-router-dom";
import formatDate from "../../../utilities/formatDate";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSocketApi } from "../../../hooks/useSocket";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import PostButton from "../auth/UI/PostButton";
import Comment from "./Comment";
import AddMessageForm from "./AddMessageForm";
import SelectButton from "../primitives/SelectButton";

import {actions as postActions} from '../../../store/postsSlice';
import { removePostAction } from "../../../store/asyncActionCreators";

import {scrollToCoordinates} from '../../../utilities/scroll';

interface Props {
  post: IPost,
  author?: UserSmall,
  page?: string,
  children?: React.ReactNode,
  options?: any,
}

const Post: React.FC<Props> = ({post, author, children, options}) => {
  const { ratePost } = useSocketApi();
  const { id} = useAppSelector(state => state.profile);
  const { activePostId } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();
  const { t } = useTranslation()

  const handleState = ( type: string ) => (e: React.MouseEvent<HTMLButtonElement>) => {
    ratePost({type, ourId: id, postId: post.id});
  }

  const dateTime = new Date(post.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const date = formatDate(post.date);
  
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
    <div className={` bg-foreground flex flex-col ${options?.noBorders? '': 'border-2 border-edge rounded-md'}`}>
      <div className="flex flex-row">
        {author && (
          <div className="flex gap-3 items-center px-4 py-2 ">
            <Link
              to={`/profile/${author.username}`}
              className='flex gap-2 items-center'
            >
                <div className="rounded-full w-[40px] h-[40px] overflow-hidden">
                  {author.image ? (
                    <img src={author.image} alt=""/>
                  ) : (
                    <UserIcon className='bg-foreground fill-edge p-4 w-[48px] h-[48px] '/>
                  )}
                  </div>
                <div className="flex flex-col">
                  <span>{author.username}</span>
                  <span className="text-text-rgba/40 text-xs">
                    {`${dateString}   ${dateTime}`}
                  </span>
                </div>

            </Link>
          </div>
        )}
       {(author?.id === id) && (
         <button className=" ml-auto p-2">
         <SelectButton Icon={DotsOptionsIcon} options={[
           {text: t('actions.edit').toString(), Icon: EditIcon, onClick: (e) => {
            scrollToCoordinates(0, 0)
            dispatch(modalsActions.closeModal());
            dispatch(postActions.setPostFormPostId(post.id))
           }},
           {text: t('actions.delete').toString(), Icon: DeleteIcon, onClick: (e) => {
            dispatch(modalsActions.closeModal());
            dispatch(removePostAction(post.id))
           }}
         ]}/>
         
       </button>
       )}
      </div>
      <div className=" border-t-2 border-text-rgba/10 flex flex-col items-center">
        <div className="px-4 py-2 self-stretch max-w-full whitespace-normal">
            <p className="break-words">{post.text}</p>
          </div>
          {
            post.image && (
              <img src={post.image} alt='' className="p-2 max-h-[400px]" />
            )
          }
      </div>
      <div className="flex  gap-3 py-1 px-2">
          <PostButton Icon={LikeIcon} text={post.likeCount} isActive={post.rated === 'like'} onClick={handleState('like')} />
          <PostButton Icon={DislikeIcon} text={post.dislikeCount} isActive={post.rated === 'dislike'} onClick={handleState('dislike')} />
          <PostButton Icon={CommentIcon}  text={post.commentsCount} isActive={post.id === activePostId} onClick={() => {
            // dispatch(postActions.setActivePost(post.id))
            dispatch(modalsActions.showPost(post.id))
          }} />
      </div>
      {
        children && (
          <div className="border-t-2 border-edge">
            {children}
          </div>
        )
      }
    </div>
  )
}

export default Post;


{/* <div className="border-t-2 border-text-rgba/10 flex flex-col items-stretch pl-6 py-2 text-sm pr-2 gap-1">
          {author && (
            <>
              <Comment author={author} comment={post} />
            </>
          )}
      </div>
      {
        activePostId === post.id && (
          <div className="pb-2 px-2 flex flex-col justify-center gap-2 text-sm">
            <button className="text-edge hover:text-text transition">
              {t('showMore')}
            </button>
            <AddMessageForm onSubmit={(data) => console.log(data)} textPlaceholder={t('writeComment')} />
          </div>
        )
      } */}