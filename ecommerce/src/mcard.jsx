import React, { useState } from 'react';
import Banner from './banner';

const CardContainer = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
    { id: 4, text: 'Card 4' },
  ]);

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedCard = cards[dragIndex];
    setCards(prevCards => {
      const updatedCards = [...prevCards];
      updatedCards.splice(dragIndex, 1);
      updatedCards.splice(hoverIndex, 0, draggedCard);
      return updatedCards;
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {cards.map((card, index) => (
        <Banner
          key={card.id}
          id={card.id}
          index={index}
          text={card.text}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

export default CardContainer;
