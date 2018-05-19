import React from 'react';
import './Button.css';

const Button = ({ name, click}) => (
  <div>
    <a className="button" onClick={click} >{name}</a>
  </div>
);


export default Button;
