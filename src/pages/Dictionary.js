import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeWord } from "../actions/actions";
import { Link } from "react-router-dom";

const Dictionary = () => {
  const dictionary = useSelector((state) => state.words);
  const dispatch = useDispatch();

  const handleRemoveWord = (word) => {
    dispatch(removeWord(word));
  };

  return (
    <div>
      <h1>Dictionary</h1>
      <Link to="/add-word">Add Word</Link>
      <ul>
        {dictionary.map((wordObj) => (
          <li key={wordObj.word}>
            {wordObj.word} - {wordObj.translation}
            <button onClick={() => handleRemoveWord(wordObj.word)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      {dictionary.length >= 4 ? (
        <Link to="/check-words">Check Words</Link>
      ) : (
        <span>There must be at least 4 words to check</span>
      )}
    </div>
  );
};

export default Dictionary;
