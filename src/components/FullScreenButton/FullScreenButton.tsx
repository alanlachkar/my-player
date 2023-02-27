// React imports
import { useState } from 'react';
// Component imports
import { IconButton } from '@mui/material';
import { FullscreenExit, Fullscreen } from '@mui/icons-material';
// Css imports
import styles from './FullScreenButton.css';

/**
 * Interface of the FullScreenButton component
 * videoWrapper - div containing the video tag
 */
interface FullScreenProperties {
  videoWrapper: HTMLDivElement | null;
}

/**
 * Display fullscreen icon
 * @param props properties of the component
 * @returns FullScreenButton component
 */
const FullScreenButton = (props: FullScreenProperties) => {
  const [isInFullScreen, setIsInFullScreen] = useState<boolean>(false);
  return (
    <IconButton
      onClick={() => {
        isInFullScreen ? exitFullScreen() : goToFullScreen(props.videoWrapper);
        setIsInFullScreen((old) => !old);
      }}
    >
      {isInFullScreen ? (
        <FullscreenExit className={styles.icon} />
      ) : (
        <Fullscreen className={styles.icon} />
      )}
    </IconButton>
  );
};

/**
 * Function used to exit to full screen
 */
const exitFullScreen = (): void => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

/**
 * Function used to go to the full screen
 * @param videoWrapper div containing the video tag
 */
const goToFullScreen = (videoWrapper: HTMLDivElement | null): void => {
  if (!!!document.fullscreenElement) {
    if (videoWrapper && videoWrapper.requestFullscreen) {
      videoWrapper.requestFullscreen();
    }
  }
};

export default FullScreenButton;
