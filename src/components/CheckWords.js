import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CheckWords = () => {
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [usedWords, setUsedWords] = useState([]);
  const dictionary = useSelector((state) => state.words);
  const testWords = dictionary.slice(0, 10);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const numQuestions = testWords.length; // Загальна кількість питань тесту
  const [isTestFinished, setIsTestFinished] = useState(false)

  useEffect(() => {
    const selectedWordObj = testWords[selectedWordIndex];
    const options = generateOptions(selectedWordObj, dictionary, usedWords);
    setSelectedOptions(options);
    setSelectedOption("");
  }, [selectedWordIndex]);

  useEffect(() => {
    if (selectedWordIndex === testWords.length) {
      setSelectedOptions([]);
      setSelectedOption("");
    } else {
      const selectedWordObj = testWords[selectedWordIndex];
      const options = generateOptions(selectedWordObj, dictionary, usedWords);
      setSelectedOptions(options);
      setSelectedOption("");
    }
  }, [selectedWordIndex]);

  useEffect(() => {
    if (isTestFinished) {
      const selectedWordObj = testWords[testWords.length - 1];
      const options = generateOptions(selectedWordObj, dictionary, usedWords);
      setSelectedOptions(options);
    }
  }, [isTestFinished]);

  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckAnswer = () => {
    const selectedWordObj = testWords[selectedWordIndex];
    if (selectedWordObj && selectedWordObj.translation === selectedOption) {
      alert("Correct!");
      setNumCorrectAnswers(numCorrectAnswers + 1);
    } else {
      alert("Incorrect!");
    }
    setSelectedOptions([]);
    setSelectedOption("");
    setUsedWords([...usedWords, selectedWordObj.word]);
  
    if (selectedWordIndex < testWords.length - 1) {
      setSelectedWordIndex(selectedWordIndex + 1);
    } else {
      setIsTestFinished(true); // set isTestFinished to true if the last question is answered
    }
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

  const percentageCorrect = numCorrectAnswers / numQuestions * 100;

  console.log(selectedWordIndex);
  console.log(numQuestions);

  const handleRestartTest = () => {
    setSelectedWordIndex(0);
    setSelectedOptions([]);
    setSelectedOption("");
    setUsedWords([]);
    setNumCorrectAnswers(0);
    setIsTestFinished(false)
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
    {isTestFinished && (
  <div>
    <h3>Your score: {percentageCorrect.toFixed(2)}%</h3>
    <button onClick={handleRestartTest}>Restart Test</button>
  </div>
)}
  </div>
  );
};

export default CheckWords;
