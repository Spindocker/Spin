import React, { Component } from 'react';
import ComponentsArea from './ComponentsArea';
import Controls from './Controls';
import Console from './Console';

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
      composed: [],
      loading: true,
    };

    this.showIds = this.showIds.bind(this);
    this.ps = this.ps.bind(this);
    this.psa = this.psa.bind(this);
    this.dcps = this.dcps.bind(this);
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
    this.deleteDirectory = this.deleteDirectory.bind(this);
    this.composedInfo = this.composedInfo.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: false });
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
      const directories = arr.map((path, i) => (
        <li key={i}><button className="directoryItem" onClick={this.setFilePath}>{path.path}</button></li>
      ));
      this.setState({
        containers: [],
        currentViewName: 'Saved directories',
        composed: [],
        directories,
        images: [],
        actionBtnClicked: false,
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
        this.setState({
          currentViewName: 'Images',
          containers: [],
          directories: [],
          images: data,
          actionBtnClicked: false,
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

  deleteDirectory(e) {
    // console.log(e);
    // console.log('wtf');
  }

  showIds() {
    return this.state.containers.map(container => (
      <div key={container['CONTAINER ID']} className="containers">
        <p className="containerText">
          Name: {container[' NAMES']}
          <br />
          Image: {container[' IMAGE']}
          <br />
          ID: {container['CONTAINER ID']}
          <br />
          Created: {container[' CREATED']}
          <br />
          Status: {container[' STATUS']}
        </p>
      </div>
    ));
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

  composedInfo() {
    if (this.state.composed.length > 0) {
      return (
        <div>
          <h3 className="contLabel">Composed</h3>
          <div className="composeBox">
            {this.state.composed.map(container =>
              <div key={container['Name']} className="containers">
                <p className="containerText">Name: {container['Name']}</p>
                <p className="containerText">Ports: {container['Ports']}</p>
              </div>
            )}
          </div>
        </div>
      )
    }
  }

  handleFilePath(e) {
    e.preventDefault();
    this.setState({
      filePath: e.target[0].value,
    });
  }

  dcps() {
    fetch('/dcps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filePath: this.state.filePath,
      }),
    }).then(res => res.json())
      .then((data) => {
        this.ps();
        this.setState({
          composed: data,
          currentViewName: 'Containers online',
          directories: [],
        });
        console.log(this.state.composed);
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
          actionBtnClicked: false,
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
          actionBtnClicked: false,
        });
      });
  }

  dcup() {
    this.setState({ loading: true });
    fetch('/dcup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        filePath: this.state.filePath,
      }),
    }).then(() => {
      this.dcps();
      this.setState({
        loading: false,
      });
    });
  }

  dcdwn() {
    this.setState({ loading: true });
    fetch('/dcdwn', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        filePath: this.state.filePath,
      }),
    }).then(() => {
      this.setState({
        composed: [],
        containers: [],
        loading: false,
      });
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
        actionBtnClicked: false,
        composed: [],
      });
    });
  }

  open(e) {
    e.preventDefault();
    ipcRenderer.send('item:add');
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <ComponentsArea
          comIds={this.showIds()}
          composedInfo={this.composedInfo()}
          currentViewName={this.state.currentViewName}
          filePath={this.state.filePath}
          clear={this.clearHistory}
          directories={this.state.directories}
          actionBtnClicked={this.state.actionBtnClicked}
          showImages={this.showImages()}
          deleteDirectory={this.deleteDirectory}
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
        <Console loading={loading} />
      </div>)
  }
}

export default App;
