import React from 'react';
import Button from './Button';
import './Controls.css';

const Controls = ({ ps, psa, dcup, stop, fp, open }) => (
  <div id="controlsBar">
    <button id="party" className="very-sweet-looking" onClick={open} >Open</button>
    <Button name="Online containers" click={ps} />
    <Button name="All containers" click={psa} />
    <Button name="Compose up" click={dcup} />
    <Button name="Stop containers" click={stop} />
  </div>
);


export default Controls;
