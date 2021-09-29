import React, { useState } from 'react';
import { GrClose } from 'react-icons/gr';

export const Modal = ({ showModal, setShowModal, colorList }) => {
  const [cssVar, setCssVar] = useState('');
  const [copyAlert, setCopyAlert] = useState(false);
  const [copyError, setCopyError] = useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyAlert(false);
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, [copyAlert]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyError(false);
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [copyError]);

  React.useEffect(() => {
    setCopyError(false);
  }, [cssVar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cssVar === '') {
      setCopyError(true);
    } else {
      const mainColor = colorList.find((color) => color.type === 'base');
      const tints = colorList.filter((color) => color.type === 'tint');
      const shades = colorList.filter((color) => color.type === 'shade');
      const textToCopy = [mainColor, ...tints, ...shades].reduce(
        (acc, current, index) => {
          if (index === 0) {
            return (
              acc +
              '/*main color*/ \n \n' +
              `--${cssVar}-main: #${current.hex}; /* weight: ${current.weight}% */ \n`
            );
          } else if (index === 1) {
            return (
              acc +
              '\n' +
              '/*tints of main color*/ \n \n' +
              `--${cssVar}-${index}: #${current.hex}; /* weight: ${current.weight}% */ \n`
            );
          } else if (index < 11) {
            return (
              acc +
              `--${cssVar}-${index}: #${current.hex}; /* weight: ${current.weight}% */ \n`
            );
          } else if (index === 11) {
            return (
              acc +
              '\n' +
              '/*shades of main color*/ \n \n' +
              `--${cssVar}-${index}: #${current.hex}; /* weight: ${current.weight}% */ \n`
            );
          } else {
            return (
              acc +
              `--${cssVar}-${index}: #${current.hex}; /* weight: ${current.weight}% */ \n`
            );
          }
        },
        ''
      );
      navigator.clipboard.writeText(textToCopy);
      setCopyAlert(true);
    }
  };

  return (
    <>
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <button
              className='modal-close-btn'
              onClick={() => setShowModal(false)}
            >
              <GrClose />
            </button>
            <form className='modal-search-bar' onSubmit={handleSubmit}>
              <h3>Create variables</h3>
              <p>
                Insert your variable name below to generate a CSS variable for
                your main color and each tint and shade based in the variable
                name you provide.
              </p>

              <h4>Variable name</h4>
              <input
                style={
                  copyError
                    ? { border: '1.5px solid #d52a2a', color: 'red' }
                    : { border: '1.5px solid rgb(167, 166, 166)' }
                }
                type='text'
                placeholder='clr-primary'
                value={cssVar}
                onChange={(e) => setCssVar(e.target.value)}
              />
              <button className='btn' type='submit'>
                {copyAlert ? 'Copied to clipboard!' : 'Copy variables'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
