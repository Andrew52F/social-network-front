import { io } from "socket.io-client";
import { API_URL } from "./http";
import { store } from "./store";
import { actions as profileActions } from "./store/profileSlice";
import { actions as postsActions} from './store/postsSlice'; 
const initSocket = (userId: string) => {

  const socket = io(API_URL, {
    query: { userId}
  });
  socket.on('connect', () => {
    console.log('Connected to server');
  });
  socket.on('error', (payload) => {
    console.log('Error: ', payload);
  })


  //notifications
  const getNotifications = (userId: string, callback?: (any: any) => void) => {
    socket.emit('getNotifications', userId, callback);
  }

  socket.on('getNotifications', (payload) => {
    store.dispatch(profileActions.getNotifications(payload))
  })
  socket.on('newNotification', (payload) => {
    store.dispatch(profileActions.addNotification(payload))
    console.log('New notification: ', payload);
  })
  const removeNotification = (id: string, callback?: (any: any) => void) => {
    socket.emit('removeNotification', id, callback);
    store.dispatch(profileActions.removeNotification(id))
  }
  socket.on('removeNotification', (payload) => {
    store.dispatch(profileActions.removeNotification(payload))
    console.log('Deleted notification: ', payload)
  })

  //friends
  const getFriends = (username: string, callback?: (any: any) => void) => {
    socket.emit('getFriends', username, callback);
  }
  socket.on('getFriends', (payload) => {
    store.dispatch(profileActions.getFriends(payload))
  })

  const inviteFriend = ({ourId, userId}: {ourId: string, userId: string}, callback?: (any: any) => void) => {
    console.log('works')
    socket.emit('inviteFriend', {ourId, userId}, callback);
  }

  const acceptFriend = ({ourId, userId, notificationId}: {ourId: string, userId: string, notificationId: string}, callback?: (any: any) => void) => {
    socket.emit('acceptFriend', {ourId, userId, notificationId}, callback);
  }

  socket.on('acceptFriend', (payload) => {
    store.dispatch(profileActions.addFriend(payload))
  })

  const declineFriend = ({ourId, userId, notificationId}: {ourId: string, userId: string, notificationId: string}, callback?: (any: any) => void) => {
    socket.emit('declineFriend', {ourId, userId, notificationId}, callback);
  }

  const removeFriend = ({ourId, userId}: {ourId: string, userId: string}, callback?: (any: any) => void) => {
    socket.emit('removeFriend', {ourId, userId}, callback);
  }
  socket.on('removeFriend', (payload) => {
    store.dispatch(profileActions.removeFriend(payload.id))
  })

  // posts
  const trackPosts = (postIds: string[], callback?: (any: any) => void) => {
    socket.emit('trackPosts', postIds, callback);
  }
  socket.on('trackPosts', (payload) => {
    
  })
  const ratePost = ({ourId, postId, type = 'like'}: {ourId: string, postId: string, type: 'like' | 'dislike'}, callback?: (any: any) => void)  => {
    socket.emit('ratePost', {ourId, postId, type}, callback);
  }
  socket.on('ratePost', (payload) => {
    store.dispatch(postsActions.updatePost(payload))
  })





  return {
    //notifications
    getNotifications,
    removeNotification,

    //friends
    getFriends,
    inviteFriend,
    acceptFriend,
    declineFriend,
    removeFriend,

    //posts
    trackPosts,
    ratePost,
  }
}

export default initSocket;