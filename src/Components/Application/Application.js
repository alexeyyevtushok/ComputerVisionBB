import React, { Component } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../../store';
import { updateEntities } from '../../actions/entitiesActions';
import Header from '../Header/Header';
import Middle from '../Middle/Middle';
import Slider from '../Slider/Slider';
import './Application.css';
import { updateImages, addImages } from '../../actions/imagesActions';

// initialization
store.dispatch(updateEntities);
store.dispatch(updateImages);

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg:
        'http://pcexpert86.ru/image/cache/catalog/thumbs/nofoto-1200x800.gif',
    };
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest = () => {
    axios.get('/api/images/').then(res => {
      if (res.data.length > 0) {
        this.setState({
          currentImg: res.data[0].picture,
        });
      }
    });
  };

  getUrl = url => {
    this.setState({
      currentImg: url,
    });
  };

  render() {
    const { currentImg } = this.state;
    return (
      <Provider store={store}>
        <div className="main">
          <Header />
          <Middle currentImg={currentImg} />
          <Slider onGetUrl={this.getUrl} />
        </div>
      </Provider>
    );
  }
}

export default Application;
