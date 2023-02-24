// React imports
import { createRoot } from 'react-dom/client';
// Component imports
import { PostPage } from './pages/PostPage/PostPage';

const App = (): JSX.Element => {
  return <PostPage />;
};

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(<App />);
