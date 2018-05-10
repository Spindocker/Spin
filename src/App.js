import React, { Component } from 'react';
import ComponentsArea from './ComponentsArea';
import Controls from './Controls';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: [],
    };
    this.showIds = this.showIds.bind(this);
    this.ps = this.ps.bind(this);
    this.psa = this.psa.bind(this);

    this.up = this.up.bind(this);
    this.stop = this.stop.bind(this);
  }

  showIds(arr) {
    return this.state.containers.map(container => <div key={container['CONTAINER ID']} className="containers"><p className="containerText">name: {container[' PORTS']}</p></div>);
  }

  ps() {
    fetch('/docker-ps', {

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
          currentViewName: 'Containers online',
        });
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
          currentViewName: 'All containers',
        });
      });
  }

  up() {
    fetch('/dcup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  stop() {
    fetch('/dcstop', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      this.setState({
        containers: [],
        currentViewName: 'Containers online',
      });
    });
  }

  render() {
    return (
      <div>
        <ComponentsArea comIds={this.showIds()} currentViewName={this.state.currentViewName} />
        <Controls ps={this.ps} psa={this.psa} up={this.up} stop={this.stop} />

      </div>
    );
  }
}

export default App;
