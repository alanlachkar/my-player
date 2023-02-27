// React imports
import { useState } from 'react';
// Component imports
import { IconButton, Slider } from '@mui/material';
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
  const [volumeValue, setVolumeValue] = useState<number>(100);

  const handleChangeVolume = (_: Event, newValue: number | number[]) => {
    setVolumeValue(newValue as number);
    player.setVolume((newValue as number) / 100);
    setIsVolumeOn((newValue as number) !== 0);
  };

  const handleClickVolume = (): void => {
    player.isMute() ? player.unMute() : player.mute();
    setIsVolumeOn((old) => !old);
  };

  return (
    <>
      <IconButton
        onClick={(_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
          handleClickVolume()
        }
      >
        {isVolumeOn ? (
          <VolumeUp className={styles.icon} />
        ) : (
          <VolumeOff className={styles.icon} />
        )}
      </IconButton>
      <div className={styles.sliderContainer}>
        <Slider
          size="small"
          aria-label="Volume"
          value={volumeValue}
          onChange={handleChangeVolume}
          valueLabelDisplay="auto"
        />
      </div>
    </>
  );
};

export default VolumeButton;
