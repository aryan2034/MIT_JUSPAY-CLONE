import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const MotionBlock = ({ id, index, type, value, onChange }) => {
  const renderInput = () => {
    switch (type) {
      case 'MOVE':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-16 px-2 py-1 rounded bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="steps"
          />
        );
      case 'TURN':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-16 px-2 py-1 rounded bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="degrees"
          />
        );
      case 'GOTO':
        return (
          <div className="flex gap-2">
            <input
              type="number"
              value={value.x}
              onChange={(e) => onChange({ ...value, x: e.target.value })}
              className="w-16 px-2 py-1 rounded bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="x"
            />
            <input
              type="number"
              value={value.y}
              onChange={(e) => onChange({ ...value, y: e.target.value })}
              className="w-16 px-2 py-1 rounded bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="y"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const getBlockColor = () => {
    switch (type) {
      case 'MOVE':
        return 'bg-blue-500';
      case 'TURN':
        return 'bg-green-500';
      case 'GOTO':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${getBlockColor()} text-white rounded-lg p-3 mb-2 shadow-lg transform transition-all duration-200 hover:scale-105`}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {type === 'MOVE' && 'Move'}
              {type === 'TURN' && 'Turn'}
              {type === 'GOTO' && 'Go to'}
            </span>
            {renderInput()}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default MotionBlock; 