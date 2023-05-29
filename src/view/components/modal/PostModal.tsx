import { useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import Post from "../userPage/Post";
import { postsSelectors, usersSelectors } from "../../../store/postsSlice";
import AddMessageForm from "../userPage/AddMessageForm";
import { useTranslation } from "react-i18next";

interface Props {
  headerState: [string, (text: string) => void],
  data: any;
}


const PostModal: React.FC<Props> = ({headerState, data}) => {
  const {t} = useTranslation();
  useEffect(() => {
    headerState[1]('Post')
  }, [headerState])

  const {post, author} = useAppSelector(state => {
    const post = data.id ? postsSelectors.selectById(state, data.id) : undefined;
    const author = post ? usersSelectors.selectById(state, post.author) : undefined;
    return { post, author}
  });

  
  return (
    < >
      {post && (
         <>
          <Post post={post} author={author} options={{noBorders: true}}/>
          <div className="grow"></div>
          <div className="p-2">
            <AddMessageForm onSubmit={(data) => console.log(data)} textPlaceholder={t('writeComment')} />
          </div>
         </>
      )}
    </>
  )
}

export default PostModal;