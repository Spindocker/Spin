import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: []
    };
  }

  componentDidMount() {
    fetch('/psa', {
      method: 'GET',
      headers: ({
        'Content-Type': 'application/json'
      })
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      this.setState({
        containers: data
      })
      console.log(this.state.containers)
    })
  }

  // componentDidUpdate() {
  //   console.log(this.state)
  // }

  render() {
    return (
      <div>
        <h1>Compose GUI</h1>
        {
          this.state.containers.map(container => {
            return <p>{container['CONTAINER ID']}</p>
          })
        }
      </div>
    );
  }
}

export default App;
