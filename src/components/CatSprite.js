import React from "react";
import "./CatSprite.css";

export default function CatSprite({ charac_id }) {
  return (
    <div id={charac_id} className="character inline-block z-0">
      <img
        src="/pika.png"
        alt="Custom Sprite"
        style={{ width: 90, height: 90, objectFit: 'contain', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
      />
    </div>
  );
}
