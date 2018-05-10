import React from 'react';
import Button from './Button';
import './Controls.css';

const Controls = ({ ps, psa, up }) => (
  <div id="controlsBar">
    <form id="filePathForm" action="/sendFilePath" method="POST">
      <input id="filePathInput" name="filePath" placeholder="file path" type="text" />
      <br />
      <button id="submit" type="submit">Submit file path</button>
    </form>
    <Button name="ps" click={ps} />
    <Button name="ps -a" click={psa} />
    <Button name="up" click={up} />
  </div>
);


export default Controls;
