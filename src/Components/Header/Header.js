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
          <li onClick={()=>alert('hi')} title="Add entity" className="fas fa-user-plus"><span>Add entity</span></li>
          <li title="Upload" className="fas fa-upload"><span>Upload</span></li>
          <li title="Download" className="fa fa-download"><span>Download</span></li>
          <li title="Prev" className="fas fa-arrow-circle-left"></li>
          <li title="Next" className="fas fa-arrow-circle-right"></li>
          <li title="Undo" className="fas fa-undo"></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;