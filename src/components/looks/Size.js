import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

const Size = ({ character, comp_id }) => {
  const [state, setState] = useState({
    scale: 1,
  });
  // To change Size of Sprint
  const changeSize = () => {
    const el = document.getElementById(character.active);
    el.style.transform = `scale(${state.scale})`;
  };

  return (
    <Paper elevation={3} className="bg-gray-800">
      <div className="text-center rounded-lg bg-purple-600 p-3 my-3 shadow-lg">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-white font-medium">Size:</div>
          <input
            className="text-white bg-gray-700 px-3 py-1 rounded-md border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
            type="number"
            value={state.scale}
            onChange={(e) =>
              setState({ ...state, scale: parseInt(e.target.value) })
            }
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-purple-800 transition-all duration-200 shadow-md"
          onClick={() => changeSize()}
        >
          Size {state.scale}
        </div>
      </div>
    </Paper>
  );
};

// mapping state to component
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(Size);
