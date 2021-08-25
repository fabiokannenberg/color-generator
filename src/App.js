import React, { useState } from 'react';
import SingleColor from './SingleColor';
import { BiSearch } from 'react-icons/bi';
import { Modal } from './Modal';

import Values from 'values.js';

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [colorList, setColorList] = useState(new Values('#f15025').all(10));
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setError(false);
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  React.useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  const validateColor = () => {
    const isColor = (strColor) => {
      const s = new Option().style;
      s.color = strColor;
      return s.color !== '';
    };

    if (!isColor(color) && color[0] !== '#' && color) {
      setColor('#' + color);
      return '#' + color;
    }
    return color;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setError(false);
      let colors = new Values(validateColor(color)).all(10);
      setColorList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleCreateVariables = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSurprise = () => {
    const hexRandomizer = () => {
      const baseArray = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
      ];
      let hexArray = [];
      for (let i = 0; i < 6; i++) {
        const value = Math.floor(Math.random() * 16);
        hexArray.push(baseArray[value]);
      }
      return '#' + hexArray.join('');
    };
    const newColor = hexRandomizer();
    setColor(newColor);
    try {
      setError(false);
      let colors = new Values(newColor).all(10);
      setColorList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const colorListMiddle = Math.floor(colorList.length / 2);

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        colorList={colorList}
      />
      <header className='page-title'>
        <h1>Color Generator</h1>
        <form
          className={`${
            error ? 'search-bar shadow error' : 'search-bar shadow'
          }`}
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            placeholder='#f15025'
          />
          <button className='btn' type='submit'>
            <div>
              <BiSearch className='icon' />
              <span>Submit</span>
            </div>
          </button>
        </form>
        <div className='btn-container'>
          <button className='btn-secondary' onClick={handleSurprise}>
            Surprise me
          </button>
          <button className='btn-secondary' onClick={handleCreateVariables}>
            Create variables
          </button>
        </div>
      </header>
      <main>
        <section>
          <h2>Main Color</h2>
          <div className='main-color-container'>
            <SingleColor {...colorList[colorListMiddle]} />
          </div>
        </section>
        <section>
          <h2>Tints</h2>
          <div className='color-container'>
            {colorList.slice(0, colorListMiddle).map((color, index) => {
              return <SingleColor key={index} {...color} />;
            })}
          </div>
        </section>
        <section>
          <h2>Shades</h2>
          <div className='color-container'>
            {colorList.slice(colorListMiddle + 1).map((color, index) => {
              return <SingleColor key={index} {...color} />;
            })}
          </div>
        </section>
        <footer className='footer'></footer>
      </main>
    </>
  );
}

export default App;
