import React,{ Component } from 'react';
import './Header.css';

class Header extends Component {
  uploadFile = () =>  this.fileInput.click()
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
              <li title="Upload" className="fas fa-upload" onClick={() => this.uploadFile()}><span>Upload</span></li>
              <li title="Download" className="fa fa-download"><span>Download</span></li>
              <li title="Prev" className="fas fa-arrow-circle-left"></li>
              <li title="Next" className="fas fa-arrow-circle-right"></li>
              <li title="Undo" className="fas fa-undo"></li>
              <input type="file" id="my_file" ref={fileInput => this.fileInput = fileInput} accept="image/*"></input>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;