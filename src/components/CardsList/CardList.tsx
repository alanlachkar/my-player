import { useRef } from 'react';
import { VideoContentInterface, VideoInterface } from 'src/types';
import MyCard from '../MyCard/MyCard';
import styles from './CardList.css';
import videosList from '../../assets/videosList.json';

interface CardListProperties {
  onClickCard: (value: VideoContentInterface) => void;
}
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
