import React,{ Component } from 'react';
import './Header.css';

class Header extends Component {
  render(){
    return (
      <div>
        <div className="navigation">
          <div className="logoBlock">
            <img src={require('../../img/logotype.png')} alt="Logo" />
            <p>Bounding boxes tool</p>
          </div>
          <nav className="tools">
            <ul>
              <li title="Add entity" className="fas fa-user-plus"><span>Add entity</span></li>
              <li title="Upload" className="fas fa-upload"><span>Upload</span></li>
              <li title="Download" className="fa fa-download"><span>Download</span></li>
              <li title="Prev" className="fas fa-arrow-circle-left"></li>
              <li title="Next" className="fas fa-arrow-circle-right"></li>
              <li title="Undo" className="fas fa-undo"></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;