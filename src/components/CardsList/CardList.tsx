//React imports
import { useRef } from 'react';
// Component imports
import MyCard from '../MyCard/MyCard';
// Utils imports
import { VideoContentInterface, VideoInterface } from 'src/types';
import videosList from '../../assets/videosList.json';
// Css imports
import styles from './CardList.css';

/**
 * Interface of Cardlist component
 * onClickCard - Callback when the user click on a card
 */
interface CardListProperties {
  onClickCard: (value: VideoContentInterface) => void;
}

/**
 * Display the list of cards according to json file
 * @param props Properties of Cardlist component
 * @returns CardList component
 */
const CardList = (props: CardListProperties) => {
  const videoList = useRef(videosList);
  return (
    <div className={styles.container} data-testid="cardList">
      {videoList.current.map((video: VideoInterface) => {
        return <MyCard key={video.id} onClickCard={props.onClickCard} video={video} />;
      })}
    </div>
  );
};

export default CardList;
