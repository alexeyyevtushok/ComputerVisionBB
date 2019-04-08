import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="navigation">
      <div className="logoBlock">
        <img src={require('../../img/logotype.png')} alt="Logo"/>
        <p>Bounding boxes tool</p>
      </div>
      <nav className="tools">
        <ul>
          <li title="Prev" className="fas fa-arrow-circle-left"></li>
          <li title="Next" className="fas fa-arrow-circle-right"></li>
          <li title="Upload" className="fas fa-upload"></li>
          <li title="Download" className="fa fa-download"></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;