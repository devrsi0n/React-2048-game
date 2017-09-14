import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/styles/normalize.scss';
import './assets/styles/index.scss';
import App from './containers/App';
import store from './store';
import registerServiceWorker from './utils/registerServiceWorker';
// import Firework from './components/Firework';

ReactDOM.render(
  <Provider store={store} >
    <App />
    {/* <Firework /> */}
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
