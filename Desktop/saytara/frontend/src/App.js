import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/home';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter >
      <Navbar />
      <Routes className="App">
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
