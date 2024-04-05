import logoIPN from './Imagenes/Logo_IPN.png';
import logoLABO from './Imagenes/Logo_UPIITA.png';
import './header.css';

function Header() {
  return (
    <>    
      <div className='header-container'>
        <img className='header-logo-ipn' src={logoIPN} alt="Logotipo de de la Ciudad de México"></img>
        <h1 className='header-tema-tesis'>Modelo de estimación de tiempo de arribo de trenes del Tren Ligero en la Ciudad México</h1>
        <img className='header-logo-upiita' src={logoLABO} alt="Logotipo de Labo"></img>  
      </div>
    </>
  );
}

export default Header;