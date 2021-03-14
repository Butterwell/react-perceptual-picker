import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useMediaPredicate } from "react-media-hook";
import { ThreeWindowPicker } from "../../src";

function getBrightness(color) {
    const strings = color.match(/\d+/g);
    const rgb = strings.map((n) => +n)
    return 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]
}

const Demo = () => {

  const bigEnough = useMediaPredicate("(min-width: 1000px)");
    
  const [color, setColor] = useState("rgb(127,127,127)");

  const getTextColor = (c) => getBrightness(c) > 128 ? "black" : "white"

  let textColor = getTextColor(color)

  const handleChange = (color: string) => {
    setColor(color);
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;
    textColor = getTextColor(color)
  }, [color]);

  return (
    <div style={{color: textColor}}>
        <h1 style={{textAlign: 'center'}}>
            React Perceptual Picker
        </h1>
        <h2 style={{textAlign: 'center'}}>
            A color picker component using Oklab for React and Preact apps
        </h2>
        <h3 style={{textAlign: 'center'}}>
            Tap on any square to select that color
        </h3>
        
        <div style={{textAlign: 'center'}}>
            <ThreeWindowPicker onChange={handleChange} centerColor={color} row={bigEnough}/>
        </div>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));