// React imports
import { useState } from 'react';
// Component imports
import Card from '@mui/material/Card/Card';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import CardActions from '@mui/material/CardActions/CardActions';
import CardContent from '@mui/material/CardContent/CardContent';
// Icon imports
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotFavoriteIcon from '@mui/icons-material/FavoriteBorder';
// Css import
import styles from './MyCard.css';

interface MyCardProperties {
  onClickCard: (value: string) => void;
  videoName: string;
  posterPicture: string;
}

const MyCard = (props: MyCardProperties) => {
  const { videoName } = props;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  return (
    <Card
      sx={{ maxWidth: 250 }}
      onClick={() => props.onClickCard(videoName)}
      className={styles.container}
    >
      <CardMedia
        className={styles.picture}
        component="img"
        height="194"
        image={props.posterPicture}
        alt={`poster of ${videoName}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Cela raconte l'histoire d'un lapin se faisant embêter par 3 rongeurs et qui
          contre-attaque par la suite. Il ne vaut mieux pas le chercher.
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
