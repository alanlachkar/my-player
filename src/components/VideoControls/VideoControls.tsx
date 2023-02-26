// Component imports
import TimeBar from '../TimeBar/TimeBar';
import PlayButton from '../PlayButton/PlayButton';
import VolumeButton from '../VolumeButton/VolumeButton';
import IconButton from '@mui/material/IconButton/IconButton';
// Utils imports
import RxPlayer from 'rx-player';
import Stop from '@mui/icons-material/Stop';
import FullScreen from '@mui/icons-material/FullScreen';
//Css imports
import styles from './VideoControls.css';

/**
 * Interface of VideoControls component
 * onPlay     - Play/Pause the rxPlayer
 * duration   - Duration of the selected video
 * stopVideo  - Stop the video
 * player     - The rxPlayer
 */
interface VideoControlsProperties {
  onPlay: () => void;
  duration: number;
  stopVideo: () => void;
  player: RxPlayer;
}

/**
 * Display the video's controllers (play/pause, stop, mute...)
 * @param props Properties of the component
 * @returns The video controls component
 */
const VideoControls = (props: VideoControlsProperties): JSX.Element => {
  const { player } = props;

  return (
    <div className={styles.container}>
      <PlayButton onPlay={props.onPlay} />
      <IconButton onClick={props.stopVideo}>
        <Stop className={styles.icon} />
      </IconButton>
      <TimeBar duration={props.duration} player={player} />
      <VolumeButton player={player} />
      <IconButton
        onClick={() => {
          console.log('click on Stop button');
        }}
      >
        <FullScreen className={styles.icon} />
      </IconButton>
    </div>
  );
};

export default VideoControls;
