import Header from './Header';
import Banner from './Banner';
import MovieList from './MovieList';

function Home() {
  return (
    <div>
      <Header />  
      <Banner /> 
      <MovieList title="Movie List" />  
    </div>
  );
}

export default Home;