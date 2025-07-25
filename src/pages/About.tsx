import './About.css';

export default function About() {
  return (
    <section className="about animate-fade-in">
      <h2>Sobre Nosotros</h2>
      <p>Somos un equipo apasionado por la tecnología y el diseño web moderno. Este portal es una demo creada con Vite + React para mostrar lo que se puede lograr con herramientas modernas y creatividad.</p>
      <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="Equipo Portal Demo" className="about-img animate-zoom-in" style={{maxWidth:'350px',borderRadius:'1.2rem',marginTop:'2rem'}} />
    </section>
  );
}
