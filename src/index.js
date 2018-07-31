import React, { Component } from "react";
import ReactDOM from "react-dom";
// import { HashRouter, Route, browserHistory, Switch } from "react-router-dom";
import Form from "./components/form";
import registerServiceWorker from "./registerServiceWorker";
import "normalize.css";
import "./index.css";

class App extends Component {
  render() {
    return (
      <div>
        <Form />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
