import './Contacto.css';

export default function Contacto() {
  return (
    <section className="contacto animate-fade-in-up">
      <h2>Contacto</h2>
      <form className="contact-form animate-fade-in" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Nombre" required />
        <input type="email" placeholder="Correo electrónico" required />
        <textarea placeholder="Mensaje" required />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}
