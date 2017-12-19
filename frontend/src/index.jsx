import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Segment, Label, Menu, activeItem, Input} from 'semantic-ui-react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App.jsx'
import reducers from './reducers';
import reduxThunk from 'redux-thunk'
//reduxThunk gives us the access to the Dispatch function!
//Dispatch function: send every action to its reducer

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

  ReactDom.render(
      <Provider store = {store}><App /></Provider>,
      document.getElementById('react-app')
  );
