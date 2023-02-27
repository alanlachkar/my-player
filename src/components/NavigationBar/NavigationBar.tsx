// React imports
import { Link } from 'react-router-dom';
// Component imports
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ModeButton from '../ModeButton/ModeButton';
// Utils imports
import myPlayer from '../../assets/my-player.png';
// Css imports
import styles from './NavigationBar.css';

/**
 * Display the top navigation bar giving access to the different pages
 * @returns NavigationBar component
 */
const NavigationBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconAndNav}>
        <Link to="/">
          <img className={styles.icon} height={64} alt="website logo" src={myPlayer} />
        </Link>
        <ButtonGroup variant="text" aria-label="navigation top bar">
          <Button>
            <Link to="/bonus-section">Bonus</Link>
          </Button>
          <Button>
            <Link to="/series">Séries</Link>
          </Button>
          <Button>
            <Link to="/movies">Films</Link>
          </Button>
        </ButtonGroup>
      </div>
      <ModeButton />
    </div>
  );
};

export default NavigationBar;