import React, { useState, useEffect } from 'react';
import rgbToHex from './utils';

const SingleColor = ({ weight, rgb, type }) => {
  const [alert, setAlert] = useState(false);

  const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

  const handleClick = () => {
    setAlert(true);
    navigator.clipboard.writeText(hex);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  return (
    <article
      className={type === 'tint' ? 'color-square color-light' : 'color-square'}
      style={{ backgroundColor: `${hex}` }}
      onClick={handleClick}
    >
      <div className='color-square-info'>
        <p>{weight}%</p>
        <p>{hex}</p>
        {alert && <p className='alert'>copied to clipboard</p>}
      </div>
    </article>
  );
};

export default SingleColor;
