import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/App';

// Api mock 
const api = {
  getQuestionsCollection: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App api={api} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
