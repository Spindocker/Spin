import React from 'react';
import './ComponentsArea.css';
import HeaderArea from './HeaderArea';

const ComponentsArea = ({ comIds, currentViewName, filePath, clear, directories }) => (
  <div>
    <HeaderArea name={currentViewName} clear={clear} />
    <div id="headline">
      <div id="filePathDisplay"><p>Current Directory: {filePath}</p></div>
      <h2 id="title">{currentViewName}</h2>
    </div>
    <div id="componentView">
      {comIds}
      <ul id="directoryList">{directories}</ul>
    </div>
  </div>
);


export default ComponentsArea;
