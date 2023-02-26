// Component imports
import MyCard from '../../components/MyCard/MyCard';
import BBBPoster from '../../assets/affiche_Big_Buck_Bunny.png';

const MoviesPage = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '8px' }}>
      <MyCard
        onClickCard={(value: string) => {
          console.log('click on the movie named :', value);
        }}
        videoName="BigBuckBunny"
        posterPicture={BBBPoster}
      />
    </div>
  );
};

export default MoviesPage;
