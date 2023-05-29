import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getUserProfileAction, getUserFriendsAction, removeFriendAction, getUsersPostsAction, createPostAction, updatePostAction } from '../../store/asyncActionCreators';

import { userFriendsSelectors } from '../../store/userProfileSlice';
import { friendsSelectors } from '../../store/profileSlice';
import { postsSelectors, sortedPostsSelector, postsIds, usersSelectors } from '../../store/postsSlice';
import {actions as postActions} from '../../store/postsSlice';

import { useTranslation } from 'react-i18next';


import ProfileDisplay from '../components/userPage/ProfileDisplay';
import AddPostForm from '../components/userPage/AddPostForm';
import List from '../components/userPage/List';
import InteractionButton from '../components/userPage/InteractionButton';

import {ReactComponent as AddFriendIcon} from '../../assets/add-friend-icon.svg';
import {ReactComponent as FollowIcon} from '../../assets/follow-icon.svg';
import {ReactComponent as EditUserIcon} from '../../assets/edit-user-icon.svg';
import {ReactComponent as MessagesIcon} from '../../assets/messages-icon.svg';
import {ReactComponent as AddPageIcon} from '../../assets/add-page-icon.svg';
import { useSocketApi } from '../../hooks/useSocket';

import Modal from '../components/modal';

import Button from '../components/auth/UI/Button';
import Post from '../components/userPage/Post';
import MainContainer from '../components/main/MainContainer';

const UserPage: React.FC = () => {
  const { inviteFriend, trackPosts} = useSocketApi();
  const { username } = useParams();
  const { t } = useTranslation(); 
  const dispatch = useAppDispatch()
  const { username: ourUsername, id: ourId } = useAppSelector(state => state.profile);
  const { profile } = useAppSelector(state => state.userProfile);
  const { id:userId } = useAppSelector(state => state.userProfile.profile)
  const postFormPostId =  useAppSelector(state => state.posts.postFormPostId);


  const friends = useAppSelector(userFriendsSelectors.selectAll);
  const ourFriends = useAppSelector(friendsSelectors.selectAll);
  const onRemoveFriend = (username: string) => {
    dispatch(removeFriendAction(username))
  }

  const postIds = useAppSelector(postsIds);

  const posts = useAppSelector(sortedPostsSelector);
  const users = useAppSelector(usersSelectors.selectEntities)
  console.log('users entries: ', users)

  useEffect(() => {
    if (username) {
      dispatch(getUserProfileAction(username));
      dispatch(getUserFriendsAction(username));
    }
  }, [username, dispatch])

  const [dozen, setDozen] = useState<number>(1);

  useEffect(() => {
    if (username) {
      console.log('dozen', dozen);
      dispatch(getUsersPostsAction({username, dozen}));
    }
  }, [username, dispatch, dozen])

  useEffect(() => {
    if (postIds) {
      trackPosts(postIds);
    }
  }, [postIds, trackPosts])


  const isFriend = ourFriends.some(friend => friend.username === username);

  return (
      <div>
        <div className='flex flex-col sm:flex-row  w-full items-center gap-4 pt-5 mb-3'>
          <ProfileDisplay  />
          <div className='flex sm:ml-auto  mt-auto mb-7 gap-5 sm:gap-2'>

            {username === ourUsername ? (
              <>
                <InteractionButton Icon={AddPageIcon} text={'page'} onClick={(e) => console.log('pressed')} />
                <InteractionButton Icon={EditUserIcon} text={'edit'} onClick={(e) => console.log('pressed')} />
              </>
            ) : (
              <>
                <InteractionButton Icon={FollowIcon} text={'follow'} onClick={(e) => console.log('pressed')} />
                <InteractionButton Icon={MessagesIcon} text={'text'} onClick={(e) => console.log('pressed')} />
                {
                  !isFriend && (
                    <InteractionButton Icon={AddFriendIcon} text={'invite'} onClick={(e) => userId && inviteFriend({ourId, userId})} />
                  )
                }
              </>
            )}
          </div>
        </div>
        <div className='flex gap-2 flex-col-reverse sm:flex-row justify-between  max-w-full'>
          <div className=' flex flex-col gap-2 w-full sm:max-w-[calc(100%-200px)]'>
            {
              username === ourUsername && (
                <AddPostForm 
                  onAdd={values => dispatch(createPostAction(values))} 
                  onUpdate={(postId, values) => dispatch(updatePostAction({postId, data: values}))}
                  onClear={() => dispatch(postActions.setPostFormPostId(null))}
                />
              )
            }
            {
              posts.map(post => {
                const author = users[post.author];
                // const page = post.page && pages[post.page]
                return (
                  <Post post={post} author={author} key={post.id}/>
                )
              })
            }



            <div className='flex justify-center mt-2'>
              <button 
                className="text-edge hover:text-text transition"
                onClick={() => setDozen(dozen+1)}
              >
                {t('showMore')}
              </button>
            </div>
          </div>
          <div className='sm:min-w-[200px] shrink-0'>
            <List data={friends} ourData={ourFriends} heading={t('navigation.friends')} onAdd={() => ''} onRemove={onRemoveFriend} to='/profile' ourId={ourId || ''} />
          </div>
        </div>
      </div>

    
  )
}

export default UserPage;
