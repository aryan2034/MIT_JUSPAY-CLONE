import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const LooksBlock = ({ id, index, type, value, onChange }) => {
  const renderInput = () => {
    switch (type) {
      case 'SAY':
        return (
          <div className="flex gap-2">
            <input
              type="text"
              value={value.text}
              onChange={(e) => onChange({ ...value, text: e.target.value })}
              className="w-32 px-2 py-1 rounded bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="text"
            />
            <input
              type="number"
              value={value.duration}
              onChange={(e) => onChange({ ...value, duration: e.target.value })}
              className="w-16 px-2 py-1 rounded bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="secs"
            />
          </div>
        );
      case 'THINK':
        return (
          <div className="flex gap-2">
            <input
              type="text"
              value={value.text}
              onChange={(e) => onChange({ ...value, text: e.target.value })}
              className="w-32 px-2 py-1 rounded bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="text"
            />
            <input
              type="number"
              value={value.duration}
              onChange={(e) => onChange({ ...value, duration: e.target.value })}
              className="w-16 px-2 py-1 rounded bg-gray-100 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="secs"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const getBlockColor = () => {
    switch (type) {
      case 'SAY':
        return 'bg-yellow-500';
      case 'THINK':
        return 'bg-pink-500';
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
              {type === 'SAY' && 'Say'}
              {type === 'THINK' && 'Think'}
            </span>
            {renderInput()}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default LooksBlock; 