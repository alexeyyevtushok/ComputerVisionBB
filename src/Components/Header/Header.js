import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import './Header.css';
import { connect } from 'react-redux';
import { addImages } from '../../actions/imagesActions';

class Header extends Component {
  uploadFile = () => this.fileInput.click();

  downloadOutput = () => {
    axios.get('/api/generator', { responseType: 'blob' }).then((res) => {
      const fileName = prompt('Enter file name:', 'output');
      if (fileName !== null) {
        fileDownload(res.data, `${fileName}.zip`);
      }
    });
  };

  uploadFileRequest = (event) => {
    this.props.addImages(event.target.files);
  };

  render() {
    return (
      <div>
        <div className="navigation">
          <div className="logoBlock">
            <img src={require('../../img/logotype.png')} alt="Logo" />
            <p>Bounding boxes tool</p>
          </div>
          <nav className="tools">
            <ul>
              <li title="Upload" className="fas fa-upload" onClick={e => this.uploadFile(e)}>
                <span>Upload</span>
              </li>
              <li title="Download" className="fa fa-download" onClick={this.downloadOutput}>
                <span>Genarate</span>
              </li>
              <li title="Prev" className="fas fa-arrow-circle-left" />
              <li title="Next" className="fas fa-arrow-circle-right" />
              <li title="Undo" className="fas fa-undo" />
              <input
                type="file"
                id="targetImage"
                ref={fileInput => (this.fileInput = fileInput)}
                accept="image/*"
                onChange={event => this.uploadFileRequest(event)}
                multiple="multiple"
              />
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    addImages,
  },
)(Header);
