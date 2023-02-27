// React imports
import { useState } from 'react';
// Component imports
import { IconButton, Card, Typography, CardActions, CardContent } from '@mui/material';
// Icon imports
import { Favorite, FavoriteBorder } from '@mui/icons-material';
// Css import
import styles from './MyCard.css';
import { VideoInterface, VideoContentInterface } from 'src/types';

/**
 * Interface of Card component
 * onClickCard  - Callback when the user click on a card
 * video        - Video's informations
 */
interface MyCardProperties {
  onClickCard: (value: VideoContentInterface) => void;
  video: VideoInterface;
}

/**
 * Display video's information as card component
 * @param props Properties of Card component
 * @returns Card component
 */
const MyCard = (props: MyCardProperties) => {
  const { video } = props;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  return (
    <Card
      sx={{ maxWidth: 250 }}
      onClick={() => props.onClickCard(video.videoContent)}
      className={styles.container}
      data-testid={`card_${video.id}`}
    >
      <Typography
        variant="h5"
        component="div"
        style={{ margin: '4px 16px 0px 8px' }}
        data-testid={`card_${video.id}_title`}
      >
        {video.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {video.summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation();
            setIsFavorite((oldIsFavorite: boolean) => !oldIsFavorite);
          }}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MyCard;
