import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Banner = ({ id, text, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BANNER',
    item: { id, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'BANNER',
    hover(item) {
      if (!drag) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const cardStyle = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
    position: 'relative',
    zIndex: index,
    marginLeft: `${index * 20}px`,
    transform: `translateY(-${index * 20}px)`, // Adjust Y position for stacking effect
  };

  drag(drop);

  return (
    <div ref={drag} style={cardStyle}>
      {text}
    </div>
  );
};

export default Banner;
