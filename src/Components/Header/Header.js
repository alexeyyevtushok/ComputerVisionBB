import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { withRouter } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { addImages, resetAll, addGDriveImages } from '../../actions/imagesActions';

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

  successResponseGoogle = (response) => {
    const { accessToken } = response;
    console.log(accessToken);
    const url = prompt('Enter link to the folder:');
    if (url !== null) {
      this.props.addGDriveImages({ url, accessToken });
    }
  };

  errorResponseGoogle = (response) => {
    // handle error
    console.log(response);
  };

  reset = (e) => {
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
              <li title="Upload" className="fas fa-upload">
                {/* change this to simple span with onClick when registered and check token expiration */}
                <GoogleLogin
                  clientId="504294961504-265csqd1aar75cphf1qme0q0ockt8ukt.apps.googleusercontent.com"
                  render={renderProps => (
                    <span onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      {'Upload from GDrive'}
                    </span>
                  )}
                  buttonText="Login"
                  onSuccess={this.successResponseGoogle}
                  onFailure={this.errorResponseGoogle}
                  cookiePolicy="single_host_origin"
                />
              </li>
              <li title="Upload" className="fas fa-upload" onClick={e => this.uploadFile(e)}>
                <span>Upload from disk</span>
              </li>
              <li title="Download" className="fa fa-download" onClick={this.downloadOutput}>
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

export default connect(
  null,
  {
    addImages,
    resetAll,
    addGDriveImages,
  },
)(withRouter(Header));
