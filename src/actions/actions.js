export const ADD_WORD = "ADD_WORD";
export const REMOVE_WORD = "REMOVE_WORD";

export const addWord = (word, translation) => ({
  type: ADD_WORD,
  payload: { word, translation },
});

export const removeWord = (word) => ({
  type: REMOVE_WORD,
  payload: word,
});
