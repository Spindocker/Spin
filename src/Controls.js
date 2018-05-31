import React from 'react';
import Button from './Button';
import './Controls.css';

const Controls = ({ ps, psa, dcup, stop, fp, open, dcdwn, directories, getImages }) => (
  <div id="controlsBar">
    <button id="openFolder" onClick={open} >Browse</button>
    <p className="categoriesText">Views</p>
    <Button name="Online containers" click={ps} />
    <Button name="All containers" click={psa} />
    <Button name="Images" click={getImages} />
    <Button name="Saved directories" click={directories} />
    <br />
    <p className="categoriesText">Actions</p>
    <Button name="Compose up" click={dcup} />
    <Button name="Compose down" click={dcdwn} />
    <Button name="Stop containers" click={stop} />
  </div>
);


export default Controls;
