import './Galeria.css';
import { useState } from 'react';

type GaleriaProps = {
  onImageClick: (img: { url: string; title: string; desc: string }) => void;
};

const images = [
	{
		url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
		title: 'Bosque Encantado',
		desc: 'Un bosque misterioso cubierto de niebla matutina, donde cada árbol cuenta una historia milenaria y la naturaleza susurra secretos ancestrales.',
		category: 'Naturaleza'
	},
	{
		url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
		title: 'Montañas Doradas',
		desc: 'Majestuosas montañas bañadas por la luz dorada del atardecer, creando un espectáculo visual que toca el alma y eleva el espíritu.',
		category: 'Paisajes'
	},
	{
		url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
		title: 'Lago de Cristal',
		desc: 'Aguas cristalinas que reflejan el cielo como un espejo perfecto, rodeadas de montañas que guardan los secretos de la tierra.',
		category: 'Agua'
	},
	{
		url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
		title: 'Sendero Místico',
		desc: 'Un camino serpenteante que se pierde entre árboles centenarios, invitando a los aventureros a descubrir lo desconocido.',
		category: 'Aventura'
	},
	{
		url: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
		title: 'Cascada Celestial',
		desc: 'Una cascada espectacular que cae desde las alturas como lágrimas de los dioses, creando un santuario natural de paz y belleza.',
		category: 'Agua'
	},
	{
		url: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80',
		title: 'Pradera Infinita',
		desc: 'Campos dorados que se extienden hasta el horizonte, mecidos por el viento como un océano de trigo bajo el sol radiante.',
		category: 'Campos'
	},
	{
		url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
		title: 'Aurora Boreal',
		desc: 'Un espectáculo celestial donde las luces danzan en el cielo nocturno, pintando la oscuridad con colores mágicos.',
		category: 'Cielo'
	},
	{
		url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
		title: 'Selva Tropical',
		desc: 'La exuberante selva tropical donde la vida florece en cada rincón, creando un ecosistema de increíble biodiversidad.',
		category: 'Naturaleza'
	},
	{
		url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
		title: 'Desierto de Fuego',
		desc: 'Dunas doradas que cambian con el viento, creando un paisaje infinito de belleza árida y silencio contemplativo.',
		category: 'Desierto'
	}
];

const categories = ['Todos', 'Naturaleza', 'Paisajes', 'Agua', 'Aventura', 'Campos', 'Cielo', 'Desierto'];

export default function Galeria({ onImageClick }: GaleriaProps) {
	const [selectedCategory, setSelectedCategory] = useState('Todos');
	const [filteredImages, setFilteredImages] = useState(images);

	const filterImages = (category: string) => {
		setSelectedCategory(category);
		if (category === 'Todos') {
			setFilteredImages(images);
		} else {
			setFilteredImages(images.filter(img => img.category === category));
		}
	};

	return (
		<div className="galeria-container">
			{/* Header Section */}
			<section className="galeria-header animate-fade-in">
				<h1>Galería Fotográfica</h1>
				<p>Descubre una colección curada de imágenes que capturan la belleza del mundo natural</p>
			</section>

			{/* Filter Section */}
			<section className="filter-section animate-fade-in-up">
				<div className="filter-container">
					<h3>Filtrar por categoría</h3>
					<div className="filter-buttons">
						{categories.map((category) => (
							<button
								key={category}
								className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
								onClick={() => filterImages(category)}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section className="galeria animate-fade-in-up">
				<div className="gallery-stats">
					<span className="image-count">{filteredImages.length} imágenes</span>
					<span className="category-info">Categoría: {selectedCategory}</span>
				</div>
				
				<div className="gallery-grid">
					{filteredImages.map((img, i) => (
						<div
							className="gallery-item animate-zoom-in"
							key={i}
							onClick={() => onImageClick(img)}
							style={{ cursor: 'pointer', animationDelay: `${i * 0.1}s` }}
						>
							<div className="image-overlay">
								<div className="overlay-content">
									<h4>{img.title}</h4>
									<span className="category-tag">{img.category}</span>
									<p className="preview-desc">{img.desc.substring(0, 80)}...</p>
								</div>
							</div>
							<img src={img.url} alt={img.title} />
						</div>
					))}
				</div>

				{filteredImages.length === 0 && (
					<div className="no-results">
						<h3>No se encontraron imágenes</h3>
						<p>Intenta con otra categoría</p>
					</div>
				)}
			</section>
		</div>
	);
}
