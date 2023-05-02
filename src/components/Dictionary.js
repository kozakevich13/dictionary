import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWord, removeWord } from "../actions/actions";
import { Link } from "react-router-dom";

const Dictionary = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputTranslationValue, setInputTranslationValue] = useState("");
  const dictionary = useSelector((state) => state.words);
  const dispatch = useDispatch();

  const handleAddWord = () => {
    if (inputValue.trim() === "") {
      return;
    }
    dispatch(addWord(inputValue, inputTranslationValue));
    setInputValue("");
    setInputTranslationValue("");
  };

  const handleRemoveWord = (word) => {
    dispatch(removeWord(word));
  };

  return (
    <div>
      <h1>Dictionary</h1>
      <Link to="/check-words">Check Words</Link>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <input
        type="text"
        value={inputTranslationValue}
        onChange={(event) => setInputTranslationValue(event.target.value)}
      />
      <button onClick={handleAddWord}>Add Word</button>
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
    </div>
  );
};

export default Dictionary;
