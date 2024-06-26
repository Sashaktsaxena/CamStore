import React, { useState } from 'react';

const FeedbackForm = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [stars, setStars] = useState(0);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleStarChange = (e) => {
    setStars(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ message, image, stars });
    setMessage('');
    setImage(null);
    setStars(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={handleMessageChange}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div>
        <label htmlFor="stars">Stars:</label>
        <input
          type="number"
          id="stars"
          min="0"
          max="5"
          value={stars}
          onChange={handleStarChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const FeedbackManager = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const addFeedback = (feedback) => {
    setFeedbackItems([...feedbackItems, feedback]);
  };

  return (
    <div>
      {feedbackItems.map((_, index) => (
        <FeedbackForm key={index} onSubmit={addFeedback} />
      ))}
      <button onClick={() => addFeedback({ message: '', image: null, stars: 0 })}>
        +
      </button>
    </div>
  );
};

export default FeedbackManager;
