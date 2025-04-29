import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoveLanding.css';

function LoveLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">Lovely</div>
        
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="/">Home</a>
          <a href="#">About</a>
          <a href="#">Service</a>
          <a href="#">Gallery</a>
          <a href="#">Team</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </nav>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>

      <section className="hero">
        <div className="content">
          <h3>Test Your Love</h3>
          <h1>
            Just enter your <span>Names</span> and let the magic begin!
          </h1>
          <p>
          Find Out How Strong Your Love Is!
           Discover Your True Love Compatibility
            Measure the Magic Between You Two
          </p>
          <div className="buttons">
            <Link to="/calculate" className="btn-primary">
              Calculate Love
            </Link>
            <Link to="/" className="btn-secondary">
                 Join Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoveLanding;
