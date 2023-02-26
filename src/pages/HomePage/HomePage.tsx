// React imports
import { useState, useEffect, useRef } from 'react';
// Component imports
import MyCard from '../../components/MyCard/MyCard';
import VideoControls from '../../components/VideoControls/VideoControls';
// Utils imports
import RxPlayer from 'rx-player';
// Css imports
import styles from './HomePage.css';
import AdditionalSections from '../../components/AdditionalSections/AdditionalSections';
import BBBPoster from '../../assets/affiche_Big_Buck_Bunny.png';

/**
 * Home Page component displaying when the user click on the 'My Player' icon
 * @returns The content of the home page
 */
const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [rxPlayer, setRxPlayer] = useState<RxPlayer | null>(null);
  const videoWrapper = useRef<HTMLDivElement | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const player = new RxPlayer({ videoElement: videoElement.current });
    playerWatcher(player, setIsLoaded);
    setRxPlayer(player);

    return () => {
      playerStopWatcher(player, setIsLoaded);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '8px' }}>
        <MyCard
          onClickCard={(value: string) => onLoadVideo(rxPlayer, value)}
          videoName="BigBuckBunny"
          posterPicture={BBBPoster}
        />
      </div>
      <div className={styles.bkg} ref={videoWrapper}>
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
      <AdditionalSections />
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
 * Function used to load the video on the rxPlayer
 * @param rxPlayer the rx player
 */
function onLoadVideo(rxPlayer: RxPlayer | null, videoName: string) {
  if (rxPlayer) {
    rxPlayer.loadVideo({
      url: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${videoName}.mp4`,
      transport: 'directfile',
      autoPlay: false
    });
  } else {
    console.log(
      '🚀 ~ file: HomePage.tsx:27 ~ onLoadVideo ~ player is not defined to load video'
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

export default HomePage;
