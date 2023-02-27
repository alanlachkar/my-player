// React imports
import { useState } from 'react';
// Component imports
import Player from '../../components/Player/Player';
import CardList from '../../components/CardsList/CardList';
import AdditionalSections from '../../components/AdditionalSections/AdditionalSections';
// Utils imports
import RxPlayer from 'rx-player';
import { VideoContentInterface } from 'src/types';
// Css imports
import styles from './HomePage.css';

/**
 * Home Page component displaying when the user click on the 'My Player' icon
 * @returns The content of the home page
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
      <Player rxPlayer={rxPlayer} onChangeRxPlayer={onChangeRxPlayer} />
      <AdditionalSections />
    </div>
  );
};

/**
 * Function used to load the video on the rxPlayer
 * @param rxPlayer the rx player
 */
function onLoadVideo(rxPlayer: RxPlayer | null, video: VideoContentInterface) {
  if (rxPlayer) {
    rxPlayer.loadVideo({
      url: video.url,
      transport: video.transport,
      autoPlay: false
    });
  } else {
    console.log(
      '🚀 ~ file: HomePage.tsx:27 ~ onLoadVideo ~ player is not defined to load video'
    );
  }
}

export default HomePage;
