import React from 'react';
import './HeaderArea.css';

const HeaderArea = ({ name, clear }) => {
  let button = null;
  if (name === 'Saved directories') button = <button id="clearHistory" onClick={clear}>Clear history</button>;
  return (
    <div>
      <div id="header">
        {button}
      </div>
    </div>
  );
};

export default HeaderArea;
