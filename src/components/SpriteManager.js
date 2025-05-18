import React, { useState, useEffect } from 'react';

const SpriteManager = ({ sprites, onCollision, onAnimationSwap }) => {
  const [positions, setPositions] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [collisionHistory, setCollisionHistory] = useState([]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(checkCollisions, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, positions]);

  const checkCollisions = () => {
    const spriteIds = Object.keys(positions);
    
    for (let i = 0; i < spriteIds.length; i++) {
      for (let j = i + 1; j < spriteIds.length; j++) {
        const sprite1 = positions[spriteIds[i]];
        const sprite2 = positions[spriteIds[j]];
        
        if (isColliding(sprite1, sprite2)) {
          handleCollision(spriteIds[i], spriteIds[j]);
        }
      }
    }
  };

  const handleCollision = (sprite1Id, sprite2Id) => {
    // Add to collision history
    setCollisionHistory(prev => [...prev, {
      sprite1: sprite1Id,
      sprite2: sprite2Id,
      timestamp: Date.now()
    }]);

    // Trigger animation swap
    onAnimationSwap(sprite1Id, sprite2Id);
  };

  const isColliding = (sprite1, sprite2) => {
    const distance = Math.sqrt(
      Math.pow(sprite1.x - sprite2.x, 2) + Math.pow(sprite1.y - sprite2.y, 2)
    );
    return distance < 50; // Collision threshold
  };

  const updatePosition = (spriteId, newPosition) => {
    setPositions(prev => ({
      ...prev,
      [spriteId]: newPosition
    }));
  };

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-4">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Sprite Manager</h3>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 ${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white font-medium flex items-center gap-2`}
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Stop
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-white rounded-full" />
                Play All
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {sprites.map((sprite, index) => (
            <div
              key={sprite.id}
              className="bg-gray-800 rounded-lg p-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-2xl">
                {sprite.icon}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">Sprite {index + 1}</div>
                <div className="text-sm text-gray-400">
                  Position: ({positions[sprite.id]?.x || 0}, {positions[sprite.id]?.y || 0})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {collisionHistory.length > 0 && (
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-gray-700">
          <h3 className="text-white font-medium mb-2">Recent Collisions</h3>
          <div className="space-y-2">
            {collisionHistory.slice(-3).map((collision, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-2 text-sm text-gray-300"
              >
                Sprite {collision.sprite1} collided with Sprite {collision.sprite2}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpriteManager; 