import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import { updateEntities } from '../../actions/entitiesActions';
import Header from '../Header/Header';
import Middle from '../Middle/Middle';
import Slider from '../Slider/Slider';
import './Application.css';
import { updateImages } from '../../actions/imagesActions';

// initialization
store.dispatch(updateImages);
store.dispatch(updateEntities);

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="main">
          <Header />
          <Middle />
          <Slider />
        </div>
      </Provider>
    );
  }
}

export default Application;
