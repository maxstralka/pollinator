import React from 'react';
import ReactDOM from 'react-dom';
import Api from 'api/Api';
import App from 'app/App';
import registerServiceWorker from 'registerServiceWorker';
import constants from 'helper/constants';

// Init API with mock endpoint
const api = new Api(constants.api.url.mock);

const AppComponent = () => (
  <App
    api={Object.seal(api)}
  />
);

ReactDOM.render(<AppComponent />, document.getElementById('root'));
registerServiceWorker();
