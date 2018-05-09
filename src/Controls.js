import React from 'react';
import Button from './Button';
import './Controls.css';

const Controls = ({ composeUp, psa}) => (
  <div id="controlsBar">
    <Button name="ps" click={composeUp} />
    <Button name="ps -a" click={psa} />
  </div>
);


export default Controls;
