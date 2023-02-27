// React imports
import { useState } from 'react';
// Component imports
import Card from '@mui/material/Card/Card';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import CardActions from '@mui/material/CardActions/CardActions';
import CardContent from '@mui/material/CardContent/CardContent';
// Icon imports
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotFavoriteIcon from '@mui/icons-material/FavoriteBorder';
// Css import
import styles from './MyCard.css';
import { VideoInterface, VideoContentInterface } from 'src/types';

interface MyCardProperties {
  onClickCard: (value: VideoContentInterface) => void;
  video: VideoInterface;
}

const MyCard = (props: MyCardProperties) => {
  const { video } = props;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  return (
    <Card
      sx={{ maxWidth: 250 }}
      onClick={() => props.onClickCard(video.videoContent)}
      className={styles.container}
    >
      <Typography variant="h5" component="div" style={{ margin: '4px 16px 0px 8px' }}>
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
          {isFavorite ? <FavoriteIcon /> : <NotFavoriteIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MyCard;
