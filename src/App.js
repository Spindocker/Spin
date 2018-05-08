import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: [],
    };
  }

  componentDidMount() {
    fetch('/psa', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((data) => {
        this.setState({
          containers: data,
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Compose GUI</h1>
        ${this.state.containers}
      </div>
    );
  }
}

export default App;
