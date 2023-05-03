import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeWord } from "../actions/actions";
import { Link } from "react-router-dom";
import "../styles/Dictionary.css"; 

const Dictionary = () => {
  const dictionary = useSelector((state) => state.words);
  const dispatch = useDispatch();

  const handleRemoveWord = (word) => {
    dispatch(removeWord(word));
  };

  return (
    <div className="dictionary-container"> 
      <h1 className="dictionary-heading">Dictionary</h1>
      <Link to="/add-word" className="add-word-link">Add Word</Link>
      <ul className="word-list">
        {dictionary.map((wordObj) => (
          <li key={wordObj.word} className="word-item">
            {wordObj.word} - {wordObj.translation}
            <button onClick={() => handleRemoveWord(wordObj.word)} className="remove-word-button">
              Remove
            </button>
          </li>
        ))}
      </ul>
      {dictionary.length >= 4 ? (
        <Link to="/check-words" className="check-words-link">Check Words</Link>
      ) : (
        <span className="not-enough-words-message">There must be at least 4 words to check</span>
      )}
    </div>
  );
};

export default Dictionary;
