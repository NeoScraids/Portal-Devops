import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Galeria from './pages/Galeria';
import Contacto from './pages/Contacto';
import About from './pages/About';

type ModalImage = {
  url: string;
  title: string;
  desc: string;
};

function App() {
  const [modal, setModal] = useState<{open: boolean, img?: ModalImage}>({open: false});

  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav animate-fade-in">
          <Link to="/">Inicio</Link>
          <Link to="/galeria">Galería</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/about">Sobre Nosotros</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Galeria onImageClick={(img) => setModal({open: true, img})} />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {modal.open && modal.img && (
          <div className="modal-overlay" onClick={() => setModal({open:false})}>
            <div className="modal-content animate-modal-pop" onClick={e => e.stopPropagation()}>
              <img src={modal.img.url} alt={modal.img.title} className="modal-img" />
              <h3>{modal.img.title}</h3>
              <p>{modal.img.desc}</p>
              <button className="close-btn animate-bounce" onClick={() => setModal({open:false})}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
