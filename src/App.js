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
      images: [],
      actionBtnClicked: false,
    };
    this.showIds = this.showIds.bind(this);
    this.ps = this.ps.bind(this);
    this.psa = this.psa.bind(this);
    this.dcup = this.dcup.bind(this);
    this.dcdwn = this.dcdwn.bind(this);
    this.stop = this.stop.bind(this);
    this.handleFilePath = this.handleFilePath.bind(this);
    this.open = this.open.bind(this);
    this.getDirectories = this.getDirectories.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.setFilePath = this.setFilePath.bind(this);
    this.getImages = this.getImages.bind(this);
    this.showImages = this.showImages.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('item:add', (e, item) => {
      let size = 0;
      storage.getAll((err, data) => {
        if (err) throw err;
        size = Object.values(data).length;
        let flag = true;
        const arr = Object.values(data);
        arr.forEach((obj) => {
          if (obj.path === item) flag = false;
        });
        if (flag) {
          storage.set(String(size), { path: item }, (error) => {
            if (error) throw error;
            if (this.state.currentViewName === 'Saved directories') {
              const { directories } = this.state;
              directories.push(<li key={size} ><button className="directoryItem" onClick={this.setFilePath} >{item}</button></li>);
              this.setState({
                directories,
              });
            }
          });
        }
        this.setState({
          filePath: item,
        });
      });
    });
  }

  getDirectories() {
    storage.getAll((error, data) => {
      if (error) throw error;
      const arr = Object.values(data);
      const directories = arr.map((path, i) => <li key={i}><button className="directoryItem" onClick={this.setFilePath}>{path.path}</button></li>);
      this.setState({
        containers: [],
        currentViewName: 'Saved directories',
        directories,
        images: [],
      });
    });
  }

  setFilePath(e) {
    const filePath = e.target.innerHTML;
    this.setState({
      filePath,
      actionBtnClicked: true,
    });
  }

  getImages() {
    fetch('/getImages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          currentViewName: 'Images',
          containers: [],
          directories: [],
          images: data,
        });
      });
  }

  clearHistory() {
    storage.clear((err) => {
      if (err) throw err;
    });
    this.setState({
      directories: [],
    });
  }

  showIds() {
    return this.state.containers.map(container => <div key={container['CONTAINER ID']} className="containers"><p className="containerText">name: {container[' NAMES']}</p></div>);
  }

  showImages() {
    return this.state.images.map(img => (
      <div key={img[' IMAGE ID']} className="images">
        <p className="imageText">
          Name: {img.REPOSITORY}
          <br />
          Tag: {img[' TAG']}
          <br />
          Image ID: {img[' IMAGE ID']}
          <br />
          Created: {img[' CREATED']}
          <br />
          Size: {img[' SIZE']}
        </p>
      </div>
    ));
  }

  handleFilePath(e) {
    e.preventDefault();
    this.setState({
      filePath: e.target[0].value,
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
        console.log(data);
        this.setState({
          containers: data,
          currentViewName: 'Containers online',
          directories: [],
          images: [],
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
        console.log(data);
        this.setState({
          containers: data,
          currentViewName: 'All containers',
          directories: [],
          images: [],
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
    }).then(() => {
      this.psa();
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
        images: [],
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
          actionBtnClicked={this.state.actionBtnClicked}
          showImages={this.showImages()}
        />
        <Controls
          fp={this.handleFilePath}
          ps={this.ps}
          psa={this.psa}
          dcup={this.dcup}
          dcdwn={this.dcdwn}
          stop={this.stop}
          open={this.open}
          file={this.state.filePath}
          directories={this.getDirectories}
          getImages={this.getImages}
        />
      </div>
    );
  }
}

export default App;
