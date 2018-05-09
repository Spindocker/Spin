import React, { Component } from 'react';
import ComponentsArea from './ComponentsArea';
import Controls from './Controls';
import './ComponentsArea.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: [],
    };
    this.showIds = this.showIds.bind(this);
    this.composeUp = this.composeUp.bind(this);
    this.psa = this.psa.bind(this);
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

  showIds(arr) {
    return this.state.containers.map(container => <p key={container['CONTAINER ID']} className="containers">Container ID: {container['CONTAINER ID']}</p>);
  }

  composeUp() {
    fetch('/docker-ps', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((data) => {
        this.setState({
          containers: data,
        });
        console.log(this.state.containers);
      });
  }

  psa() {
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

      <form id="filePathForm" action="/dcfolder" method="POST">
      <input id="filePathInput" name="filePath" placeholder="file path" type="text" />
      <button id="submit" type="submit">Submit file path</button>
    </form>
        <ComponentsArea comIds={this.showIds()} />
        <Controls composeUp={this.composeUp} psa={this.psa} />
      </div>
    );
  }
}

export default App;
