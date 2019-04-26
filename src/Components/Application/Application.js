import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

const Application = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Route path="/:imgName">
        <Middle />

        <Slider />
      </Route>
    </Router>
  </Provider>
);

export default Application;
