import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { withRouter } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { addImages, resetAll } from '../../actions/imagesActions';

class Header extends Component {
  uploadFile = () => this.fileInput.click();

  downloadOutput = () => {
    axios.get('/api/generator', { responseType: 'blob' }).then(res => {
      const fileName = prompt('Enter file name:', 'output');
      if (fileName !== null) {
        fileDownload(res.data, `${fileName}.zip`);
      }
    });
  };

  uploadFileRequest = event => {
    this.props.addImages(event.target.files);
  };

  reset = e => {
    if (!window.confirm('Are you sure?')) {
      e.preventDefault();
    }
    this.props.resetAll();
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
              <li
                title="Upload"
                className="fas fa-upload"
                onClick={e => this.uploadFile(e)}
              >
                <span>Upload</span>
              </li>
              <li
                title="Download"
                className="fa fa-download"
                onClick={this.downloadOutput}
              >
                <span>Genarate</span>
              </li>
              <a
                href="./"
                title="Reset"
                className="fas fa-trash-restore-alt"
                onClick={e => this.reset(e)}
              >
                <span>Reset</span>
              </a>
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
    resetAll,
  },
)(withRouter(Header));
