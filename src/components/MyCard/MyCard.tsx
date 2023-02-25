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
import BBBPoster from '../../assets/affiche_Big_Buck_Bunny.png';
import NotFavoriteIcon from '@mui/icons-material/FavoriteBorder';
// Css import
import styles from './MyCard.css';

const MyCard = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  return (
    <Card
      sx={{ maxWidth: 250 }}
      onClick={() => console.log('click on card ! ')}
      className={styles.container}
    >
      <CardMedia
        className={styles.picture}
        component="img"
        height="194"
        image={BBBPoster}
        alt="poster of Big Buck Bunny"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together
          with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => setIsFavorite((oldIsFavorite: boolean) => !oldIsFavorite)}
        >
          {isFavorite ? <FavoriteIcon /> : <NotFavoriteIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MyCard;
