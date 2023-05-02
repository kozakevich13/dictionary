import { ADD_WORD, REMOVE_WORD } from "../actions/actions";

const initialState = {
  words: [],
};

const dictionaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORD:
      return {
        ...state,
        words: [{ word: action.payload.word, translation: action.payload.translation }, ...state.words],
      };
    case REMOVE_WORD:
      return {
        ...state,
        words: state.words.filter((word) => word.word !== action.payload),
      };
    default:
      return state;
  }
};

export default dictionaryReducer;
