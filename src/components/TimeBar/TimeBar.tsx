// React imports
import { useEffect, useState } from 'react';
// Component imports
import { Slider, Typography } from '@mui/material';
// Utils imports
import RxPlayer from 'rx-player';
import { IPositionUpdate } from 'rx-player/dist/_esm5.processed/public_types';
// Css imports
import styles from './TimeBar.css';

/**
 * Interface of TimeBar component
 * duration - Duration of the selected video
 * player   - The rxPlayer
 */
interface TimeBarProperties {
  duration: number;
  player: RxPlayer;
}

/**
 * Display the progress bar with the time that has passed and the time left
 * @param props Properties of the component
 * @returns The TimeBar component
 */
const TimeBar = (props: TimeBarProperties): JSX.Element => {
  const { duration, player } = props;
  const [position, setPosition] = useState(0);
  useEffect(() => {
    player.addEventListener('positionUpdate', (evt: IPositionUpdate) => {
      setPosition(evt.position);
    });

    return () => {
      player.removeEventListener('positionUpdate', (evt: IPositionUpdate) =>
        console.log('remove listener of the positionUpdate content ', evt)
      );
    };
  }, []);

  return (
    <>
      <Typography className={styles.countingText}>{formatDuration(position)}</Typography>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={(_: Event, value: number | number[]) => player.seekTo(value as number)}
      />
      <Typography className={styles.countingText}>
        -{formatDuration(duration - position)}
      </Typography>
    </>
  );
};

/**
 * Function used to format the duration in minutes:seconds
 * @param value The value to format
 * @returns The formatted time left
 */
function formatDuration(value: number) {
  const minute = Math.floor(value / 60);
  const secondLeft = Math.round(value - minute * 60);
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}

export default TimeBar;
