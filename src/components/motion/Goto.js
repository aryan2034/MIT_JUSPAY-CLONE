import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

const GotoXY = ({ character, comp_id }) => {
  const [state, setState] = useState({
    goto_x: 0,
    goto_y: 0,
  });

  // go to posiiton X and Y
  const gotoXY = () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.position = "relative";
    el.style.left = state.goto_x + "px";
    el.style.top = state.goto_y + "px";
  };
  return (
    <Paper elevation={3} className="bg-gray-800">
      <div className="text-center rounded-lg bg-blue-600 p-3 my-3 shadow-lg">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-white font-medium">X:</div>
          <input
            className="text-white bg-gray-700 px-3 py-1 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            type="number"
            value={state.goto_x}
            onChange={(e) => {
              parseInt(e.target.value) !== 0 &&
                setState({ ...state, goto_x: parseInt(e.target.value) });
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-white font-medium">Y:</div>
          <input
            className="text-white bg-gray-700 px-3 py-1 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            type="number"
            value={state.goto_y}
            onChange={(e) => {
              parseInt(e.target.value) !== 0 &&
                setState({ ...state, goto_y: parseInt(e.target.value) });
            }}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-800 transition-all duration-200 shadow-md"
          onClick={() => gotoXY()}
        >
          Go to X: {state.goto_x} Y: {state.goto_y}
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

export default connect(mapStateToProps)(GotoXY);
