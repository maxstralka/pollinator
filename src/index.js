import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Api from 'api/Api';
import App from 'app/App';
import registerServiceWorker from 'registerServiceWorker';
import constants from 'helper/constants';

// Init api with production endpoint
const api = new Api(constants.api.url.production);

ReactDOM.render(<App api={api} />, document.getElementById('root'));
registerServiceWorker();
