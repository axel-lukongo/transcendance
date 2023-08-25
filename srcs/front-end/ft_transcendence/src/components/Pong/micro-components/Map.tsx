import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import des styles du carousel
import beachImage from '/ft_transcendence/src/image/beach_map.jpg';
import footballImage from '/ft_transcendence/src/image/football_map.jpg';
import plateformImage from '/ft_transcendence/src/image/plateform_map.jpg';
import defaultImage from '/ft_transcendence/src/image/default_map.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';


interface MapProps {
    setPongMap: (pongMap: string| null) => void; 
  }
  
  const Map: React.FC<MapProps> = ({ setPongMap }) => {

    const [selectedMap, setSelectedMap] = useState<string | null>(null);
    const [mapName, setMapName] = useState<string|null>(null)
    
    const handleMapSelect = (path: string) => {
      if (path === beachImage)
        setMapName('Beach');
      else if (path === footballImage)
        setMapName('Football')
      else if (path === plateformImage)
        setMapName('Plateform')
        else if (path === defaultImage)
        setMapName('Default')
      setSelectedMap(path);
    };
  
    const confirmMapSelection = () => {
      if (selectedMap) {
        setPongMap(selectedMap);
        sessionStorage.setItem('playerMap', selectedMap);
      }
    };
  
    return (
      <div>
        <div className="score-container-box">
          <h1 id='select-map'>SELECT MAP</h1>
        </div>
        <div className=" pong-container-box map-select">
          <Carousel className="carousel-container" showThumbs={false}>
          <div className="carousel-slide" onClick={() => handleMapSelect(defaultImage)}>
              <img src={defaultImage} alt="Default Map" />
            </div>
            <div className="carousel-slide" onClick={() => handleMapSelect(beachImage)}>
              <img src={beachImage} alt="Beach Map" />
            </div>
            <div className="carousel-slide" onClick={() => handleMapSelect(footballImage)}>
              <img src={footballImage} alt="Football Map" />
            </div>
            <div className="carousel-slide" onClick={() => handleMapSelect(plateformImage)}>
              <img src={plateformImage} alt="Platform Map" />
            </div>
          </Carousel>
          {selectedMap && (
            <div className="confirm-button-container">
              <p className="selected-map-name">{mapName}</p>
              <button className="confirm-button" onClick={confirmMapSelection}>
                Confirm
              </button>
            </div>
          )}
        </div>
        <Link to ='/'>
              <button className='log-out-button logo-box'></button>
        </Link>
        <Link to="/">
          <button className='home-button logo-box'></button>
        </Link>
        <Link to="/leaderBoard">
          <button className='leader-board-button logo-box'></button>
        </Link>
        <Link to="/message">
          <button className='message-button logo-box'></button>
        </Link>
        <Link to="/contact">
          <button className='contact-button logo-box'></button>
        </Link>
      </div>
    );
  };

  export default Map;