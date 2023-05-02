import logo from './logo.svg';
import './App.css';
import Dictionary from './components/Dictionary';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from "react-redux";
import dictionaryReducer from "./reducers/redusers";

const store = createStore(dictionaryReducer);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Dictionary/>
      </Provider>
    </div>
  );
}

export default App;
