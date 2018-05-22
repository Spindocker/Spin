import React from 'react';
import './Console.css';

const Console = ({ loading }) => (
    <div id="console">
        {loading ? <p id="load-text">Loading...</p> : false}
    </div>
);


export default Console;