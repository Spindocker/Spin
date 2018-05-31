import React from 'react';
import './Console.css';

const Console = ({ loading }) => (
    <div>
      { loading ? <div id="console"><p id="load-text">Loading...</p></div> : false }
    </div>
);

export default Console;
