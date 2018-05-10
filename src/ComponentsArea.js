import React from 'react';
import './ComponentsArea.css';

const ComponentsArea = ({ comIds, currentViewName }) => (
  <div>
    <div id="componentView">
    <h1 id="title">{currentViewName}</h1>
      {comIds}
    </div>
  </div>
);


export default ComponentsArea;
