import React from 'react';
import './ComponentsArea.css';
import HeaderArea from './HeaderArea';

const ComponentsArea = ({ comIds, currentViewName, filePath, clear, directories, composedInfo }) => (
  <div>
    <HeaderArea name={currentViewName} clear={clear} />
    <div id="headline">
      <div id="filePathDisplay"><p>Current Directory: {filePath}</p></div>
      <h2 id="title">{currentViewName}</h2>
    </div>

    <div id="componentView">
      {/* {console.log(composedInfo)} */}
      {composedInfo}
      {/* <br /> */}
      {comIds}
      <ul id="directoryList">{directories}</ul>
    </div>

    {/* wip */}

  </div>
);


export default ComponentsArea;
