import React, { Component } from "react";
import ReactDOM from "react-dom";
// import { HashRouter, Route, browserHistory, Switch } from "react-router-dom";
import Header from "./components/Header";
import Form from "./components/Form";
import Footer from "./components/Footer";
import registerServiceWorker from "./registerServiceWorker";
import "normalize.css";
import "./index.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Form />
        <Footer />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
