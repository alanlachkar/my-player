import TimeBar from '../TimeBar/TimeBar';
import PlayButton from '../PlayButton/PlayButton';
import FullScreen from '@mui/icons-material/FullScreen';
import IconButton from '@mui/material/IconButton/IconButton';
import VolumeButton from '../VolumeButton/VolumeButton';
import Stop from '@mui/icons-material/Stop';
import RxPlayer from 'rx-player';

interface VideoControlsProperties {
  onPlay: () => void;
  duration: number;
  stopVideo: () => void;
  player: RxPlayer;
}

const VideoControls = (props: VideoControlsProperties): JSX.Element => {
  const { player } = props;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 98%, rgba(0,0,0,0.15) 100%)'
      }}
    >
      <PlayButton onPlay={props.onPlay} />
      <IconButton onClick={props.stopVideo} style={{ color: '#ddd' }}>
        <Stop />
      </IconButton>
      <TimeBar duration={props.duration} player={player} />
      <VolumeButton player={player} />
      <IconButton
        onClick={() => {
          console.log('click on Stop button');
        }}
      >
        <FullScreen style={{ color: '#ddd' }} />
      </IconButton>
    </div>
  );
};

export default VideoControls;
