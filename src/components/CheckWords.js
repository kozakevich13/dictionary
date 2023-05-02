import React, { useState } from "react";
import { useSelector } from "react-redux";

const CheckWords = () => {
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const dictionary = useSelector((state) => state.words);
  const testWords = dictionary.slice(0, 10);

  const handleSelectWord = (event) => {
    setSelectedWord(event.target.value);
    const selectedWordObj = dictionary.find((wordObj) => wordObj.word === event.target.value);
    const options = generateOptions(selectedWordObj, dictionary);
    setSelectedOptions(options);
    setSelectedOption("");
  };

  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckAnswer = () => {
    const selectedWordObj = dictionary.find((wordObj) => wordObj.word === selectedWord);
    if (selectedWordObj && selectedWordObj.translation === selectedOption) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
    setSelectedWord("");
    setSelectedOptions([]);
    setSelectedOption("");
  };

  const generateOptions = (wordObj, dictionary) => {
    const options = [wordObj.translation];
    while (options.length < 4) {
      const randomWordObj = dictionary[Math.floor(Math.random() * dictionary.length)];
      if (randomWordObj.word !== wordObj.word && !options.includes(randomWordObj.translation)) {
        options.push(randomWordObj.translation);
      }
    }
    return shuffle(options);
  };

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div>
      <h1>Test Your Vocabulary</h1>
      <select value={selectedWord} onChange={handleSelectWord}>
        <option value="" disabled>
          Select a word
        </option>
        {testWords.map((wordObj) => (
          <option key={wordObj.word} value={wordObj.word}>
            {wordObj.word}
          </option>
        ))}
      </select>
      <div>
        {selectedOptions.map((option) => (
          <label key={option}>
            <input type="radio" name="options" value={option} checked={selectedOption === option} onChange={handleSelectOption} />
            {option}
          </label>
        ))}
      </div>
      <button onClick={handleCheckAnswer}>Check</button>
    </div>
  );
};

export default CheckWords;
