import React from 'react';
import './ComponentsArea.css';

const ComponentsArea = ({ comIds, currentViewName, filePath }) => (
  <div>
    <div id="componentView">
      <div id="headline">
        <div id="filePathDisplay"><p>Current Directory: {filePath}</p></div>
        <h1 id="title">{currentViewName}</h1>
      </div>
      {comIds}
    </div>
  </div>
);


export default ComponentsArea;
