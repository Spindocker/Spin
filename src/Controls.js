import React from 'react';
import Button from './Button';
import './Controls.css';

const Controls = ({ ps, psa, dcup, stop, fp, open, dcdwn, directories }) => (
  <div id="controlsBar">
    <button id="openFolder" onClick={open} >Browse</button>
    <Button name="Online / Composed Containers" click={ps} />
    <Button name="All Containers" click={psa} />
    <Button name="Compose Up" click={dcup} />
    <Button name="Compose Down" click={dcdwn} />
    <Button name="Stop Containers" click={stop} />
    <Button name="Saved Directories" click={directories} />
  </div>
);


export default Controls;
