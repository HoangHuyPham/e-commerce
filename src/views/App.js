import '../assets/styles/App.scss';
import SlideShow from '../components/SlideShow';
import TopBar from '../components/TopBar';
import WatchList from '../components/WatchList';

function App() {
  return (
    <div className="App">
      <TopBar/>
      <SlideShow/>
      <WatchList/>
    </div>
  );
}

export default App;
