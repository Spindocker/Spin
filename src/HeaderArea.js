import React from 'react';
import PropTypes from 'prop-types';
import './HeaderArea.css';

const HeaderArea = ({
  name, clear, actionBtnClicked, deleteDirectory,
}) => {
  let clearBtn = null;
  let deleteBtn = null;
  if (name === 'Saved directories') {
    clearBtn = <button id="clearHistory" onClick={clear}>Clear history</button>;
    if (actionBtnClicked) deleteBtn = <button className="actionBtn" onClick={deleteDirectory} >Delete</button>;
  }
  if (actionBtnClicked) deleteBtn = <button className="actionBtn">Delete</button>;
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

HeaderArea.propTypes = {
  name: PropTypes.string.isRequired,
  clear: PropTypes.func.isRequired,
  actionBtnClicked: PropTypes.bool.isRequired,
  deleteDirectory: PropTypes.func.isRequired,
};

export default HeaderArea;
