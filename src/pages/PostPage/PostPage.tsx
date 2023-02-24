// React imports
import { useState, useEffect } from 'react';
// Component imports
import { Post as Post } from '../../components/Post/Post';
// Utils imports
import logo from '../../assets/react.svg';
import { PostInterface } from '../../types';
import PostService from '../../api/post.service';
// Css imports
import styles from './PostPage.css';

export const PostPage = (): JSX.Element => {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    PostService.getAllPosts().then(setPosts);
  }, []);

  return (
    <>
      <img src={logo} height="100" />
      <h2>Posts list :</h2>
      <div className={styles.container}>
        {posts?.map((post: PostInterface) => {
          return <Post key={post.id} title={post.title} body={post.body} id={post.id} />;
        })}
      </div>
    </>
  );
};
