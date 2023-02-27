// React imports
import { useState } from 'react';
// Component imports
import Player from '../../components/Player/Player';
import CardList from '../../components/CardsList/CardList';
// Utils imports
import RxPlayer from 'rx-player';
import { VideoContentInterface } from '../../types';
// Css imports
import styles from './HomePage.css';

/**
 * Home Page component displaying when the user click on the 'My Player' icon
 * @returns A cards' list from json file, a player component
 */
const HomePage = () => {
  const [rxPlayer, setRxPlayer] = useState<RxPlayer | null>(null);

  const onChangeRxPlayer = (newValue: RxPlayer | null): void => {
    setRxPlayer(newValue);
  };

  return (
    <div className={styles.container}>
      <CardList
        onClickCard={(value: VideoContentInterface) => onLoadVideo(rxPlayer, value)}
      />
      <div className={styles.playerContainer} id="playerContainerAnchor">
        <Player rxPlayer={rxPlayer} onChangeRxPlayer={onChangeRxPlayer} />
      </div>
    </div>
  );
};

/**
 * Function used to load the video on the rxPlayer
 * @param rxPlayer the rx player
 * @param video the video's information usefull to load correctly load the video to the rx player
 */
function onLoadVideo(rxPlayer: RxPlayer | null, video: VideoContentInterface) {
  if (rxPlayer) {
    // Only load a directfile transport protocol because no time
    if (video.transport === 'directfile') {
      // Don't reload video if it is the same previous url
      if (rxPlayer.getUrl() !== video.url) {
        rxPlayer.loadVideo({
          url: video.url,
          transport: video.transport,
          autoPlay: false
        });
      }
      // Go to the player at the bottom of this page
      const top = document.getElementById('playerContainerAnchor')?.offsetTop; //Getting Y of target element
      if (top) {
        window.scrollTo(0, top - window.innerHeight / 4);
      }
    } else {
      alert(
        "Impossible de lire la video si le protocole de transport est en 'dash'. \n Essayez avec une autre video"
      );
    }
  } else {
    console.log(
      '🚀 ~ file: HomePage.tsx:27 ~ onLoadVideo ~ player is not defined to load video'
    );
  }
}

export default HomePage;
