// Component imports
import CardList from '../..//components/CardsList/CardList';
// Utils imports
import { VideoContentInterface } from 'src/types';

const MoviesPage = () => {
  return (
    <CardList
      onClickCard={(value: VideoContentInterface) =>
        console.log('🚀 ~ file: MoviesPage.tsx:15 ~ MoviesPage ~ value:', value)
      }
    />
  );
};

export default MoviesPage;
