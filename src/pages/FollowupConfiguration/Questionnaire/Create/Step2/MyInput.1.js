import React from 'react';

const { useRef, useState, useLayoutEffect, useEffect } = React;
function MyInput() {
  const [text, setText] = useState('');
  const [wdith, setWdith] = useState(0);
  const [font, setFont] = useState('');

  const inputRef = useRef();
  const divRef = useRef();

  const onInput = e => {
    setText(e.target.value);
  };

  useLayoutEffect(() => {
    const styles = getComputedStyle(divRef.current);
    // console.log(styles.width)
    setWdith(styles.width);
  }, [text]);

  useEffect(() => {
    setFont(getComputedStyle(inputRef.current).font);
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ position: 'absolute', height: 0, overflow: 'hidden', font }}>
        {text}
      </div>
      <input
        ref={inputRef}
        onInput={onInput}
        style={{ minWidth: '100px', maxWidth: '500px', width: wdith }}
      />
    </div>
  );
}

export default MyInput;
