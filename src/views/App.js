import { Outlet } from 'react-router-dom';
import '../assets/styles/App.scss';
import TopBar from '../components/TopBar';
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
