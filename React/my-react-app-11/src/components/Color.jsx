import { SketchPicker } from 'react-color';
import { useState } from 'react';

const Color = () => {
  const [color, setColor] = useState('#aabbcc');

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  return (
    <div>
      <h2>Виберіть колір:</h2>
      <SketchPicker color={color} onChange={handleChangeComplete} />
      <h3>Вибраний колір: {color}</h3>
    </div>
  );
};

export default Color;
