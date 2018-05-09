import React from 'react';
import Button from './Button';
import './Controls.css';

const Controls = ({ composeUp, psa, dcup, dcdown}) => (
  <div id="controlsBar">
    <Button name="ps" click={composeUp} />
    <Button name="ps -a" click={psa} />
    <Button name="dc up" click={dcup} />
    <Button name="dc down" click={dcdown} />
  </div>
);


export default Controls;
