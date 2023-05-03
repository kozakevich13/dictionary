import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWord } from "../actions/actions";
import { useNavigate } from 'react-router-dom';

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
    navigate ("/");
  };

  return (
    <div>
      <h1>Add Word</h1>
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
    </div>
  );
};

export default AddWord;
