import React from 'react';

const characters = [
  { id: 'cat', name: 'Cat', icon: '🐱' },
  { id: 'dog', name: 'Dog', icon: '🐕' },
  { id: 'robot', name: 'Robot', icon: '🤖' },
  { id: 'alien', name: 'Alien', icon: '👽' },
  { id: 'ghost', name: 'Ghost', icon: '👻' },
  { id: 'ninja', name: 'Ninja', icon: '🥷' }
];

const CharacterSelector = ({ selectedCharacters, onAddCharacter, onRemoveCharacter }) => {
  return (
    <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-purple-400">Characters</span>
        <span className="text-sm text-gray-400">({selectedCharacters.length}/6)</span>
      </h2>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {characters.map((char) => {
          const isSelected = selectedCharacters.includes(char.id);
          return (
            <button
              key={char.id}
              onClick={() => isSelected ? onRemoveCharacter(char.id) : onAddCharacter(char.id)}
              className={`p-3 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                isSelected 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl">{char.icon}</span>
              <span className="font-medium">{char.name}</span>
              {isSelected && (
                <span className="ml-auto text-sm bg-purple-500 px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-gray-800 rounded-lg p-3">
        <h3 className="text-white font-medium mb-2">Active Characters</h3>
        <div className="flex flex-wrap gap-2">
          {selectedCharacters.map((charId) => {
            const char = characters.find(c => c.id === charId);
            return (
              <div
                key={charId}
                className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{char.icon}</span>
                <span>{char.name}</span>
                <button
                  onClick={() => onRemoveCharacter(charId)}
                  className="ml-2 text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterSelector; 