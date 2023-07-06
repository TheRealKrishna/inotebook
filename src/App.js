import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<><Home/></>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
