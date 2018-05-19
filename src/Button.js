import React from 'react';
import './Button.css';

const Button = ({ name, click}) => (
  < div className = "button" >
    <a  onClick={click} >{name}</a>
  </div>
);

export default Button;
