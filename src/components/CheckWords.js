import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CheckWords = () => {
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [usedWords, setUsedWords] = useState([]);
  const dictionary = useSelector((state) => state.words);
  const testWords = dictionary.slice(0, 10);

  useEffect(() => {
    const selectedWordObj = testWords[selectedWordIndex];
    const options = generateOptions(selectedWordObj, dictionary, usedWords);
    setSelectedOptions(options);
    setSelectedOption("");
  }, [selectedWordIndex]);

  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckAnswer = () => {
    const selectedWordObj = testWords[selectedWordIndex];
    if (selectedWordObj && selectedWordObj.translation === selectedOption) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
    setSelectedOptions([]);
    setSelectedOption("");
    setUsedWords([...usedWords, selectedWordObj.word]);
    setSelectedWordIndex(selectedWordIndex + 1);
  };

  const generateOptions = (wordObj, dictionary) => {
    const optionsList = [];
    dictionary.forEach((item) => {
      if (item.word == wordObj.word) {
        optionsList.push(item.translation);
      }
    });
    while (optionsList.length < 4) {
      const randomWordObj = dictionary[Math.floor(Math.random() * dictionary.length)];
      if (randomWordObj.word !== wordObj.word && !optionsList.includes(randomWordObj.translation)) {
        optionsList.push(randomWordObj.translation);
      }
    }
    return shuffle(optionsList).slice(0, 4);
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
      <p>Translate the following word:</p>
      <h2>{testWords[selectedWordIndex].word}</h2>
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
