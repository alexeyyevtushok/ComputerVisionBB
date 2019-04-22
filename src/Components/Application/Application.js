import React, { Component } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../../store';
import { updateEntities } from '../../actions/entitiesActions';
import Header from '../Header/Header';
import Middle from '../Middle/Middle';
import Slider from '../Slider/Slider';
import './Application.css';

// initialization
store.dispatch(updateEntities);

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 'http://pcexpert86.ru/image/cache/catalog/thumbs/nofoto-1200x800.gif',
    };
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest = () => {
    axios.get('/api/images/').then((res) => {
      if (res.data.length > 0) {
        this.setState({
          currentImg: res.data[0].picture,
        });
      }
    });
  };

  getUrl = (url) => {
    this.setState({
      currentImg: url,
    });
  };

  fileHandler = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const data = new FormData();
      data.append('targetImage', event.target.files[i]);
      axios.post('api/images/', data, {}).then((res) => {
        this.getRequest();
      });
    }
  };

  render() {
    const { currentImg } = this.state;
    return (
      <Provider store={store}>
        <div className="main">
          <Header fileHandler={this.fileHandler} />
          <Middle currentImg={currentImg} />
          <Slider onGetUrl={this.getUrl} />
        </div>
      </Provider>
    );
  }
}

export default Application;
