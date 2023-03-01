// React imports
import { Link } from 'react-router-dom';
// Component imports
import Button from '@mui/material/Button';
import ModeButton from '../ModeButton/ModeButton';
// Utils imports
import { NavButton } from 'src/types';
import myPlayer from '../../assets/my-player.png';
// Css imports
import styles from './NavigationBar.css';

const buttons: NavButton[] = [
  { path: 'bonus-section', text: 'Bonus' },
  { path: 'series', text: 'Séries' },
  { path: 'movies', text: 'Films' }
];

/**
 * Display the top navigation bar giving access to the different pages
 * @returns NavigationBar component
 */
const NavigationBar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link to="/">
          <img className={styles.icon} height={64} alt="website logo" src={myPlayer} />
        </Link>
        {buttons.map((button: NavButton) => {
          return (
            <Button variant="text" key={button.text}>
              <Link to={`/${button.path}`}>{button.text}</Link>
            </Button>
          );
        })}
      </nav>
      <ModeButton />
    </header>
  );
};

export default NavigationBar;
