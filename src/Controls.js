import React from 'react';
import Button from './Button';
import './Controls.css';

const Controls = ({ ps, psa, dcup, stop, fp, file, dcps}) => (
  <div id="controlsBar">
    <form id="filePathForm" onSubmit={fp}>
      <input id="filePathInput" name="filePath" placeholder="file path" type="text" />
      <br />
      <button id="submit" type="submit">Submit file path</button>
    </form>
    <Button name="ps" click={ps} file={file}/>
    <Button name="docker-compose ps" click={dcps} file={file}/>
    <Button name="ps -a" click={psa} />
    <Button name="dcup" click={dcup} />
    <Button name="stop" click={stop} />
  </div>
);


export default Controls;
