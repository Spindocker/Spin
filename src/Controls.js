import React from 'react';
import Button from './Button';
import './Controls.css';

const Controls = ({ ps, psa, dcup, stop, fp }) => (
  <div id="controlsBar">
    <form id="filePathForm" onSubmit={fp}>
      <input id="filePathInput" name="filePath" placeholder="file path" type="text" />
      <br />
      <button id="submit" type="submit">Submit file path</button>
    </form>
    <Button name="Online containers" click={ps} />
    <Button name="All containers" click={psa} />
    <Button name="Compose up" click={dcup} />
    <Button name="Stop containers" click={stop} />
  </div>
);


export default Controls;
