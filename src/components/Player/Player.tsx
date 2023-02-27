import React, { useEffect, useRef, useState } from 'react';
import RxPlayer from 'rx-player';
import VideoControls from '../VideoControls/VideoControls';
import styles from './Player.css';

interface PlayerProperties {
  rxPlayer: RxPlayer | null;
  onChangeRxPlayer: (newValue: RxPlayer | null) => void;
}

const Player = (props: PlayerProperties) => {
  const { rxPlayer } = props;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const videoWrapper = useRef<HTMLDivElement | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const player = new RxPlayer({ videoElement: videoElement.current });
    playerWatcher(player, setIsLoaded);
    props.onChangeRxPlayer(player);

    return () => {
      playerStopWatcher(player, setIsLoaded);
    };
  }, []);

  return (
    <div className={styles.videoWrapper} ref={videoWrapper}>
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
) {
  rxPlayer?.stop();
  setIsLoaded((old) => !old);
}

/**
 * Function used to play/pause the video
 * @param rxPlayer the rx player
 */
function onPlay(rxPlayer: RxPlayer | null) {
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
 */
function playerStopWatcher(
  rxPlayer: RxPlayer,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
) {
  rxPlayer.removeEventListener('playerStateChange', (state) =>
    onPlayerStateChange(state, setIsLoaded)
  );
  rxPlayer.removeEventListener('error', (err) =>
    console.log('the error content stopped due to unmounting of the component', err)
  );
}

/**
 * Function gathering all the events' listener and start them during the mounting of the component
 * @param rxPlayer the rx player
 * @param setIsLoaded Function used to update isLoaded state
 */
function playerWatcher(
  rxPlayer: RxPlayer,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
) {
  console.log('🚀 ~ file: HomePage.tsx:14 ~ useEffect ~ player:', rxPlayer);

  rxPlayer.addEventListener('playerStateChange', (state) =>
    onPlayerStateChange(state, setIsLoaded)
  );
  rxPlayer.addEventListener('error', (err) => {
    console.log('the content stopped with the following error', err);
  });
}

/**
 * Function used to display the current video's state
 * @param state the video's state
 * @param setIsLoaded Function used to update isLoaded state
 */
function onPlayerStateChange(
  state: string,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
) {
  console.log('🚀 ~ file: HomePage.tsx:113 ~ onPlayerStateChange ~ state:', state);
  switch (state) {
    case 'STOPPED':
      console.log('STOPPED: No content is/will be playing');
      break;
    case 'LOADING':
      console.log('LOADING: A new content is currently loading');
      break;
    case 'LOADED':
      console.log('LOADED: The new content is loaded and ready to be played');
      setIsLoaded((old) => !old);
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
