import React, { useState } from "react";
import { useSelector } from "react-redux";

const CheckWords = () => {
  const [selectedWord, setSelectedWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const dictionary = useSelector((state) => state.words);

  const handleSelectWord = (event) => {
    setSelectedWord(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckTranslation = () => {
    const selectedWordObj = dictionary.find((wordObj) => wordObj.word === selectedWord);
    if (selectedWordObj && selectedWordObj.translation === inputValue) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
    setInputValue("");
    setSelectedWord("");
  };

  return (
    <div>
      <h1>Check Words</h1>
      <select value={selectedWord} onChange={handleSelectWord}>
        <option value="" disabled>
          Select a word
        </option>
        {dictionary.map((wordObj) => (
          <option key={wordObj.word} value={wordObj.word}>
            {wordObj.word}
          </option>
        ))}
      </select>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleCheckTranslation}>Check</button>
    </div>
  );
};

export default CheckWords;
