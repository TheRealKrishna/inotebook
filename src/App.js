import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import Dashboard from './components/Dashboard';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <NoteState>
    <BrowserRouter>
      <Navbar/>
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        <Route exact path="/" element={<><Home/></>}/>
        <Route exact path="/about" element={<><About/></>}/>
        <Route exact path="/dashboard" element={<><Dashboard/></>}/>
        <Route exact path="/login" element={<><Login/></>}/>
        <Route exact path="/signup" element={<><Signup/></>}/>
        <Route exact path="/forgot-password" element={<><ForgotPassword/></>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </NoteState>
    
  );
}

export default App;
