import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="portal-root">
      {/* Hero Section */}
      <section className="hero animate-fade-in">
        <div className="hero-content">
          <h1>Bienvenido a Portal Demo</h1>
          <p>Un portal moderno, responsivo y atractivo hecho con Vite + React</p>
          <div className="hero-buttons">
            <Link to="/galeria" className="cta-btn animate-bounce">Ver galería</Link>
            <Link to="/about" className="cta-btn-outline">Conocer más</Link>
          </div>
        </div>
        <div className="hero-decorations">
          <div className="floating-card animate-float-1">
            <span>🚀</span>
            <p>Moderno</p>
          </div>
          <div className="floating-card animate-float-2">
            <span>⚡</span>
            <p>Rápido</p>
          </div>
          <div className="floating-card animate-float-3">
            <span>🎨</span>
            <p>Atractivo</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features animate-fade-in-up">
        <div className="container">
          <h2>Características principales</h2>
          <div className="features-grid">
            <div className="feature-card animate-zoom-in">
              <div className="feature-icon">📱</div>
              <h3>Diseño Responsivo</h3>
              <p>Se adapta perfectamente a cualquier dispositivo, desde móviles hasta pantallas grandes.</p>
            </div>
            <div className="feature-card animate-zoom-in">
              <div className="feature-icon">🎭</div>
              <h3>Animaciones Suaves</h3>
              <p>Transiciones elegantes y animaciones que mejoran la experiencia del usuario.</p>
            </div>
            <div className="feature-card animate-zoom-in">
              <div className="feature-icon">🖼️</div>
              <h3>Galería Interactiva</h3>
              <p>Explora imágenes hermosas con modales informativos y navegación intuitiva.</p>
            </div>
            <div className="feature-card animate-zoom-in">
              <div className="feature-icon">⚡</div>
              <h3>Alto Rendimiento</h3>
              <p>Construido con Vite y React para una carga ultrarrápida y experiencia fluida.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats animate-fade-in-up">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Responsivo</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4</div>
              <div className="stat-label">Páginas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6</div>
              <div className="stat-label">Imágenes</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Posibilidades</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section animate-fade-in-up">
        <div className="container">
          <h2>¿Listo para explorar?</h2>
          <p>Descubre todas las características de nuestro portal demo</p>
          <div className="cta-buttons">
            <Link to="/galeria" className="cta-btn">Explorar Galería</Link>
            <Link to="/contacto" className="cta-btn-outline">Contactanos</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
