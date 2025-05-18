import React, { useState, useEffect } from 'react';

const AnimationManager = ({ sprites, onAnimationUpdate }) => {
  const [animations, setAnimations] = useState({});
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    // Initialize animations for each sprite
    const initialAnimations = {};
    sprites.forEach(sprite => {
      initialAnimations[sprite.id] = {
        steps: 10,
        repeat: true,
        isActive: false
      };
    });
    setAnimations(initialAnimations);
  }, [sprites]);

  const handleCollision = (sprite1Id, sprite2Id) => {
    setIsSwapping(true);
    
    // Swap animations
    setAnimations(prev => {
      const newAnimations = { ...prev };
      const temp = { ...newAnimations[sprite1Id] };
      
      // Invert the steps for each sprite
      newAnimations[sprite1Id] = {
        ...newAnimations[sprite2Id],
        steps: -newAnimations[sprite2Id].steps
      };
      
      newAnimations[sprite2Id] = {
        ...temp,
        steps: -temp.steps
      };

      return newAnimations;
    });

    // Notify parent component of animation updates
    onAnimationUpdate(animations);

    // Reset swapping state after animation
    setTimeout(() => {
      setIsSwapping(false);
    }, 1000);
  };

  const updateAnimation = (spriteId, updates) => {
    setAnimations(prev => ({
      ...prev,
      [spriteId]: {
        ...prev[spriteId],
        ...updates
      }
    }));
  };

  return (
    <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Animation Controls</h3>
      
      <div className="space-y-4">
        {sprites.map(sprite => (
          <div
            key={sprite.id}
            className={`bg-gray-800 rounded-lg p-4 transition-all duration-300 ${
              isSwapping ? 'animate-pulse' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-2xl">
                {sprite.icon}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{sprite.name}</div>
                <div className="text-sm text-gray-400">
                  Steps: {animations[sprite.id]?.steps || 0}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Steps</label>
                <input
                  type="number"
                  value={animations[sprite.id]?.steps || 0}
                  onChange={(e) => updateAnimation(sprite.id, { steps: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Repeat</label>
                <button
                  onClick={() => updateAnimation(sprite.id, { repeat: !animations[sprite.id]?.repeat })}
                  className={`w-full px-3 py-2 rounded-lg ${
                    animations[sprite.id]?.repeat
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {animations[sprite.id]?.repeat ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimationManager; 