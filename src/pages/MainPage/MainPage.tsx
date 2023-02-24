// React imports
import { Outlet } from 'react-router-dom';
// Component imports
import NavigationBar from '../../components/NavigationBar/NavigationBar';
// Utils imports

const MainPage = (): JSX.Element => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default MainPage;
