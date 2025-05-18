import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

// Move Component for Sidebar
const Move = ({ character, comp_id }) => {
  const [steps, setSteps] = useState(0);

  // Function used for moiving Sprint
  const handleClick = () => {
    const el = document.getElementById(`${character.active}-div`);

    var left = el.offsetLeft;
    el.style.position = "relative";
    el.style.left = left + steps + "px";
  };

  return (
    <Paper elevation={3} className="bg-gray-800">
      <div
        id={comp_id}
        className="text-center rounded-lg bg-blue-600 text-white p-3 my-2 text-sm cursor-pointer mx-auto shadow-lg hover:bg-blue-700 transition-all duration-200"
        onClick={() => handleClick()}
      >
        <div className="flex items-center justify-center gap-2">
          <span>Move X</span>
          <input
            type="number"
            className="text-white bg-gray-700 text-center w-16 px-2 py-1 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            value={steps}
            onChange={(e) => setSteps(parseInt(e.target.value))}
          />
          <span>steps</span>
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

export default connect(mapStateToProps)(Move);
