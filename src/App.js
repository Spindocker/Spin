import React, { Component } from 'react';
import keyIndex from 'react-key-index';
import ComponentsArea from './ComponentsArea';
import Controls from './Controls';

const { ipcRenderer } = window.require('electron');
const storage = window.require('electron-json-storage');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: [],
      filePath: '',
      directories: [],
    };
    this.showIds = this.showIds.bind(this);
    this.ps = this.ps.bind(this);
    this.dcps = this.dcps.bind(this);
    this.psa = this.psa.bind(this);
    this.dcup = this.dcup.bind(this);
    this.dcdwn = this.dcdwn.bind(this);
    this.stop = this.stop.bind(this);
    this.handleFilePath = this.handleFilePath.bind(this);
    this.open = this.open.bind(this);
    this.getDirectories = this.getDirectories.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.setFilePath = this.setFilePath.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('item:add', (e, item) => {
      let size = 0;
      storage.getAll((err, data) => {
        if (err) throw err;
        size = Object.values(data).length;
        storage.set(String(size), { path: item }, (error) => {
          if (error) throw error;
        });
      });

      this.setState({
        filePath: item,
      });
    });
  }

  getDirectories() {
    storage.getAll((error, data) => {
      if (error) throw error;
      const arr = Object.values(data);
      const directories = arr.map((path, i) => <li key={i} className="directoryItem" onClick={this.setFilePath}>{path.path}</li>);
      this.setState({
        containers: [],
        currentViewName: 'Saved directories',
        directories,
      });
    });
  }

  setFilePath(e) {
    const filePath = e.target.innerHTML;
    this.setState({
      filePath,
    });
    console.log(filePath);
  }

  clearHistory() {
    storage.clear((err) => {
      if (err) throw err;
    });
    this.setState({
      directories: [],
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
    fetch('/docker-composeps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({filepathFetch: this.state.filePath}),
    }).then(res => res.json())
      .then((data) => {
        this.setState({
          containers: data,
          currentViewName: 'Containers online',
        });
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
          directories: [],
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
          directories: [],
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
        directories: [],
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
          clear={this.clearHistory}
          directories={this.state.directories}
        />
        <Controls
          dcps={this.dcps}
          fp={this.handleFilePath}
          ps={this.ps}
          psa={this.psa}
          dcup={this.dcup}
          dcdwn={this.dcdwn}
          stop={this.stop}
          open={this.open}
          file={this.state.filePath}
          directories={this.getDirectories}
        />
      </div>
    );
  }
}

export default App;
