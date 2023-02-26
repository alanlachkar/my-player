import Button from '@mui/material/Button/Button';
import RxPlayer from 'rx-player';
import { useState, useEffect, useRef } from 'react';
import VideoControls from '../../components/VideoControls/VideoControls';

const HomePage = () => {
  const [player, setPlayer] = useState<RxPlayer | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const player = new RxPlayer({ videoElement: videoElement.current });
    playerWatcher(player, setIsLoaded);
    setPlayer(player);

    return () => {
      playerStopWatcher(player, setIsLoaded);
    };
  }, []);

  const onLoadVideo = () => {
    if (player) {
      player.loadVideo({
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        transport: 'directfile',
        autoPlay: false
      });
    } else {
      console.log(
        '🚀 ~ file: HomePage.tsx:27 ~ onLoadVideo ~ player is not defined to load video'
      );
    }
  };

  const onPlay = (): void => {
    if (player) {
      if (player.getPlayerState() === 'PLAYING') {
        player.pause();
      } else {
        player.play();
      }
    } else {
      console.log(
        '🚀 ~ file: HomePage.tsx:44 ~ onPlay ~ player is not defined to play/pause the video'
      );
    }
  };

  const stopVideo = (): void => {
    player?.stop();
    setIsLoaded((old) => !old);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button onClick={onLoadVideo}>Load the big buck bunny</Button>
        <video style={{ backgroundColor: 'black' }} ref={videoElement}></video>
        {player && isLoaded && (
          <VideoControls
            player={player}
            onPlay={onPlay}
            stopVideo={stopVideo}
            duration={player.getVideoDuration()}
          />
        )}
      </div>
    </div>
  );
};

function playerStopWatcher(
  player: RxPlayer | null,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
) {
  player?.removeEventListener('playerStateChange', (state) =>
    onPlayerStateChange(state, setIsLoaded)
  );
  player?.removeEventListener('error', (err) =>
    console.log('the error content stopped due to unmounting of the component', err)
  );
  player?.removeEventListener('warning', (warning) =>
    console.log('the warning content ', warning)
  );
  player?.removeEventListener('seeking', (seeking) =>
    console.log('the seeking content ', seeking)
  );
  player?.removeEventListener('seeked', (seeked) =>
    console.log('the seeked content ', seeked)
  );
}

function playerWatcher(
  player: RxPlayer,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
) {
  console.log('🚀 ~ file: HomePage.tsx:14 ~ useEffect ~ player:', player);

  player.addEventListener('playerStateChange', (state) =>
    onPlayerStateChange(state, setIsLoaded)
  );
  player.addEventListener('error', (err) => {
    console.log('the content stopped with the following error', err);
  });
  player.addEventListener('warning', (warning) =>
    console.log('the warning content ', warning)
  );
  player.addEventListener('seeking', (seeking) =>
    console.log('the seeking content ', seeking)
  );
  player.addEventListener('seeked', (seeked) =>
    console.log('the seeked content ', seeked)
  );
}

function onPlayerStateChange(
  state: string,
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
) {
  console.log('🚀 ~ file: HomePage.tsx:113 ~ onPlayerStateChange ~ state:', state);
  switch (state) {
    case 'STOPPED':
      console.log('No content is/will be playing');
      break;
    case 'LOADING':
      console.log('A new content is currently loading');
      break;
    case 'LOADED':
      console.log('The new content is loaded and ready to be played');
      setIsLoaded((old) => !old);
      break;
    case 'PLAYING':
      console.log('The content is currently playing');
      break;
    case 'PAUSED':
      console.log('The content is currently paused');
      break;
    case 'BUFFERING':
      console.log('The content is buffering new data');
      break;
    case 'SEEKING':
      console.log('The content is still seeking, waiting for new data');
      break;
    case 'ENDED':
      console.log('The content has reached the end.');
      break;
    case 'RELOADING':
      console.log('The content is currently reloading');
      break;
    default:
      console.log('This is impossible (issue material!).');
      break;
  }
}

export default HomePage;
