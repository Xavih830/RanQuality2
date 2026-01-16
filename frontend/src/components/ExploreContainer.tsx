import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <strong>Bienvenido a RanQuality</strong>
      <p style={{marginRight: '12vw', marginLeft: '12vw', marginTop: '2vw'}}>Realiza tu primera búsqueda entre las categorías de música seleccionada y empieza a disfrutar</p>
    </div>
  );
};

export default ExploreContainer;
