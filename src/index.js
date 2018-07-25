import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from './components/form';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css';
import './index.css';

class App extends Component {
  render() {
    return (
        <Form />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
