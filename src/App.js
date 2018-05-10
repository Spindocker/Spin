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
    this.ps = this.ps.bind(this);
    this.psa = this.psa.bind(this);
    this.dcup = this.dcup.bind(this);
    this.dcdwn = this.dcdwn.bind(this);
    this.dcps = this.dcps.bind(this);
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

  dcup() {
    fetch('/dcup', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  dcdwn() {
    fetch('/dcdwn', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  dcps() {
    fetch('/dcps', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  
  ps() {
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
          <input id="filePathInput" name="filePath" placeholder="filepath" type="text" />
          <button id="submit" type="submit">Submit file path</button>
        </form>

        <ComponentsArea comIds={this.showIds()} />
        <Controls
          ps={this.ps}
          psa={this.psa}
          dcup={this.dcup}
          dcdwn={this.dcdwn}
        />
      </div>
    );
  }
}

export default App;
