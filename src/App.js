import React, { Component } from 'react';
import ComponentsArea from './ComponentsArea';
import './ComponentsArea.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: [],
    };
    this.showIds = this.showIds.bind(this);
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
    return this.state.containers.map(container => <p className="containers">Container ID: {container['CONTAINER ID']}</p>);
  }

  render() {
    return (
      <div>
        <ComponentsArea comIds={this.showIds()} />
      </div>
    );
  }
}

export default App;
