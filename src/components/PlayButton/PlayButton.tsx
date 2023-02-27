// React imports
import { useState } from 'react';
// Component imports
import { IconButton } from '@mui/material';
// Utils imports
import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
// Css imports
import styles from './PlayButton.css';

/**
 * Interface of PlayButton component
 * onPlay - Play/Pause the rxPlayer
 */
interface PlayButtonProperties {
  onPlay: () => void;
}

/**
 * Display Play/Pause button
 * @param props Interface of the component
 * @returns Play/Pause component
 */
const PlayButton = (props: PlayButtonProperties): JSX.Element => {
  const [isPlayed, setIsPlayed] = useState(false);

  return (
    <IconButton
      onClick={() => {
        props.onPlay();
        setIsPlayed((old) => !old);
      }}
    >
      {isPlayed ? (
        <Pause className={styles.icon} />
      ) : (
        <PlayArrow className={styles.icon} />
      )}
    </IconButton>
  );
};

export default PlayButton;
