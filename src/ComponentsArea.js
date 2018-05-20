import React from 'react';
import './ComponentsArea.css';
import HeaderArea from './HeaderArea';

const ComponentsArea = ({ comIds, currentViewName, filePath, clear, directories }) => (
  <div>
    <div id="componentView">
      <HeaderArea name={currentViewName} clear={clear} />
      <div id="headline">
        <div id="filePathDisplay"><p>Current Directory: {filePath}</p></div>
        <h1 id="title">{currentViewName}</h1>
      </div>
      {comIds}
      <ul>{directories}</ul>
    </div>
  </div>
);


export default ComponentsArea;
