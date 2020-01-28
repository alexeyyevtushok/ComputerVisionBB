import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';

import { updateEntities } from '../../actions/entitiesActions';
import { updateImages } from '../../actions/imagesActions';

import Header from '../Header/Header';
import Middle from '../Middle/Middle';
import Slider from '../Slider/Slider';
import './Application.css';

// initialization
store.dispatch(updateImages);
store.dispatch(updateEntities);

const Application = () => (
  <Provider store={store}>
    <Router>
      <Header data-test="header" />
      <Route path="/:imgName?">
        <Middle data-test="middle" />
        <Slider data-test="slider" />
      </Route>
    </Router>
  </Provider>
);

export default Application;
