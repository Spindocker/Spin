import React from 'react';
import './HeaderArea.css';

const HeaderArea = ({ name, clear, actionBtnClicked }) => {
  let clearBtn = null;
  let deleteBtn = null;
  if (name === 'Saved directories') {
    clearBtn = <button id="clearHistory" onClick={clear}>Clear history</button>;
    if (actionBtnClicked) deleteBtn = <button className="actionBtn">Delete</button>;
  }
  // if (name === 'Images') button = <button className="containerImgBtn" >Start</button>;
  // if (name === 'All containers') button = <button className="containerImgBtn" >Start</button>;
  return (
    <div>
      <div id="header">
        {deleteBtn}
        {clearBtn}
      </div>
    </div>
  );
};

export default HeaderArea;
