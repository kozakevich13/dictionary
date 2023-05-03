import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWord } from "../actions/actions";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../styles/AddWord.css";

const AddWord = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputTranslationValue, setInputTranslationValue] = useState("");
  const dispatch = useDispatch();
  const navigate  = useNavigate ();

  const handleAddWord = () => {
    if (inputValue.trim() === "") {
      return;
    }
    dispatch(addWord(inputValue, inputTranslationValue));
    setInputValue("");
    setInputTranslationValue("");
    navigate ("/dictionary");
  };

  return (
    <div className="add-word-container">
      <h1>Add Word</h1>
      <input
        type="text"
        placeholder="Enter a word"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        className="add-word-input"
      />
      <input
        type="text"
        placeholder="Enter the translation"
        value={inputTranslationValue}
        onChange={(event) => setInputTranslationValue(event.target.value)}
        className="add-word-input"
      />
      <button onClick={handleAddWord} className="add-word-button">Add Word</button>
      <Link className="link-back" to="/dictionary">Back to Dictionary</Link>
    </div>
  );
};

export default AddWord;
