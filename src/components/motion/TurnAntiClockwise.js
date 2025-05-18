import React, { useState } from "react";
import { connect } from "react-redux";
import { setCharacterAngle } from "../../redux/character/actions";
import UndoIcon from "@material-ui/icons/Undo";
import Paper from "@material-ui/core/Paper";

const TurnAntiClockWise = ({ character, characterAngle, comp_id }) => {
  const [angle, setAngle] = useState(0);

  // handle anti-clockwise rotation
  const handleClick = () => {
    let anti_angle = -1 * angle;
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find(
      (x) => x.id === character.active
    );
    if (character_angle) {
      el.style.transform = `rotate(${character_angle.angle + anti_angle}deg)`;
      characterAngle(character_angle.angle + anti_angle);
    }
  };

  return (
    <Paper elevation={3} className="bg-gray-800">
      <div className="text-center rounded-lg bg-blue-600 p-3 my-3 shadow-lg">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-white font-medium">Rotate By:</div>
          <input
            className="text-white bg-gray-700 px-3 py-1 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            type="number"
            value={angle}
            onChange={(e) => {
              setAngle(parseInt(e.target.value));
            }}
          />
        </div>
        <div
          id={comp_id}
          className="flex bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-800 transition-all duration-200 shadow-md"
          onClick={() => handleClick()}
        >
          <div className="flex items-center justify-center gap-2 mx-auto">
            <span>Turn</span>
            <UndoIcon className="text-lg" />
            <span>{angle} degrees</span>
          </div>
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

// mapping function to component
const mapDispatchToProps = (dispatch) => {
  return {
    characterAngle: (angle) => dispatch(setCharacterAngle(angle)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnAntiClockWise);
