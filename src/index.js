import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/styles/normalize.css';
import './assets/styles/index.css';
import App from './containers/App';
import store from './store';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
