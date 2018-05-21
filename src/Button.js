import React from 'react';
import './Button.css';

const Button = ({ name, click}) => (
  <div>
    <button className="button" onClick={click}>{name}</button>
  </div>
);

export default Button;
