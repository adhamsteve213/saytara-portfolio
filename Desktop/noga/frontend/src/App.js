import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App font-sans">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Gallery />
        <About />
        <Contact />
      </main>
      <footer className="bg-black text-white py-6 text-center">
        <div className="container mx-auto px-6">© {new Date().getFullYear()} Moussa Elshourook - Men's Hair Salon</div>
      </footer>
    </div>
  );
}

export default App;
