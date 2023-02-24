// Utils imports
import { PostInterface } from '../../types';
// Css imports
import styles from './Post.css';

const POST_ID = 'postId';
const BODY_ID = 'bodyId';

interface PostProps extends Partial<PostInterface> {}

export const Post = (props: PostProps): JSX.Element => {
  const { title, body, id } = props;
  return (
    <div id={`${POST_ID}${id}`} className={styles.container}>
      <h1>{title ? title : ''} !</h1>
      <h2>Sum {sumFunction(1, 2)}</h2>
      <p data-testid={`${BODY_ID}${id}`}>{body ? body : ''}</p>
    </div>
  );
};

export const sumFunction = (a: number, b: number): number => a + b;
