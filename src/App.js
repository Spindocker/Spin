import React, { Component } from 'react';
import ComponentsArea from './ComponentsArea';
import Controls from './Controls';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: [],
      filePath: '',
    };
    this.showIds = this.showIds.bind(this);
    this.ps = this.ps.bind(this);
    this.psa = this.psa.bind(this);
    this.dcup = this.dcup.bind(this);
    this.dcdwn = this.dcdwn.bind(this);
    this.stop = this.stop.bind(this);
    this.handleFilePath = this.handleFilePath.bind(this);
    this.open = this.open.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('item:add', (e, item) => {
      this.setState({
        filePath: item,
      });
    });
  }
  showIds(arr) {
    return this.state.containers.map(container => <div key={container['CONTAINER ID']} className="containers"><p className="containerText">name: {container[' PORTS']}</p></div>);
  }

  handleFilePath(e) {
    e.preventDefault();
    this.setState({
      filePath: e.target[0].value,
    });
  }

  dcps() {
    fetch('/dcps', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

  dcup() {
    fetch('/dcup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        filePath: this.state.filePath,
      }),
    }).then(() => {
      this.ps();
    });
  }

  dcdwn() {
    fetch('/dcdwn', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        filePath: this.state.filePath,
      }),
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

  open(e) {
    e.preventDefault();
    ipcRenderer.send('item:add');
  }


  render() {
    return (
      <div>
        <ComponentsArea
          comIds={this.showIds()}
          currentViewName={this.state.currentViewName}
          filePath={this.state.filePath}
        />
        <Controls
          fp={this.handleFilePath}
          ps={this.ps}
          psa={this.psa}
          dcup={this.dcup}
          dcdwn={this.dcdwn}
          stop={this.stop}
          open={this.open}
        />
      </div>
    );
  }
}

export default App;
