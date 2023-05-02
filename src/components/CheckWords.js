import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CheckWords = () => {
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const dictionary = useSelector((state) => state.words);
  const testWords = dictionary.slice(0, 10);

  useEffect(() => {
    if (testWords.length > 0) {
      setSelectedWord(testWords[0].word);
      const options = generateOptions(testWords[0], dictionary);
      setSelectedOptions(options);
      setSelectedOption("");
    }
  }, [dictionary]);

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
    setSelectedWord(testWords[Math.floor(Math.random() * testWords.length)].word);
    const options = generateOptions(dictionary.find((wordObj) => wordObj.word === selectedWord), dictionary);
    setSelectedOptions(options);
    setSelectedOption("");
  };

  const generateOptions = (wordObj, dictionary) => {
    const options = [wordObj.translation];
    const availableTranslations = dictionary
      .map((wordObj) => wordObj.translation)
      .filter((translation) => translation !== wordObj.translation);
  
    for (let i = 0; i < 3; i++) {
      const randomTranslation = availableTranslations[Math.floor(Math.random() * availableTranslations.length)];
      options.push(randomTranslation);
      availableTranslations.splice(availableTranslations.indexOf(randomTranslation), 1);
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
      <p>{selectedWord}</p>
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
