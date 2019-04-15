import React, { Component } from "react";
import "./Header.css";
import axios from "axios";

class Header extends Component {
  uploadFile = () => this.fileInput.click();

  fileHandler = event => {
    const data = new FormData();
    data.append("targetImage", event.target.files[0]);
    axios.post("api/images/", data, {}).then(res => {
      console.log(res.statusText);
    });
  };

  render() {
    return (
      <div>
        <div className="navigation">
          <div className="logoBlock">
            <img src={require("../../img/logotype.png")} alt="Logo" />
            <p>Bounding boxes tool</p>
          </div>
          <nav className="tools">
            <ul>
              <li
                title="Upload"
                className="fas fa-upload"
                onClick={() => this.uploadFile()}
              >
                <span>Upload</span>
              </li>
              <li title="Download" className="fa fa-download">
                <span>Download</span>
              </li>
              <li title="Prev" className="fas fa-arrow-circle-left" />
              <li title="Next" className="fas fa-arrow-circle-right" />
              <li title="Undo" className="fas fa-undo" />
              <input
                type="file"
                id="targetImage"
                ref={fileInput => (this.fileInput = fileInput)}
                accept="image/*"
                onChange={this.fileHandler}
              />
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
