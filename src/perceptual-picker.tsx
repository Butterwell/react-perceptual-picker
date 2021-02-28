import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { grid } from "./grid";

const PerceptualPicker = (props) => {
  // The entire display is oriented on perceptiable distance from
  // the color in the center.
  const [centerColor, setCenterColor] = useState(props.centerColor);

  // Only report a change if the centerColor changes
  const cache = useRef({ centerColor });
  useEffect(() => {
    if (cache.current.centerColor != centerColor) {
      cache.current = centerColor;
      props.onChange(centerColor);
    }
  }, [centerColor]);

  const grids = grid(centerColor, props.spread);

  const squareSize = "34px";
  const blockStyle = {
    width: squareSize,
    height: squareSize,
    display: "inline-block",
  };

  const rowStyle = {
    height: squareSize,
  };

  const gridStyle = {
    display: "inline-block",
    marginRight: "1px",
    marginLeft: "1px",
  };

  function renderGrid(grid, key) {
    return (
      <div key={key} style={gridStyle}>
        {grid.map((r, i) => (
          <div key={(i * 1000).toString() + key} style={rowStyle}>
            {r.map((c, j) => (
              <div
                key={(i * 1000 + j + 1).toString() + key}
                style={{ ...blockStyle, backgroundColor: c.toString() }}
                onClick={() => setCenterColor(c.toString())}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      {renderGrid(grids.La, "La")}
      {renderGrid(grids.ab, "ab")}
      {renderGrid(grids.Lb, "Lb")}
    </div>
  );
};

PerceptualPicker.propTypes = {
  centerColor: PropTypes.string,
  onChange: PropTypes.func,
  spread: PropTypes.number,
};

PerceptualPicker.defaultProps = {
  centerColor: "rgb(127,127,127)",
  onChange: undefined,
  spread: 4,
};

export default PerceptualPicker;
