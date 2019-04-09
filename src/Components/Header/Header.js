import React,{ Component } from 'react';
import './Header.css';
import Modal from 'react-awesome-modal';
import data from '../../data/data';

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalEntity: false,
    }
  }
  stateModal = () => {
    console.log('test');
    
    this.setState({
      modalEntity : !this.state.modalEntity
    });
  }

  handleSubmit(event){;
    // data.entities.push({
    //   index:4,
    //   color: event.target.color.value ,
    //   label: event.target.label.value,
    // })
    data['test'] = "hello";
    event.preventDefault();
  }

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
              <li onClick={()=> this.stateModal()} title="Add entity" className="fas fa-user-plus"><span>Add
                  entity</span>
              </li>
              <li title="Upload" className="fas fa-upload"><span>Upload</span></li>
              <li title="Download" className="fa fa-download"><span>Download</span></li>
              <li title="Prev" className="fas fa-arrow-circle-left"></li>
              <li title="Next" className="fas fa-arrow-circle-right"></li>
              <li title="Undo" className="fas fa-undo"></li>
            </ul>
          </nav>
        </div>
        <section>
          <Modal visible={this.state.modalEntity} width="400" height="350" effect="fadeInDown" onClickAway={()=>
            this.stateModal()}
            style = {{background: "whitesmoke"}}
            >
            <div class="contact">
              <div class="form">
                <h1><i className="fas fa-user-plus"></i>Add new entity</h1>
                <form onSubmit={this.handleSubmit}>
                  <div className="inputbox">
                    <input type="text" id="color" name="Color"></input>
                    <label>Color</label>
                  </div>
                  <div className="inputbox">
                    <input type="text" id="label" name="label"></input>
                    <label>Label</label>
                  </div>
                  <button className="btn" type="submit">Submit</button>
                  <button className="btn" type="button" onClick={()=> this.stateModal()}>Cancel</button>
                </form>
              </div>
            </div>
          </Modal>
        </section>
      </div>
    );
  }
}

export default Header;