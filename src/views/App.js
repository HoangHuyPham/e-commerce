import { Outlet } from 'react-router-dom';
import '../assets/styles/App.scss';
import SlideShow from '../components/SlideShow';
import TopBar from '../components/TopBar';
import WatchList from '../components/WatchList';
import Footer from '../components/Footer';

function App() {
  return (
    <div className="App">
      <TopBar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
