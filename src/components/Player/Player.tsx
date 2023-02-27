// React imports
import React, { useEffect, useRef, useState } from 'react';
// Component imports
import VideoControls from '../VideoControls/VideoControls';
// Utils imports
import RxPlayer from 'rx-player';
import { EVideoState } from '../../utils/enums/enums';
// Css imports
import styles from './Player.css';
import { CircularProgress } from '@mui/material';

/**
 * Interface of Player component
 * rxPlayer         - the rx player
 * onChangeRxPlayer - Function used to update the rx player state from parent
 */
interface PlayerProperties {
  rxPlayer: RxPlayer | null;
  onChangeRxPlayer: (newValue: RxPlayer | null) => void;
}

/**
 * Display the player component with its controls (play/pause, volume, fullscreen...)
 * @param props Properties of Player component
 * @returns Player component
 */
const Player = (props: PlayerProperties) => {
  const { rxPlayer } = props;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [videoState, setVideoState] = useState<EVideoState>(EVideoState.NONE);

  const videoWrapper = useRef<HTMLDivElement | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const player = new RxPlayer({ videoElement: videoElement.current });
    playerWatcher(player, setIsLoaded, setVideoState);
    props.onChangeRxPlayer(player);

    return () => {
      playerStopWatcher(player, setIsLoaded, setVideoState);
    };
  }, []);

  return (
    <div className={styles.videoWrapper} ref={videoWrapper}>
      {videoState === EVideoState.LOADING && (
        <CircularProgress className={styles.videoSpinner} color="success" />
      )}
      <video className={styles.vid} ref={videoElement}></video>
      {rxPlayer && isLoaded && (
        <div className={styles.videoControlsContrainer}>
          <VideoControls
            player={rxPlayer}
            videoWrapper={videoWrapper.current}
            onPlay={() => onPlay(rxPlayer)}
            stopVideo={() => stopVideo(rxPlayer, setIsLoaded)}
            duration={rxPlayer.getVideoDuration()}
          />
        </div>
      )}
    </div>
  );
};
/**
 * Function used to stop the video and hiding the videoControls component
 * @param rxPlayer the rx player
 * @param setIsLoaded Function used to update isLoaded state
 */
function stopVideo(
  rxPlayer: RxPlayer | null,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
): void {
  rxPlayer?.stop();
  setIsLoaded((old) => !old);
}

/**
 * Function used to play/pause the video
 * @param rxPlayer the rx player
 */
function onPlay(rxPlayer: RxPlayer | null): void {
  if (rxPlayer) {
    if (rxPlayer.getPlayerState() === 'PLAYING') {
      rxPlayer.pause();
    } else {
      rxPlayer.play();
    }
  } else {
    console.log(
      '🚀 ~ file: HomePage.tsx:44 ~ onPlay ~ player is not defined to play/pause the video'
    );
  }
}

/**
 * Function gathering all the events' listener and stop them during the unmounting of the component
 * @param rxPlayer the rx player
 * @param setIsLoaded Function used to update isLoaded state
 * @param setVideoState Function used to update videoState state
 */
function playerStopWatcher(
  rxPlayer: RxPlayer,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  setVideoState: React.Dispatch<React.SetStateAction<EVideoState>>
): void {
  rxPlayer.removeEventListener('playerStateChange', (state) =>
    onPlayerStateChange(state, setIsLoaded, setVideoState)
  );
}

/**
 * Function gathering all the events' listener and start them during the mounting of the component
 * @param rxPlayer the rx player
 * @param setIsLoaded Function used to update isLoaded state
 * @param setVideoState Function used to update videoState state
 */
function playerWatcher(
  rxPlayer: RxPlayer,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  setVideoState: React.Dispatch<React.SetStateAction<EVideoState>>
): void {
  console.log('🚀 ~ file: HomePage.tsx:14 ~ useEffect ~ player:', rxPlayer);

  rxPlayer.addEventListener('playerStateChange', (state) =>
    onPlayerStateChange(state, setIsLoaded, setVideoState)
  );
}

/**
 * Function used to display the current video's state
 * @param state the video's state
 * @param setIsLoaded Function used to update isLoaded state
 * @param setVideoState Function used to update videoState state
 */
function onPlayerStateChange(
  state: string,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  setVideoState: React.Dispatch<React.SetStateAction<EVideoState>>
): void {
  if (state === ('STOPPED' || 'LOADING' || 'LOADED' || 'PLAYING' || 'PAUSED')) {
    setVideoState(EVideoState[state]);
  }
  switch (state) {
    case 'STOPPED':
      console.log('STOPPED: No content is/will be playing');
      break;
    case 'LOADING':
      console.log('LOADING: A new content is currently loading');
      break;
    case 'LOADED':
      console.log('LOADED: The new content is loaded and ready to be played');
      setIsLoaded((oldSate) => !oldSate);
      break;
    case 'PLAYING':
      console.log('PLAYING: The content is currently playing');
      break;
    case 'PAUSED':
      console.log('PAUSED: The content is currently paused');
      break;
    case 'BUFFERING':
      console.log('BUFFERING: The content is buffering new data');
      break;
    case 'SEEKING':
      console.log('SEEKING: The content is still seeking, waiting for new data');
      break;
    case 'ENDED':
      console.log('ENDED: The content has reached the end.');
      break;
    case 'RELOADING':
      console.log('RELOADING: The content is currently reloading');
      break;
    default:
      console.log('This is impossible (issue material!).');
      break;
  }
}
export default Player;
