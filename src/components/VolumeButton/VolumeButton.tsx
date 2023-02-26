// React imports
import { useState } from 'react';
// Component imports
import { IconButton } from '@mui/material';
// Utils imports
import RxPlayer from 'rx-player';
import { VolumeUp, VolumeOff } from '@mui/icons-material';
//Css imports
import styles from './VolumeButton.css';

/**
 * Interface of VolumeButton component
 * player     - The rxPlayer
 */
interface VolumeButtonProperties {
  player: RxPlayer;
}

/**
 * Diplay the icon of the current volume (mute/unmute)
 * @param props Properties of the component
 * @returns The volume button component
 */
const VolumeButton = (props: VolumeButtonProperties): JSX.Element => {
  const { player } = props;
  const [isVolumeOn, setIsVolumeOn] = useState(true);

  return (
    <>
      <IconButton
        onClick={() => {
          player.isMute() ? player.unMute() : player.mute();
          setIsVolumeOn((old) => !old);
          console.log('click on Volume button');
        }}
      >
        {isVolumeOn ? (
          <VolumeUp className={styles.icon} />
        ) : (
          <VolumeOff className={styles.icon} />
        )}
      </IconButton>
    </>
  );
};

export default VolumeButton;
