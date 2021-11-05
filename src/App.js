import React, { Component } from 'react';
import './App.css';
import Card from './card/Card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
        <div className="App">
          <Card/>
        </div>
    );
  }

}

export default App;
