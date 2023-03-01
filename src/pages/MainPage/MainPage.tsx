// React imports
import { Outlet } from 'react-router-dom';
// Component imports
import NavigationBar from '../../components/NavigationBar/NavigationBar';
// Css imports
import styles from './MainPage.css';

const MainPage = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default MainPage;
